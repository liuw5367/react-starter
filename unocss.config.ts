import { defineConfig, presetAttributify, presetUno } from 'unocss';

export function createConfig({ strict = true, dev = true } = {}) {
  return defineConfig({
    envMode: dev ? 'dev' : 'build',
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

export default createConfig();
