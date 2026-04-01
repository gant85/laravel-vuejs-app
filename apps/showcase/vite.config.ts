import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'node:url';
import fs from 'node:fs';
import { defineConfig } from 'vite';
import vuetify from 'vite-plugin-vuetify';
import viteCompression from 'vite-plugin-compression';
import { imagetools } from 'vite-imagetools';
import laravel from 'laravel-vite-plugin';

const workspaceNodeModules = fileURLToPath(new URL('../../node_modules', import.meta.url));
const localNodeModules = fileURLToPath(new URL('./node_modules', import.meta.url));

// Check if we are running inside the monorepo to safely inject symlink bypasses
const uiKitMonorepoPath = fileURLToPath(new URL('../../libs/ui-kit/src', import.meta.url));
const isMonorepo = fs.existsSync(uiKitMonorepoPath);

export default defineConfig({
  plugins: [
    laravel({
      input: ['resources/js/app.ts'],
      refresh: true,
    }),
    vue(),
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
      ...(isMonorepo
        ? {
            '@reference-app-laravel-vue/ui-kit/styles': fileURLToPath(
              new URL('../../libs/ui-kit/src/styles/_index.scss', import.meta.url)
            ),
            '@reference-app-laravel-vue/ui-kit/overrides': fileURLToPath(
              new URL('../../libs/ui-kit/src/styles/overrides.scss', import.meta.url)
            ),
            '@reference-app-laravel-vue/ui-kit': uiKitMonorepoPath,
          }
        : {}),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
        loadPaths: [localNodeModules, workspaceNodeModules],
      },
      sass: {
        api: 'modern-compiler',
        loadPaths: [localNodeModules, workspaceNodeModules],
      },
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
