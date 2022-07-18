import type { Union } from 'ts-toolbelt';

import type { models } from '@/.umi/plugin-dva/models';
import type { GetRootModelType, GetRootState } from '@/typings';

/** 获取 dva 自动生成的对象 */
type DvaModels = typeof models;

/**
 * 1. 转换为 { K: Model } 的对象。方便获取 Model 的类型
 * {
 *  [K in keyof DvaModels]: DvaModels[K]['model'];
 * }
 * 2. 获取 Model 的联合类型
 * {} [keyof DDvaModels]
 * 3. 添加 modelType字段 获取 ModelType 的联合类型
 * {}[] ['modelType']
 * 4. NonNullable 去空
 * 5. Union.ListOf 将联合类型转化为数组
 */
type Models = Union.ListOf<
  NonNullable<
    {
      [K in keyof DvaModels]: DvaModels[K]['model'];
    }[keyof DvaModels]['modelType']
  >
>;

/**
 * 在这里注册所有的 ModelType
 */
// type Models = [GlobalModelType, TodoModelType];
// type Models = NonNullable<DvaModelsType>;

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
