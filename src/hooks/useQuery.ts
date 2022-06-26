import { useSearchParams } from 'umi';

export function useQuery() {
  const [searchParams] = useSearchParams();

  return function (key: string) {
    return searchParams.get(key);
  };
}
