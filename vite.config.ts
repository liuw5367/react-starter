import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import Unocss from 'unocss/vite';
import { ConfigEnv, UserConfigExport } from 'vite';
import { viteMockServe } from 'vite-plugin-mock';
import svgrPlugin from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default ({ command }: ConfigEnv): UserConfigExport => ({
  logLevel: 'info',
  resolve: {
    alias: [
      { find: '@', replacement: resolve(__dirname, './src') },
      // antd 的 less
      { find: /^~/, replacement: '' },
    ],
  },
  esbuild: {
    drop: command === 'build' ? ['debugger', 'console'] : [],
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: {
          // '@primary-color': '#',
        },
      },
    },
  },
  plugins: [
    react(),
    Unocss({ include: 'src/**/*' }),
    // ...svgr options (https://react-svgr.com/docs/options/)
    svgrPlugin({ svgrOptions: { icon: true } }),
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
      //   // target: 'http://10.128.1.57:8010',
      //   // rewrite: (path) => path.replace(/^\/api/, ''),
      // },
    },
  },
});
