import { defineConfig } from 'umi';
import { routes } from './src/config';
import { APP_NAME } from './src/constants';

export default defineConfig({
  plugins: ['@umijs/plugins/dist/dva', '@umijs/plugins/dist/antd', '@umijs/plugins/dist/unocss'],
  title: APP_NAME,
  hash: true,
  routes,
  dva: {},
  unocss: { watch: ['src/**/*.tsx', 'src/**/*.jsx'] },
  antd: {
    configProvider: {},
    // themes
    dark: false,
    compact: false,
    // babel-plugin-import
    import: true,
    style: 'less',
  },
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
