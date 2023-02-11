import type { StringifyOptions } from 'query-string';
import qs from 'query-string';

type QueryType = Record<string, any>;
interface QueryFnReturn {
  query: QueryType;
  queryStringify: (object: QueryType, options?: StringifyOptions) => string;
}

export function useQuery(): QueryFnReturn {
  // const [searchParams] = useSearchParams();
  // function getParam(key: string) {
  //   return searchParams.get(key);
  // }

  const query = qs.parse(location.search);

  return { query, queryStringify: qs.stringify };
}
