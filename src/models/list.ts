import { PageRequest } from '@/services';
import { queryList } from '@/services/list';
import { BaseModel, generator, ModelType } from '@/types';

export type ListState = {};

type ListModelType = ModelType<'list', ListState, { queryList: PageRequest }>;

export const ListModel: BaseModel<ListModelType> = {
  namespace: 'list',
  state: {},
  effects: {
    *queryList({ payload }) {
      return yield* generator(() => queryList(payload));
    },
  },
  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },
};
