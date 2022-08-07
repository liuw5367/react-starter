// @ts-ignore
import { useDispatch as useDispatchFn } from 'react-redux';

import type { Dispatch } from '@/types';

/**
 * 支持对 dva 的限制
 */
export function useDispatch(): Dispatch {
  return useDispatchFn() as unknown as Dispatch;
}
