import type { GetRootModelType, GetRootState, Models } from '@/types';

/**
 * 在这里注册所有的 ModelType
 */
// type Models = [GlobalModelType, TodoModelType];

/**
 * 所有的 ModelType
 * {
 *   [namespace]: ModelType;
 * }
 */
type RootModelType = GetRootModelType<Models>;

/**
 * RootState，在组件中使用 useSelector, connect 函数时使用
 * {
 *   [namespace]: ModelState;
 * }
 */
type RootState = GetRootState<RootModelType>;

export { RootModelType, RootState };
