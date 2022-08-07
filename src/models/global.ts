import { login, logout } from '@/services/user';
import { BaseModel, EffectParam, generator, MenuItem, ModelType, PromiseReturnType, selectWrapper } from '@/types';
import { clearCacheOnLogout } from '@/utils';

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export interface GlobalModelState {
  permissions: string[];
  menus: MenuItem[];
  num: number;
  token?: string;
}

interface GlobalModelType extends ModelType {
  namespace: 'global';
  state: GlobalModelState;
  reducers: {
    add: { num: number };
    /** save 默认为通用处理。在 dispatch 函数类型定义时，已经添加了 Partial 进行包裹。 */
    save: GlobalModelState;
    /** 编辑器可以自动提示传参的 payload 的类型 */
    saveUser: { name: string };
    /** 参数需要全部传递时，可使用 Partial 包裹*/
    saveOther: Partial<{ name: string }>;
  };
  effects: {
    addAsync: void;
    logout: void;
    /** 使用 yield* 自动获取类型，外层需包一个 generator 方法 */
    generatorCall: void;
    /** 使用 yield* 自动获取类型，外层需包一个 generator 方法 */
    generatorSelect: void;
    /** 使用 PromiseReturnType + typeof fn 获取函数类型 */
    generatorReturn: void;
    /** 编辑器可以自动提示传参的 payload 的类型 */
    login: { name: string; password: string };
    /**
     * 添加返回值支持，第一个参数为 dispatch 时的 payload，第二个参数为 dispatch 时的返回值
     * const returnValue = dispatch({
     *    type: 'global/effectReturn', payload: { params: 'ss' }
     * });
     * !! 此时 returnValue的类型为 { return: string }
     */
    effectReturn: EffectParam<{ params: string }, { return: string }>;
  };
}

export const GlobalModel: BaseModel<GlobalModelType> = {
  namespace: 'global',
  state: {
    permissions: [],
    menus: [],
    num: 0,
  },
  reducers: {
    add(state, action) {
      state.num += action.payload.num;
    },
    save(state, action) {
      return { ...state, ...action.payload };
    },
    saveUser(state, action) {
      // 可以自动获取到 payload 的类型，注意校验 payload 是否为空
      const { name } = action.payload || {};
      return { ...state, ...action.payload };
    },
    saveOther(state, action) {
      // 可以自动获取到 payload 的类型，注意校验 payload 是否为空
      const { name } = action.payload || {};
      return { ...state, ...action.payload };
    },
  },
  effects: {
    *addAsync(action, { put }) {
      yield delay(1000);
      yield put({ type: 'add', payload: { num: 1 } });
    },
    *logout() {
      yield logout();
      clearCacheOnLogout();
      window.location.href = '/';
    },
    *generatorCall() {
      const userId = localStorage.getItem('userId') || '';
      // 使用 callWrapper 包裹。通过 yield * 获取函数返回值类型
      const response = yield* generator(() => login({ username: userId, password: userId }));
      console.log(['generatorCall'], response);
    },
    *generatorSelect(action, { select }) {
      // 使用 selectWrapper 包裹。通过 yield * 获取函数返回值类型
      const value = yield* selectWrapper(select, (s) => s.global);
      console.log(['generatorSelect'], value);
    },
    *generatorReturn(action, { put }) {
      const userId = localStorage.getItem('userId') || '';
      // generator 函数无法获取 返回值类型，这里使用 PromiseReturnType<typeof fn> 获取返回值类型
      const response: PromiseReturnType<typeof login> = yield login({ username: userId, password: userId });
      // 等价于上面的写法
      // ！！接口请求建议直接使用 yield requestFn()，不建议使用 call，
      // ！！因为 call 函数后，无法得知 requestFn 参数类型，编辑器不会校验参数是否匹配
      // const response: PromiseReturnType<typeof getUserInfo> = yield call(getUserInfo, userId);
      if (response.success) {
        yield put({
          type: 'save',
          payload: { token: response.data },
        });
      }
    },
    *login({ payload }) {
      // 可以自动获取到 payload 的类型，注意校验 payload 是否为空
      const { name, password } = payload || {};
      yield 'login';
    },
    *effectReturn(action) {
      console.log(action.payload.params);
      yield login({ username: '', password: '' });
      return { return: '' };
    },
  },
};
