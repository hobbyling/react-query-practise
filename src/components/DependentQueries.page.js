import { useQuery } from 'react-query'
import axios from 'axios'

const fetchUserByEmail = (email) => {
  return axios.get(`http://localhost:4000/users/${email}`)
}

const fetchCoursesByChannelId = (channelId) => {
  return axios.get(`http://localhost:4000/channels/${channelId}`)
}

export const DependentQueriesPage = ({ email }) => {
  const { data: user } = useQuery(['user', email], () => fetchUserByEmail(email))
  const channelId = user?.data.channelId

  const { data: course } = useQuery(
    ['courses', channelId],
    () => fetchCoursesByChannelId(channelId),
    {
      enabled: !!channelId
    }
  )

  return (
    <>
      <div>DependentQueries.page</div>
      <h3>User: {user?.data.id}</h3>
      <h3>Courses:</h3>
      <ul>
        {
          course?.data.courses.map(item => {
            return <li key={item}>{item}</li>
          })
        }
      </ul>
    </>
  )
}
