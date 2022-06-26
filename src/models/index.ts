import type { GetRootState, ModelTypeObj } from '@/types';

import type { GlobalModelType } from './global';

/**
 * 在这里注册所有的 ModelType
 */
type Models = [GlobalModelType];

/**
 * 所有的 ModelType
 * {
 *   [namespace]: ModelType;
 * }
 */
type RootModelType = ModelTypeObj<Models>;

/**
 * RootState，在组件中使用 useSelector, connect 函数时使用
 * {
 *   [namespace]: ModelState;
 * }
 */
type RootState = GetRootState<RootModelType>;

export { RootModelType, RootState };
