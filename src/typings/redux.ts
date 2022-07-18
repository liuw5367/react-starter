import type { RootModelType, RootState } from '@/models/';

import type {
  Action,
  AllModelActionTypes,
  AllNamespaces,
  FuncReturnType,
  ModelEffectKeys,
  ModelKeys,
  ModelReducerKeys,
  PutAction,
} from '.';

/**
 * 用来定义参数和返回值类型
 */
export type EffectParam<T = any, R = any> = {
  '@@effect@@': 'effect params & return';
  param: T;
  return: R;
};

/** 获取指定K的值，如果不存在就取 R */
type GetEffectParamValue<T, K extends keyof EffectParam, R = T> = T extends EffectParam ? T[K] : R;

/**
 * actionType 只允许 AllModelActionTypes
 */
export type Dispatch = <R = any, T extends AllModelActionTypes = AllModelActionTypes>(
  action: Action<GetEffectParamValue<DispatchPayload<T>, 'param'>, T>,
) => GetEffectParamValue<DispatchPayload<T>, 'return', R>;

/**
 * 根据 namespace 和 key，取 ModelType 中 effect 和 reducer 定义的类型
 */
export type DispatchPayload<T extends AllModelActionTypes> = T extends `${infer N}/${infer K}`
  ? N extends AllNamespaces
    ? K extends ModelEffectKeys<RootModelType[N]>
      ? RootModelType[N]['effects'][K]
      : K extends ModelReducerKeys<RootModelType[N]>
      ? K extends 'save'
        ? Partial<RootModelType[N]['reducers'][K]>
        : RootModelType[N]['reducers'][K]
      : // 默认 ModelState
        RootModelType[N]['state']
    : // namespace 不存在
      never
  : // 不符合 `{namespace}/{key}`
    never;

/**
 * actionType 允许 AllModelActionTypes 和 ModelKeys<ModelType>
 */
export type PutDispatch<M extends ModelType> = <
  R = any,
  T extends AllModelActionTypes | ModelKeys<M> = AllModelActionTypes | ModelKeys<M>,
>(
  action: PutAction<GetEffectParamValue<PutDispatchPayload<M, T>, 'param'>, M, T>,
) => GetEffectParamValue<PutDispatchPayload<M, T>, 'return', R>;

/**
 * 根据 ModelType、namespace 和 key，取 ModelType 中 effect 和 reducer 定义的类型
 */
export type PutDispatchPayload<M, T extends AllModelActionTypes | ModelKeys<M>> = T extends AllModelActionTypes
  ? DispatchPayload<T>
  : M extends ModelType
  ? T extends ModelKeys<M>
    ? T extends ModelEffectKeys<M>
      ? M['effects'][T]
      : T extends ModelReducerKeys<M>
      ? T extends 'save'
        ? Partial<M['reducers'][T]>
        : M['reducers'][T]
      : M['state']
    : never
  : never;

/**
 * !! 待完善
 * 重新定义 connect 方法，添加 mapStateToProps，mapDispatchToProps 方法中参数的类型
 * 建议使用 @/hooks/useSelector 函数代替 connect
 */
// export function connect(mapStateToProps?: (s: RootState) => any, mapDispatchToProps?: (d: Dispatch) => any) {
//   return umiConnect(mapStateToProps, mapDispatchToProps);
// }

export type EffectType = 'takeEvery' | 'takeLatest' | 'watcher' | 'throttle';
export interface ReducerEnhancer {
  (reducer: Reducer<any>): void;
}
export interface SubscriptionsMapObject {
  [key: string]: Subscription;
}
export type Subscription = (api: SubscriptionAPI, done: Function) => void;
export interface SubscriptionAPI {
  history: History;
  dispatch: Dispatch;
}

export type Reducer<S = any, A extends Action = any> = (state: S, action: A) => S | void;
export type Effect<P = any, M extends ModelType = any, R = any> = (
  action: Action<P>,
  effects: EffectsCommandMap<M>,
) => Generator<any, R, any> | void;
export type EffectWithType<P = any, M extends ModelType = any, R = any> = [Effect<P, M, R>, { type: EffectType }];
export type EffectsMapObject = Record<string, Effect | EffectWithType>;
export type ReducersMapObject<State = any, A extends Action = any> = {
  [K in keyof State]: Reducer<State[K], A>;
};

export type UseSelectorFunction = <R>(fn: (state: RootState) => R) => R;
export type SelectFunction = (state: RootState) => any;

export interface EffectsCommandMap<M extends ModelType = any> {
  put: PutDispatch<M>;
  select: (fn: SelectFunction) => any;

  call: Function;
  take: Function;
  cancel: Function;

  [key: string]: any;
}

/**
 * 重新定义 Model 添加范型
 * 但是 yield 执行的方法 无法获取返回值的类型，可以使用 ReturnType<typeof function>获取
 */
export interface Model<State = any> {
  namespace: string;
  state?: State;
  effects?: EffectsMapObject;
  reducers?: ReducersMapObject | [ReducersMapObject, ReducerEnhancer];
  subscriptions?: SubscriptionsMapObject;
}

/**
 * 所有的 Model 都应继承自 ModelType
 */
export interface ModelType<N extends string = any, S = any, E extends object = {}, R extends object = { save: S }> {
  namespace: N;
  state: S;
  /** 值为 payload 传参 */
  effects: E;
  /** 值为 payload 传参 */
  reducers: R;
}

/**
 * 用于将 ModelType 中的 effect 和 reducer 参数转换成，Effect 和 Reducer 的泛型
 */
export interface BaseModel<T extends ModelType> extends Model<T['state']> {
  namespace: T['namespace'];
  state: T['state'];
  effects: {
    /* 将泛型参数赋给 Effect */
    [K in keyof T['effects']]:
      | Effect<GetEffectParamValue<T['effects'][K], 'param'>, T, GetEffectParamValue<T['effects'][K], 'return', any>>
      | EffectWithType<
          GetEffectParamValue<T['effects'][K], 'param'>,
          T,
          GetEffectParamValue<T['effects'][K], 'return', any>
        >;
  };
  reducers: {
    /* 将泛型参数赋给 Reducer */
    [K in keyof T['reducers']]: Reducer<T['state'], Action<T['reducers'][K]>>;
  };
  /** 该变量只是为了获取 T 的类型，非必需，所以使用了问号 */
  modelType?: T;
}

/**
 * generator 返回参数中函数的返回值类型
 */
interface GeneratorCall {
  <T extends Function>(fn: T): Generator<any, FuncReturnType<T>, any>;
}

interface GeneratorSelect {
  <T extends (s: RootState) => any>(select: Function, fn: T): T extends (s: RootState) => infer R
    ? Generator<any, R, any>
    : Generator<any, any, any>;
}

/** 包裹一层 generator 函数，使其可以获取返回值的类型 */
// @ts-ignore 以 GeneratorCall 为准。函数类型推断不太一致，所以这里忽略一下
export const generator: GeneratorCall = function* (fn: (...args: any[]) => any) {
  return yield fn();
};

/*
// 这种方法也可以获取 call 的返回值，但是没有办法限制方法传参
export const callWrapper: GeneratorCall = function*(call: Function, fn: Function, ...args: any[]) {
  return yield call(fn, ...args);
};
*/

/** 包裹一层 generator 函数，使其可以获取返回值的类型 */
// @ts-ignore 以 GeneratorSelect 为准。函数类型推断不太一致，所以这里忽略一下
export const selectWrapper: GeneratorSelect = function* (select: Function, fn: SelectFunction) {
  return yield select(fn);
};
