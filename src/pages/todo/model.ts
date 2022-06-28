import type { BaseModel, ModelType } from '@/types';

export interface TodoItem {
  key: string;
  name: string;
  content?: string;
}

export interface TodoModelState {
  data: [];
}

interface ModelEffects {
  add: TodoItem;
  remove: { key: string };
}

interface ModelReducers {
  save: TodoModelState;
}

export type TodoModelType = ModelType<'todo', TodoModelState, ModelEffects, ModelReducers>;

const Model: BaseModel<TodoModelType> = {
  namespace: 'todo',
  state: { data: [] },
  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },
  effects: {
    *add({ payload }, { put }) {
      console.log(payload);
      yield put({ type: 'save', payload: {} });
    },
    *remove({ payload }, { put }) {
      console.log(payload);
      yield put({ type: 'save', payload: {} });
    },
  },
};

export default Model;
