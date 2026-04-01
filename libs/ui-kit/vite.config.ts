import { fileURLToPath } from 'node:url';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    vue(),
    dts({
      include: ['src/**/*.ts', 'src/**/*.vue'],
      tsconfigPath: './tsconfig.json',
      cleanVueFileName: true,
    }),
  ],
  build: {
    lib: {
      entry: {
        index: fileURLToPath(new URL('src/index.ts', import.meta.url)),
        'theme/index': fileURLToPath(new URL('src/theme/index.ts', import.meta.url)),
      },
      formats: ['es'],
    },
    rollupOptions: {
      // Vue and Vuetify are peerDependencies — never bundle them
      external: ['vue', /^vuetify/],
    },
    outDir: 'dist',
    emptyOutDir: true,
  },
});
