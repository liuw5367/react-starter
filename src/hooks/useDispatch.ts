import { useDispatch as useDispatchFn } from 'umi';

import type { Dispatch } from '@/typings';

/**
 * 支持对 dva 的限制
 */
export function useDispatch(): Dispatch {
  return useDispatchFn();
}
