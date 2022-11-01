import axios from 'axios'
import { useEffect, useState } from 'react'

const SuperHeroesPage = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    axios.get('http://localhost:4000/superheroes')
      .then((res) => {
        setData(res.data)
        setIsLoading(false)
      }).catch(error => {
        setError(error.message)
        setIsLoading(false)
      })
  }, [])

  if (isLoading) {
    return <h2>Loading...</h2>
  }

  if (error) {
    return <h2>{error}</h2>
  }

  return (
    <>
      <div>SuperHeroes.page</div>
      {
        data.map(item => {
          return <div key={item.name}>{item.name}</div>
        })
      }
    </>
  )
}

export default SuperHeroesPage