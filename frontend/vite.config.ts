import { fileURLToPath, URL } from 'node:url'

import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: [
      { find: '@', replacement: fileURLToPath(new URL('src', import.meta.url)) },
    ]
  },
  css: {
    preprocessorOptions: {
      scss: { api: 'modern-compiler' },
    }
  }
})
