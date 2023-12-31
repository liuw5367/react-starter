import { resolve } from 'node:path'
import legacy from '@vitejs/plugin-legacy'
import react from '@vitejs/plugin-react'
import Unocss from 'unocss/vite'
import { defineConfig } from 'vite'
import svgr from 'vite-plugin-svgr'
import { viteMockServe } from 'vite-plugin-mock'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  logLevel: 'info',
  resolve: {
    alias: [
      { find: '@', replacement: resolve(__dirname, './src') },
    ],
  },
  esbuild: {
    drop: command === 'build' ? ['debugger', 'console'] : [],
  },
  build: {
    chunkSizeWarningLimit: 2048,
    // minify: 'terser',
    // terserOptions: { compress: { drop_console: true, drop_debugger: true } },
  },
  plugins: [
    react(),
    legacy({
      targets: ['chrome >= 49', 'ie 11'],
      polyfills: true,
      additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
    }),
    Unocss(),
    // ...svgr options (https://react-svgr.com/docs/options/)
    svgr({ svgrOptions: { icon: true } }),
    viteMockServe({
      mockPath: './src/mocks',
      localEnabled: true,
      prodEnabled: false,
    }),
  ],
  server: {
    // hmr: { overlay: false },
    host: '0.0.0.0',
    port: 9000,
    proxy: {
      // '/api': {
      //   changeOrigin: true,
      //   // target: 'http://1.1.1.1:8888',
      //   // rewrite: (path) => path.replace(new RegExp('/api'), ''),
      // },
    },
  },
}))
