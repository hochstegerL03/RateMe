import { fileURLToPath, URL } from 'url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { quasar, transformAssetUrls } from '@quasar/vite-plugin';
import { VitePWA } from 'vite-plugin-pwa';
import manifest from './manifest.js';

export default defineConfig({
  preview: {
    port: 5555,
    proxy: {
      '/cards': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
  plugins: [
    vue({
      template: { transformAssetUrls },
    }),

    quasar({
      sassVariables: 'src/quasar-variables.sass',
    }),
    VitePWA({
      manifest,
      includeAssets: ['**/*.{js,css,html,jpg,ico,png,ttf,woff2}'],
      strategies: 'injectManifest',
      srcDir: 'src',
      filename: 'service-worker.js',
    }),
  ],
  build: {
    outDir: './server/client',
    // emptyOutDir: false,
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
