import { useQuery } from 'react-query'
import axios from 'axios'

const fetchSuperHeroes = () => {
  return axios.get('http://localhost:4000/superheroes')
}

const fetchFriends = () => {
  return axios.get('http://localhost:4000/friends')
}

export const ParallelQueriesPage = () => {

  const { data: superHeroes } = useQuery('super-heroes', fetchSuperHeroes)
  const { data: friends } = useQuery('friends', fetchFriends)

  return (
    <>
      <div>ParallelQueries.page</div>
      <div>
        <h3>Super Hero</h3>
        {
          superHeroes?.data.map(item => {
            return <div key={item.name}>
              {item.name}
            </div>
          })
        }
      </div>
      <div>
        <h3>Friends</h3>
        {
          friends?.data.map(item => {
            return <div key={item.name}>
              {item.name}
            </div>
          })
        }
      </div>

    </>

  )
}
