import qs from 'query-string'
import { useEffect, useState } from 'react'

type QueryType = Record<string, any>

export function useQuery() {
  // const [searchParams] = useSearchParams();
  // function getParam(key: string) {
  //   return searchParams.get(key);
  // }

  const [query, setQuery] = useState<QueryType>({})

  useEffect(() => {
    setQuery(qs.parse(location.search))
  }, [])

  return query
}
