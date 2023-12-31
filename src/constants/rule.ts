export const REG_PASSWORD = /^([0-9a-zA-Z])+$/g
export const REG_PASSWORD_LENGTH = /^.{6,18}$/g
export const REG_USERNAME = /^[0-9a-zA-Z_-]+$/g
export const REG_EN = /^([0-9a-zA-Z_ ])+$/g
export const REG_MOBILE = /^(?:(?:\+|00)86)?1\d{10}$/g

export const RULE_USERNAME = {
  pattern: REG_USERNAME,
  message: '支持字母、数字、下划线、横杠',
}

export const RULE_PASSWORD = {
  pattern: REG_PASSWORD,
  message: '支持数字、大小写字母',
}

export const RULE_PASSWORD_LENGTH = {
  pattern: REG_PASSWORD_LENGTH,
  message: '密码长度6~18个字符',
}

export const RULE_EN = {
  pattern: REG_EN,
  message: '支持字母、数字、下划线',
}

export const RULE_MOBILE = {
  pattern: REG_MOBILE,
  message: '请输入正确的手机号',
}
