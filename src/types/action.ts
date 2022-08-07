import type { Union } from 'ts-toolbelt';

import { models } from '@/models';
import type { ModelType } from '@/types/redux';

import type { ValueOf } from '.';

// 模版字符串拼接 'keyof XX' 会报错
// 使用 '(keyof XX) & string' 取字符串
// type ModelSaveType = `${(keyof ConnectState) & string}/save`

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
export type Models = Union.ListOf<
  NonNullable<
    {
      [K in keyof DvaModels]: DvaModels[K];
    }[keyof DvaModels]['modelType']
  >
>;

/**
 * 转化成对象 key 为 namespace，value 为 ModelType
 * {
 *  [namespace]: ModelType
 * }
 */
export type GetRootModelType<T extends ModelType[]> = {
  [P in T[number] as P['namespace']]: P;
};

export type GetRootState<T extends Record<string, ModelType>> = {
  [K in keyof T]: T[K]['state'];
} & {
  loading: Loading;
};

export interface Loading {
  global: boolean;
  effects: Record<AllModelActionTypes, boolean>;
  models: {
    [K in AllNamespaces]: boolean;
  };
}

/**
 * 所有的 ModelType
 * {
 *   [namespace]: ModelType;
 * }
 */
export type RootModelType = GetRootModelType<Models>;

type GetModelKeys<K extends keyof RootModelType> = ModelKeys<RootModelType[K]>;

type NamespaceWithTypes = {
  [K in keyof RootModelType]: `${K}/${GetModelKeys<K> & string}`;
};

type NamespaceWithKeys = {
  [K in keyof RootModelType]: GetModelKeys<K>;
};

export type ModelKeys<T> = T extends ModelType ? keyof T['effects'] | keyof T['reducers'] : never;

export type ModelEffectKeys<M extends ModelType> = keyof M['effects'];

export type ModelReducerKeys<M extends ModelType> = keyof M['reducers'];

export type AllNamespaces = keyof RootModelType;

export type AllModelKeys = ValueOf<NamespaceWithKeys>;

export type AllModelActionTypes = ValueOf<NamespaceWithTypes>;

export type AllModelSaveTypes = `${AllNamespaces}/save`;

type NoParam = void | undefined | null;

type BooleanAction<T, P> = P extends NoParam ? { type: T; payload?: any } : { type: T; payload: P };

/**
 * type 只允许 Model 中的 effect 和 reducer
 */
export type Action<P = any, T extends AllModelActionTypes = AllModelActionTypes> = BooleanAction<T, P>;

export type PutAction<
  P = any,
  M = any,
  T extends AllModelActionTypes | ModelKeys<M> = AllModelActionTypes | ModelKeys<M>,
> = BooleanAction<T, P>;

/**
 * RootState，在组件中使用 useSelector, connect 函数时使用
 * {
 *   [namespace]: ModelState;
 * }
 */
export type RootState = GetRootState<RootModelType>;
