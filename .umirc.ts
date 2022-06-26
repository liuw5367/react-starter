import { defineConfig } from 'umi';

export default defineConfig({
  plugins: ['@umijs/plugins/dist/dva', '@umijs/plugins/dist/antd', '@umijs/plugins/dist/unocss'],
  hash: true,
  dva: {},
  unocss: {
    // 添加其他包含 unocss 的 classname 的文件目录
    watch: ['src/**/*.tsx'],
  },
  antd: {
    // configProvider
    configProvider: {},
    // themes
    dark: false,
    compact: true,
    // babel-plugin-import
    import: true,
    // less or css, default less
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
