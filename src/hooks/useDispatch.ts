// @ts-ignore
import { useDispatch as useDispatchFn } from 'react-redux';

import type { Dispatch } from '@/types';

/**
 * 支持 dva
 */
export function useDispatch(): Dispatch {
  return useDispatchFn() as unknown as Dispatch;
}
