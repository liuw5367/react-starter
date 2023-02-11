module.exports = {
  extends: ['@antfu/eslint-config-react'],
  plugins: ['simple-import-sort'],
  rules: {
    // --- @antfu 规则修改 ---
    // 'antfu/if-newline': 'off',
    curly: ['error', 'all'],
    'max-statements-per-line': ['error', { max: 1 }],
    'no-console': 'off',
    'arrow-parens': ['error', 'always'],
    'quote-props': ['error', 'as-needed'],
    semi: ['error', 'always'],
    '@typescript-eslint/semi': 'off',
    '@typescript-eslint/member-delimiter-style': ['off', { multiline: { delimiter: 'none' } }],
    'import/order': 'off',
    'sort-imports': [
      'error',
      {
        ignoreCase: true,
        ignoreDeclarationSort: true,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
        allowSeparatedGroups: false,
      },
    ],
    // --- @antfu 规则修改 ---

    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',

    // 'no-unused-vars': ['off', { argsIgnorePattern: '^_' }], // 忽略 _ 开头的变量
    // '@typescript-eslint/explicit-function-return-type': 'off',
    // '@typescript-eslint/ban-ts-comment': 'off',
    // '@typescript-eslint/ban-types': 'warn',
    // '@typescript-eslint/no-empty-interface': 'off',
    // 'require-yield': 'warn',
    'spaced-comment': ['error', 'always', { markers: ['/'] }],
    'no-multiple-empty-lines': ['error', { max: 2, maxEOF: 1 }],
    'lines-between-class-members': ['error', 'always'],
    // 禁用行尾空白
    'no-trailing-spaces': 'error',
    // ignore 不支持正则表达式，unocss attributify 无法识别，所以禁用
    'react/no-unknown-property': ['off', { ignore: ['/^un-/'] }],
  },
};
