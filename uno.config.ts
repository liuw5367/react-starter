import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  shortcuts: [
  ],
  presets: [
    presetUno(),
    presetAttributify(),
    // https://unocss.dev/presets/icons
    presetIcons({
      scale: 1.2,
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
      },
      // 1. 安装图标依赖包
      // https://iconify.design/
      // https://icon-sets.iconify.design/
      // @iconify-json/mdi
      // @iconify-json/tabler
      // @iconify-json/ant-design
      // 本项目已安装 @iconify-json/carbon 用作示例
      // 2. 使用 CDN
      cdn: 'https://esm.sh/',
    }),
    presetTypography(),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
  safelist: 'prose m-auto text-left'.split(' '),
})
