import type { AliasToken } from 'antd/es/theme/interface';

export * from './rule';

export const APP_NAME = 'AppName';

export const FORMAT_DATE_YEAR = 'YYYY';
export const FORMAT_DATE_YM = 'YYYY-MM';
export const FORMAT_DATE_YMD = 'YYYY-MM-DD';
export const FORMAT_DATE_YMD_HMS = 'YYYY-MM-DD HH:mm:ss';
export const FORMAT_DATE_YMD_HM = 'YYYY-MM-DD HH:mm';
export const FORMAT_TIME_HMS = 'HH:mm:ss';
export const FORMAT_TIME_HM = 'HH:mm';

export const CACHE_TOKEN = 'token';

export const Theme: Partial<AliasToken> = {
  colorPrimary: '#1777FF',
};
