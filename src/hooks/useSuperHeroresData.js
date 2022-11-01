import { useQuery, useMutation, useQueryClient } from 'react-query'
import { request } from '../utils/axios-utils'

const fetchSuperHeroes = () => {
  // return axios.get('http://localhost:4000/superheroes')
  return request({
    url: '/superheroes'
  })
}

const addSuperHero = (hero) => {
  // return axios.post('http://localhost:4000/superheroes', hero)
  return request({
    url: '/superheroes',
    method: 'post',
    data: hero
  })
}

export const useSuperHeroesData = (onSuccess, onError) => {
  return useQuery(
    'super-heroes',
    fetchSuperHeroes,
    {
      // cacheTime: 1000 * 60 * 5,
      // staleTime: 10000
      // refetchOnMount: false,
      // refetchOnWindowFocus: false,
      // refetchInterval: interval,
      // refetchIntervalInBackground: true,
      // enabled: false
      onSuccess,
      onError,
      // select: (data) => {
      //   const result = data?.data.map(item => item.name)
      //   return result
      // }
    }
  )
}


export const useAddSuperHeroData = () => {
  const queryClient = useQueryClient()
  return useMutation(addSuperHero, {
    // onSuccess: (data) => {
    //   // queryClient.invalidateQueries('super-heroes')

    //   queryClient.setQueryData('super-heroes', (oldQueryData) => {
    //     return {
    //       ...oldQueryData,
    //       data: [...oldQueryData.data, data.data]
    //     }
    //   })
    // }
    // 當 mutate 調用時
    onMutate: async (newHero) => {
      // 撤銷相關的查詢（這樣它們就不會覆蓋我們的樂觀更新）
      await queryClient.cancelQueries('super-heroes')

      // 保存前一次狀態的快照
      const previousHeroData = queryClient.getQueriesData('super-heroes')

      // 執行"樂觀"更新
      queryClient.setQueryData('super-heroes', (oldQueryData) => {
        return {
          ...oldQueryData,
          data: [...oldQueryData.data, { id: oldQueryData.data?.length + 1, ...newHero }]
        }
      })

      // 返回具有快照值的上下文對象
      return {
        previousHeroData
      }
    },
    // 如果修改失敗，則使用 onMutate 返回的上下文進行回滾
    onError: (_error, _hero, context) => {
      queryClient.setQueriesData('user-heroes', context.previousHeroData)
    },
    // 總是在錯誤或成功之後重新獲取
    onSettled: () => {
      queryClient.invalidateQueries('super-heroes')
    }
  })
}