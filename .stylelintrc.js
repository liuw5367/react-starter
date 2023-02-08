// http://stylelint.cn/user-guide/rules/
// http://stylelint.docschina.org/user-guide/rules/
// https://stylelint.io/user-guide/rules/list/#custom-property

const pattern = '^[a-zA-Z0-9_-]*$';

module.exports = {
  // stylelint-config-prettier： 防止format和prettier冲突
  extends: ['stylelint-config-standard', 'stylelint-config-idiomatic-order'],
  plugins: ['stylelint-less'],
  customSyntax: 'postcss-less',
  rules: {
    // ------- 修改默认配置 -------
    'custom-media-pattern': [pattern, { message: 'Expected custom media query name to be kebab-case' }],
    'custom-property-pattern': [pattern, { message: 'Expected custom property name to be kebab-case' }],
    'keyframes-name-pattern': [pattern, { message: 'Expected keyframe name to be kebab-case' }],
    'selector-class-pattern': [pattern, { message: 'Expected class selector to be kebab-case' }],
    'selector-id-pattern': [pattern, { message: 'Expected id selector to be kebab-case' }],
    'no-descending-specificity': null, // 禁止在具有较高优先级的选择器后出现被其覆盖的较低优先级的选择器。
    'at-rule-no-unknown': [true, { ignoreAtRules: ['include', 'mixin'] }], //禁止未知的@规则。
    'string-quotes': 'single', // 强制使用单引号
    'color-function-notation': 'legacy',
    // ------- 额外配置 -------
    'less/color-no-invalid-hex': true,
    'less/no-duplicate-variables': true,
    'color-no-invalid-hex': true,
    'selector-pseudo-class-no-unknown': [true, { ignorePseudoClasses: ['global'] }],
    'comment-whitespace-inside': 'always',
    'no-invalid-double-slash-comments': null,
    'length-zero-no-unit': [true, { ignore: ['custom-properties'], ignoreFunctions: ['var', '/^--/'] }],
    'value-no-vendor-prefix': null,
    'property-no-vendor-prefix': null,

    /*
    'max-empty-lines': 1, // 禁止多余的空行, 限制相邻空行的数量。
    'no-eol-whitespace': true, // 禁止行尾空白符（可自动修复）。
    'no-missing-end-of-source-newline': true, // 禁止缺少源码结尾换行符（可自动修复）。
    'no-empty-first-line': true, //禁止空第一行（可自动修复）。
    */
  },
};
