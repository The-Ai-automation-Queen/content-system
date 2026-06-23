import { defineConfig } from 'astro/config';

// Mission Control runs on localhost:4321 and reads the markdown files in the
// repo root (one level up) at request time. host:true so the remote/web
// harness can preview the port.
export default defineConfig({
  server: { port: 4321, host: true },
});
