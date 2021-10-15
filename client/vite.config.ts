import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'
import ViteComponents from 'vite-plugin-components'
import VueI18n from '@intlify/vite-plugin-vue-i18n'
import ViteIcons, { ViteIconsResolver } from 'vite-plugin-icons'
import { resolve } from 'path'

import { LOCAL_HOST } from './src/constants/config'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },

  plugins: [
    vue(),
    WindiCSS({
      scan: {
        include: ['src/**/*.{vue,html,jsx,tsx}', 'index.html'],
      },
    }),
    ViteComponents({
      customComponentResolvers: ViteIconsResolver({
        componentPrefix: '',
      }),
    }),
    ViteIcons(),

    VueI18n({
      include: [resolve(__dirname, './src/locales/**')],
    }),
  ],

  server: {
    proxy: {
      '/api/v1': LOCAL_HOST,
    },
  },
})
