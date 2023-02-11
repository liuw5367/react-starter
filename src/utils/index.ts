import { isEmpty as isEmptyLodash } from 'lodash';

import { CACHE_TOKEN } from '@/constants';

export function isEmpty(value: unknown): boolean {
  if (value == null) {
    return true;
  }
  if (value === '') {
    return true;
  }
  if (value === 0) {
    return true;
  }
  return isEmptyLodash(value);
}

export function isNotEmpty(value: unknown): boolean {
  return !isEmpty(value);
}

export function isLogin(): boolean {
  return isNotEmpty(localStorage.getItem(CACHE_TOKEN));
}

export function clearCacheOnLogout() {
  localStorage.removeItem(CACHE_TOKEN);
}
