import type { BaseModel, ModelType } from '@/types';

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export interface GlobalModelState {
  permissions: string[];
  num: number;
}

export interface GlobalModelType extends ModelType {
  namespace: 'global';
  state: GlobalModelState;
  reducers: {
    save: GlobalModelState;
    add: { num: number };
  };
  effects: {
    addAsync: void;
  };
}

const Model: BaseModel<GlobalModelType> = {
  namespace: 'global',
  state: {
    permissions: [],
    num: 0,
  },
  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
    add(state, action) {
      state.num += action.payload.num;
    },
  },
  effects: {
    *addAsync(action, { put }) {
      yield delay(1000);
      yield put({ type: 'add', payload: { num: 1 } });
    },
  },
};

export default Model;
