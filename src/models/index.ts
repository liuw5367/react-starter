import { TodoModel } from '@/pages/todo/model';

import { GlobalModel } from './global';
import { ListModel } from './list';

/**
 * 注册所有的 Model
 * key 无意义，不重复就行
 */
export const models = {
  1: GlobalModel,
  2: TodoModel,
  3: ListModel,
};
