// config-loader.mjs — Single, shared env resolution for the AI Insider Brief pipeline.
//
// ROOT CAUSE FIXED: run.mjs and approval-bot.mjs each used to pick the FIRST
// env file that existed out of [ENV_PATH, /root/.../.env, C:\Secrets\..., config.env]
// and use ONLY that file. On the VPS, /root/ai-insider-brief-pipeline/.env
// (the deployment secrets file — tokens, API keys) exists and so wins,
// but it was never meant to also carry LLM_PROVIDER / GEMINI_MODEL. Those
// live in the repo-committed config.env (LLM_PROVIDER=gemini). Because the
// secrets file "won" outright and config.env was never consulted, the code
// silently fell back to its hardcoded default: Ollama qwen2.5:3b.
//
// Fix: load config.env as the BASE layer, then layer the deployment secrets
// file ON TOP. Secrets values win key-by-key (a real secret always wins),
// but any key the secrets file does not set (LLM_PROVIDER, GEMINI_MODEL,
// MAX_CARDS_PER_RUN, path defaults, ...) falls through from config.env
// instead of vanishing. Both run.mjs and approval-bot.mjs call this same
// function, so they always resolve LLM config identically.

import { readFileSync, existsSync } from 'fs';
import { resolve } from 'path';

function parseEnvFile(filePath) {
  if (!existsSync(filePath)) return {};
  var lines = readFileSync(filePath, 'utf-8').split('\n');
  var env = {};
  lines.forEach(function (line) {
    line = line.trim();
    if (!line || line.startsWith('#')) return;
    var eqIndex = line.indexOf('=');
    if (eqIndex === -1) return;
    var key = line.substring(0, eqIndex).trim();
    var val = line.substring(eqIndex + 1).trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    env[key] = val;
  });
  return env;
}

// Loads config.env (repo baseline) then layers the first existing secrets
// file on top. Returns the merged env plus which files were actually used,
// so callers can log it at startup.
export function loadMergedConfig(pipelineDir) {
  var basePath = resolve(pipelineDir, 'config.env');
  var baseEnv = parseEnvFile(basePath);

  var secretsPaths = [
    process.env.ENV_PATH,
    '/root/ai-insider-brief-pipeline/.env',
    'C:\\Secrets\\insider-brief.env'
  ].filter(Boolean);

  var secretsEnv = {};
  var secretsPathUsed = null;
  for (var i = 0; i < secretsPaths.length; i++) {
    if (existsSync(secretsPaths[i])) {
      secretsEnv = parseEnvFile(secretsPaths[i]);
      secretsPathUsed = secretsPaths[i];
      break;
    }
  }

  var merged = Object.assign({}, baseEnv, secretsEnv);

  return {
    env: merged,
    basePath: existsSync(basePath) ? basePath : null,
    secretsPath: secretsPathUsed
  };
}

function resolveProviderConfig(env, provider, prefix) {
  prefix = prefix ? prefix + '_' : '';
  var geminiKey = env.GEMINI_API_KEY || process.env.GEMINI_API_KEY;
  var openRouterKey = env.OPENROUTER_API_KEY || process.env.OPENROUTER_API_KEY;

  if (!provider) {
    // No explicit provider anywhere. Prefer Gemini if a key is actually
    // present; only default to Ollama when nothing at all is configured.
    provider = geminiKey ? 'gemini' : 'ollama';
  }

  if (provider === 'gemini') {
    if (!geminiKey) {
      throw new Error('LLM_PROVIDER=gemini but no GEMINI_API_KEY found (checked config.env and the deployment secrets file).');
    }
    return {
      provider: 'gemini',
      apiKey: geminiKey,
      model: env[prefix + 'GEMINI_MODEL'] || env.GEMINI_MODEL || 'gemini-2.0-flash'
    };
  }

  if (provider === 'openrouter') {
    if (!openRouterKey) {
      throw new Error(prefix + 'LLM_PROVIDER=openrouter but no OPENROUTER_API_KEY was found.');
    }
    return {
      provider: 'openrouter',
      apiKey: openRouterKey,
      model: env[prefix + 'OPENROUTER_MODEL'] || env.OPENROUTER_MODEL || 'openai/gpt-4.1-mini'
    };
  }

  if (provider !== 'ollama') {
    throw new Error('Unsupported LLM provider: ' + provider);
  }

  return {
    provider: 'ollama',
    ollamaUrl: env.OLLAMA_URL || 'http://localhost:11434',
    model: env[prefix + 'OLLAMA_MODEL'] || env.OLLAMA_MODEL || 'qwen2.5:3b'
  };
}

// Resolves the legacy single-provider shape for scripts that need one model.
export function resolveLLMConfig(env) {
  var provider = (env.LLM_PROVIDER || '').toLowerCase().trim();
  return resolveProviderConfig(env, provider, '');
}

// Evidence-first synthesis supports a local-first split. Each stage inherits
// LLM_PROVIDER unless explicitly overridden. This lets the cheap relevance
// and extraction work stay on Ollama while OpenRouter is used only for the
// judgment or independent verification stage when the operator enables it.
export function resolvePipelineLLMConfig(env) {
  var base = resolveLLMConfig(env);
  var stages = {};
  ['filter', 'extraction', 'judgment', 'verification'].forEach(function (stage) {
    var prefix = stage.toUpperCase();
    var configured = String(env[prefix + '_LLM_PROVIDER'] || '').toLowerCase().trim();
    stages[stage] = configured ? resolveProviderConfig(env, configured, prefix) : base;
  });
  return Object.assign({}, base, { stages: stages });
}
