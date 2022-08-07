import queryString, { StringifyOptions } from 'query-string';

type QueryType = Record<string, any>;

export function useQuery(): [QueryType, (object: QueryType, options?: StringifyOptions) => string] {
  // const [searchParams] = useSearchParams();
  // function getParam(key: string) {
  //   return searchParams.get(key);
  // }

  const query = queryString.parse(location.search);

  return [query, queryString.stringify];
}
