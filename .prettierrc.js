/**
 * @type {import('prettier').Config}
 */
module.exports = {
  // 设置大一点，防止自动换行。需要强制换行的，可在代码后添加注释符号 //
  printWidth: 120,
  tabWidth: 2,
  singleQuote: true,
  trailingComma: 'all',
  proseWrap: 'never',
  endOfLine: 'lf',
  // 箭头函数单个参数的情况是否省略括号，always是总是带括号
  arrowParens: 'always',
};
