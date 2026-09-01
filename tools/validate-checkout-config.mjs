#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { validateCheckoutConfiguration } from './checkout-config.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const committedPath = path.join(root, 'main-site', 'checkout', 'config.json');
const result = validateCheckoutConfiguration(process.env);

if (result.errors.length) {
  console.error('Checkout configuration failed closed:\n- ' + result.errors.join('\n- '));
  process.exit(1);
}

const committed = JSON.parse(fs.readFileSync(committedPath, 'utf8'));
if (JSON.stringify(committed) !== JSON.stringify(result.publicConfig)) {
  console.error('Checkout configuration failed closed: committed public config does not match the validated build configuration.');
  process.exit(1);
}

if (!result.enabled) {
  console.log('Checkout is safely disabled. No payment link will be shown.');
} else {
  console.log('Checkout configuration passed for US$39, USD charge currency, 12 buyers, and provider-protected delivery.');
}
