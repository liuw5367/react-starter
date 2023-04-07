import zh_CN from 'antd/lib/locale/zh_CN';
import { defineConfig } from 'umi';
import { routes } from './src/config';
import { APP_NAME } from './src/constants';

export default defineConfig({
  npmClient: 'pnpm',
  vite: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  plugins: ['@umijs/plugins/dist/dva', '@umijs/plugins/dist/antd', '@umijs/plugins/dist/unocss'],
  title: APP_NAME,
  hash: true,
  routes,
  dva: {},
  unocss: { watch: ['src/**/*.tsx', 'src/**/*.jsx'] },
  antd: {
    dark: false,
    compact: false,
    // babel-plugin-import
    import: true,
    style: 'less',
    theme: {},
    configProvider: {
      locale: zh_CN,
    },
  },
  mock: { include: ['src/mock/**/*.ts', 'src/pages/**/_mock.ts'] },
  proxy: {
    /*
    '/api': {
      target: 'http://10.1.1.1:8000',
      changeOrigin: true,
      // pathRewrite: { '^/api': '' },
    },
    */
  },
});
