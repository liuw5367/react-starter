import { useSearchParams } from 'umi';

export function useQuery() {
  const [searchParams] = useSearchParams();

  function getParam(key: string) {
    return searchParams.get(key);
  }

  return getParam;
}
