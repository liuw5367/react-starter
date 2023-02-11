import AntdIcons from '@iconify-json/ant-design/icons.json';
import PhIcons from '@iconify-json/ph/icons.json';
import transformerDirectives from '@unocss/transformer-directives';
import transformerVariantGroup from '@unocss/transformer-variant-group';
import legacy from '@vitejs/plugin-legacy';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { presetAttributify, presetIcons, presetUno } from 'unocss';
import Unocss from 'unocss/vite';
import type { ConfigEnv, UserConfigExport } from 'vite';
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
  build: {
    chunkSizeWarningLimit: 2048,
    // minify: 'terser',
    // terserOptions: { compress: { drop_console: true, drop_debugger: true } },
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
    legacy({
      targets: ['chrome >= 49', 'ie 11'],
      polyfills: true,
      additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
    }),
    unocssPlugin(),
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

/**
 * https://uno.antfu.me 用来查询支持的属性
 */
function unocssPlugin() {
  return Unocss({
    include: 'src/**/*.{htm,html,tsx,jsx,css,less,sass}',
    transformers: [
      // https://github.com/unocss/unocss/tree/main/packages/transformer-directives
      transformerDirectives(),
      // <div class="hover:(bg-gray-400 font-medium) font-(light mono)"/>
      // Will be transformed to:
      // <div class="hover:bg-gray-400 hover:font-medium font-light font-mono"/>
      transformerVariantGroup(),
    ],
    presets: [
      // Tailwind, WindiCss Style
      presetUno(),
      // enabled Windi CSS's Attributify Mode for other presets
      // https://windicss.org/posts/v30.html#attributify-mode
      /* example:
        <button
          bg="blue-400 hover:blue-500 dark:blue-500 dark:hover:blue-600"
          text="sm white"
          font="mono light"
          p="y-2 x-4"
          border="2 rounded blue-200"
        >
          Button
        </button>
       */
      presetAttributify({
        // 属性冲突时可以添加前缀来避免，但不是必须的
        prefixedOnly: false,
        // 添加前缀防止冲突
        prefix: 'un-',
      }),
      // 使用 class 添加图标
      // https://github.com/unocss/unocss/tree/main/packages/preset-icons
      presetIcons({
        // 添加前缀防止冲突
        prefix: 'i-',
        // 选择需要的图库导入 https://icon-sets.iconify.design https://icones.js.org
        // 导入时需添加依赖库 @iconify-json/{name}
        collections: {
          // https://icon-sets.iconify.design/ph/
          ph: PhIcons as any,
          // https://icon-sets.iconify.design/ant-design/
          'ant-design': AntdIcons as any,
        },
        extraProperties: {
          display: 'inline-block',
          'vertical-align': 'middle',
        },
      }),
    ],
  });
}
