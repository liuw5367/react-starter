import { useSelector as useSelectorFn } from 'react-redux';

import type { UseSelectorFunction } from '@/types';

/**
 * 添加 RootState 类型
 */
export const useSelector: UseSelectorFunction = useSelectorFn;
