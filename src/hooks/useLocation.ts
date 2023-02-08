import { useLocation as useLocationFn } from 'react-router-dom';

import { useQuery } from './useQuery';

/** 给 location 添加 query 对象 */
export function useLocation() {
  const location = useLocationFn();
  const { query } = useQuery();

  return { ...location, query };
}
