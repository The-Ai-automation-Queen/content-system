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

// Resolves the LLM config (provider/model/apiKey) the SAME way for every
// entry point. Only falls back to the local Ollama 3B model when Gemini is
// genuinely unconfigured — never as a silent default when a provider was
// actually specified.
export function resolveLLMConfig(env) {
  var provider = (env.LLM_PROVIDER || '').toLowerCase().trim();
  var geminiKey = env.GEMINI_API_KEY || process.env.GEMINI_API_KEY;

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
      model: env.GEMINI_MODEL || 'gemini-2.0-flash'
    };
  }

  return {
    provider: 'ollama',
    ollamaUrl: env.OLLAMA_URL || 'http://localhost:11434',
    model: env.OLLAMA_MODEL || 'qwen2.5:3b'
  };
}
