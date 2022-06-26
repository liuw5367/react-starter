import type { RootModelType } from '@/models';
import type { ModelType } from '@/types/redux';

import type { ValueOf } from './';

// 模版字符串拼接 'keyof XX' 会报错
// 使用 '(keyof XX) & string' 取字符串
// type ModelSaveType = `${(keyof ConnectState) & string}/save`

/**
 * 转化成对象 key 为 namespace，value 为 ModelType
 * {
 *  [namespace]: ModelType
 * }
 */
export type ModelTypeObj<T extends ModelType[]> = {
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
