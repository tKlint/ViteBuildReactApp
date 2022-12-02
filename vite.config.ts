import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteEslint from 'vite-plugin-eslint';
import svgr from 'vite-plugin-svgr';
import htmlConfig from 'vite-plugin-html-config';
import htmlConfigOptions from './config/htmlConfig';
import getServerProxyConfig from './config/proxy';
import { ENV_PREFIX } from './config/env';

import alias from './config/alias';

export default defineConfig(() => ({
  plugins: [
    react(),
    svgr(),
    viteEslint({
      fix: true,
      cache: false,
      exclude: ['./node_modules/**'],
    }),
    htmlConfig(htmlConfigOptions),
  ],
  envPrefix: [ENV_PREFIX],
  server: {
    port: 3000,
    host: '0.0.0.0',
    proxy: getServerProxyConfig(),
  },
  resolve: {
    alias,
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
}));
