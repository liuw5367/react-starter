import { useSelector as useSelectorFn } from 'umi';

import type { UseSelectorFunction } from '@/typings';

/**
 * 添加 RootState 类型
 */
export const useSelector: UseSelectorFunction = useSelectorFn;
