import { defineConfig } from 'umi';

export default defineConfig({
  dva: {},
  tailwindcss: {},
  plugins: ['@umijs/plugins/dist/dva', '@umijs/plugins/dist/tailwindcss'],
  proxy: {},
});
