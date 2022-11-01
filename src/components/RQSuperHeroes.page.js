import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSuperHeroesData, useAddSuperHeroData } from '../hooks/useSuperHeroresData'

const RQSuperHeroesPage = () => {
  const [name, setName] = useState('')
  const [alterEgo, setAlterEgo] = useState('')

  const onSuccess = (data) => {
    console.log('Perform side effect after data fetching', data)
  }

  const onError = (error) => {
    console.log('Perform side effect after encountering error', error)
  }

  const { isLoading, data, isError, error, isFetching, refetch } = useSuperHeroesData(onSuccess, onError)

  const {
    mutate: addHero,
    isLoading: addHeroIsLoading,
    isError: addHeroIsError,
    error: addHeroError } = useAddSuperHeroData()

  const handleAddHeroClick = () => {
    const hero = { name, alterEgo }
    addHero(hero)
  }

  if (isLoading || isFetching) {
    return <h2>loading...</h2>
  }

  if (isError) {
    return <h2>{error.message}</h2>
  }

  if (addHeroIsError) {
    return <h2>{addHeroError.message}</h2>
  }

  return (
    <>
      <div>RQSuperHeroes.page</div>
      <div>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="text" value={alterEgo} onChange={(e) => setAlterEgo(e.target.value)} />
        <button onClick={handleAddHeroClick}>Add Hero</button>
      </div>
      <button onClick={refetch}>Fetch heroes</button>
      {
        data?.data.map(item => {
          return <div key={item.id}>
            <Link to={`/rq-super-heroes/${item.id}`}>{item.name}</Link>
          </div>
        })
      }
      {/* {
        data.map(item => {
          return <div key={item}>{item}</div>
        })
      } */}
    </>
  )
}

export default RQSuperHeroesPage