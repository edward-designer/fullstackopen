import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { getUsersList } from '../reducers/userSlice'

const Users = () => {
  const dispatch = useDispatch()
  const users = useSelector((state) => state.users)

  useEffect(() => {
    dispatch(getUsersList())
  }, [])

  return (
    <>
      <h2>Users</h2>
      <table className="table-auto mt-10">
        <thead>
          <tr>
            <th className="border-b dark:border-slate-600 font-medium p-2 pl-0 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
              Username
            </th>
            <th className="border-b dark:border-slate-600 font-medium p-2 pl-0 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left">
              blogs created
            </th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => (
            <tr key={user.id}>
              <td className="border-b border-slate-100 dark:border-slate-700 p-2 pl-0 text-slate-500 dark:text-slate-400">
                <Link
                  className="text-blue-800 hover:text-orange-800"
                  to={`/user/${user.id}`}
                >
                  {user.name}
                </Link>
              </td>
              <td className="border-b border-slate-100 dark:border-slate-700 p-2 pl-0 text-slate-500 dark:text-slate-400 text-center">
                {user.blogs.length}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default Users
