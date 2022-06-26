module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
  },
  settings: {
    react: { version: 'detect' },
  },
  env: { browser: true, node: true, es6: true, mocha: true, jest: true, jasmine: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended', // Make sure this is always the last element in the array.
    'plugin:jest/recommended',
  ],
  plugins: ['simple-import-sort', 'prettier', 'react-hooks'],
  rules: {
    'prettier/prettier': ['error', {}, { usePrettierrc: true }],
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/accessible-emoji': 'off',
    'jsx-a11y/anchor-is-valid': [
      'off',
      {
        components: ['Link'],
        specialLink: ['hrefLeft', 'hrefRight'],
        aspects: ['invalidHref', 'preferButton'],
      },
    ],
    'no-unused-vars': ['off', { argsIgnorePattern: '^_' }], // 忽略 _ 开头的变量
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': ['warn', { additionalHooks: 'useRecoilCallback' }],
    eqeqeq: ['error', 'allow-null'],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/ban-types': 'warn',
    'require-yield': 'warn',
    'spaced-comment': 'error',
    // 不允许多个空行
    'no-multiple-empty-lines': ['error', { max: 2, maxEOF: 1 }],
    'lines-between-class-members': ['error', 'always'],
    // 禁用行尾空白
    'no-trailing-spaces': 'error',
    // 解构优先
    'prefer-destructuring': [
      'off',
      {
        VariableDeclarator: { array: true, object: true },
        AssignmentExpression: { array: false, object: false },
      },
    ],
  },
};
