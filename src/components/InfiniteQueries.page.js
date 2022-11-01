import { useInfiniteQuery } from 'react-query';
import axios from 'axios';
import { Fragment } from 'react';

const fetchColors = ({ pageParam = 1 }) => {
  // return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageParam}`)
  return axios.post('http://bo.hello.goldenf.co/api/v1/games', {
    "page": pageParam,
    "per_page": 10,
    "filter": {
      "vendor_code": "pg"
    }
  })
}

export const InfiniteQueriesPage = () => {
  const { isLoading, isFetching, isError, error, data, hasNextPage, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    ['colors'],
    fetchColors,
    {
      getNextPageParam: (_lastPage, pages) => {
        if (pages.length < 4) {
          return pages.length + 1
        } else {
          return undefined
        }
      }
    }
  )

  if (isLoading) {
    return <h2>loading...</h2>
  }

  if (isError) {
    return <h2>{error.message}</h2>
  }

  return (
    <>
      <div>
        {
          data?.pages.map((group, i) => {
            return (
              <Fragment key={i}>
                {
                  group?.data?.data?.data.map(color => {
                    return (
                      <h2 key={color.name_en}>{color.vendor_code}. {color.name_zh}</h2>
                    )
                  })
                }
              </Fragment>
            )
          })
        }
      </div>
      <div>
        <button onClick={fetchNextPage} disabled={!hasNextPage}>More Colors</button>
      </div>
      {isFetching && !isFetchingNextPage ? 'Fetching...' : null}
    </>
  )
}