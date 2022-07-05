export const REG_PASSWORD = /^([0-9a-zA-Z])+$/;
export const REG_PASSWORD_LENGTH = /^.{6,18}$/;
export const REG_USERNAME = /^[0-9a-zA-Z_-]+$/;
export const REG_EN = /^([0-9a-zA-Z_ ])+$/;
export const REG_MOBILE = /^(?:(?:\+|00)86)?1\d{10}$/;

export const RULE_USERNAME = {
  pattern: new RegExp(REG_USERNAME, 'g'),
  message: '支持字母、数字、下划线、横杠',
};

export const RULE_PASSWORD = {
  pattern: new RegExp(REG_PASSWORD, 'g'),
  message: '支持数字、大小写字母',
};

export const RULE_PASSWORD_LENGTH = {
  pattern: new RegExp(REG_PASSWORD_LENGTH, 'g'),
  message: '密码长度6~18个字符',
};

export const RULE_EN = {
  pattern: new RegExp(REG_EN, 'g'),
  message: '支持字母、数字、下划线',
};

export const RULE_MOBILE = {
  pattern: new RegExp(REG_MOBILE, 'g'),
  message: '请输入正确的手机号',
};
