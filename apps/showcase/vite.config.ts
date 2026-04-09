import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue';
import vuetify from 'vite-plugin-vuetify';
import viteCompression from 'vite-plugin-compression';
import { imagetools } from 'vite-imagetools';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  plugins: [
    laravel({
      input: ['resources/js/app.ts'],
      refresh: true,
    }),
    vue({
      template: {
        transformAssetUrls: {
          base: null,
          includeAbsolute: false,
        },
      },
    }),
    vuetify({
      autoImport: true,
      styles: {
        configFile: 'resources/styles/settings.scss',
      },
    }),
    imagetools(),
    viteCompression({
      algorithm: 'brotliCompress',
      ext: '.br',
      threshold: 1024,
    }),
    viteCompression({
      algorithm: 'gzip',
      ext: '.gz',
      threshold: 1024,
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./resources/js', import.meta.url)),
      '@reference-app-laravel-vue/ui-kit/overrides': fileURLToPath(
        new URL('../../libs/ui-kit/src/styles/overrides.scss', import.meta.url)
      ),
      '@reference-app-laravel-vue/ui-kit': fileURLToPath(
        new URL('../../libs/ui-kit/src', import.meta.url)
      ),
    },
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
    hmr: {
      host: 'localhost',
    },
    watch: {
      usePolling: true,
    },
    fs: {
      allow: ['../..'],
    },
  },
  css: {
    devSourcemap: false,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vue-vendor': ['vue', '@inertiajs/vue3'],
          vuetify: ['vuetify'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    reportCompressedSize: false,
    cssCodeSplit: true,
  },
});
