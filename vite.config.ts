import { resolve } from 'node:path'
import legacy from '@vitejs/plugin-legacy'
import react from '@vitejs/plugin-react'
import Unocss from 'unocss/vite'
import { defineConfig } from 'vite'
import { viteMockServe } from 'vite-plugin-mock'
import AutoImport from 'unplugin-auto-import/vite'
import UnpluginSvgComponent from 'unplugin-svg-component/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Pages from 'vite-plugin-pages'
import pkg from './package.json'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  define: {
    __APP_VERSION__: JSON.stringify(pkg.version),
  },
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

    // https://github.com/vitejs/vite/tree/main/packages/plugin-legacy#readme
    legacy({
      targets: ['chrome >= 49', 'ie 11'],
      polyfills: true,
      additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
    }),

    // https://github.com/hannoeru/vite-plugin-pages
    Pages(),

    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      dts: 'src/types/auto-imports.d.ts',
      imports: [
        // 'react',
        // 'react-router-dom',
        {
          // '': [''],
        },
      ],
      dirs: [
        // 'src/hooks',
        // 'src/stores',
      ],
      resolvers: [
        IconsResolver({
          prefix: 'Icon',
          extension: 'jsx',
        }),
      ],
    }),

    // https://github.com/antfu/unocss
    // see uno.config.ts for config
    Unocss(),

    // 同 presetIcons，需安装需要图标库
    // https://iconify.design/
    // https://icon-sets.iconify.design/
    // 本项目已安装 @iconify-json/carbon 用作示例
    // https://github.com/unplugin/unplugin-icons
    Icons({
      compiler: 'jsx',
      jsx: 'react',
      scale: 1.2, // Scale of icons against 1em
      // defaultStyle: '', // Style apply to icons
      // defaultClass: '', // Class names apply to icons
    }),

    // https://github.com/jpkleemans/vite-svg-loader
    // svgLoader(),
    // https://github.com/Jevon617/unplugin-svg-component
    UnpluginSvgComponent({
      iconDir: 'src/assets',
      dts: true,
      dtsDir: 'src/types',
      componentStyle: 'width: 1em; height: 1em; fill:currentColor; scale: 1.2',
    }),

    // https://github.com/vbenjs/vite-plugin-mock
    viteMockServe({
      mockPath: 'src/mocks',
      enable: command !== 'build',
    }),
  ],
  server: {
    host: '0.0.0.0',
    // proxy: {
    //   '/api': {
    //     changeOrigin: true,
    //     // target: 'http://1.1.1.1:8888',
    //     // rewrite: (path) => path.replace(new RegExp('/api'), ''),
    //   },
    // },
  },
}))
