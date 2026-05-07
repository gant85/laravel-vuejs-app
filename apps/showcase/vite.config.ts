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
      '@reference-app-laravel-vue/ui-kit/style.css': fileURLToPath(
        new URL('./node_modules/@reference-app-laravel-vue/ui-kit/dist/ui-kit.css', import.meta.url)
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
      // Disable polling for significant performance boost on Windows/WSL.
      // Enable only if file changes are not detected.
      usePolling: false,
    },
    fs: {
      allow: ['../..'],
    },
  },
  css: {
    devSourcemap: true,
    preprocessorOptions: {
      sass: {
        api: 'modern-compiler',
      },
    },
  },
  optimizeDeps: {
    // Pre-bundle core heavy dependencies for faster dev startup.
    include: [
      'vue',
      '@inertiajs/vue3',
      'axios',
      'vuetify',
      'vuetify/components',
      'vuetify/directives',
      '@reference-app-laravel-vue/ui-kit',
      '@reference-app-laravel-vue/ui-kit/overrides',
    ],
    // Automatically discover other dependencies in pages.
    entries: ['resources/js/app.ts', 'resources/js/Pages/**/*.vue'],
  },
  build: {
    target: 'es2022',
    rollupOptions: {
      output: {
        manualChunks: (id: string) => {
          if (id.includes('node_modules')) {
            if (id.includes('vuetify')) return 'vendor-vuetify';
            if (id.includes('@opentelemetry')) return 'vendor-telemetry';
            if (id.includes('vue') || id.includes('@inertiajs')) return 'vendor-vue';
            return 'vendor-others';
          }
        },
      },
    },
    chunkSizeWarningLimit: 2000,
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
