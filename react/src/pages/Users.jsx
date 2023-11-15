import {useEffect, useState} from "react";
import $axios from "../axios/axios.js";
import {Link} from "react-router-dom";
import login from "./Login.jsx";
import {useStateContext} from "../context/ContextProvider.jsx";

const Users = () => {

  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const {setNotification} = useStateContext()

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    setLoading(true)
    await $axios.get('/api/users')
      .then(({data})=> {
        setLoading(false)
        setUsers(data.data)
      }).catch(e => {
        setLoading(false)
    })
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are u sure u want to delete this user?')){
      return
    }
    await $axios.delete(`/api/users/${id}`)
      .then(res => {
        setNotification('User deleted successfully')
        getUsers()
      })

  }
    return(
        <>
            <div style={{display:'flex', justifyContent:'space-between', alignItems: 'center'}}>
              <h1>Users</h1>
              <Link className='btn-add' to='/users/new'>Add new</Link>
            </div>
          <div className='card animated fadeInDown'>
            <table>
            <thead>
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>Name</th>
              <th>Create date</th>
              <th>Actions</th>
            </tr>
            </thead>
              { loading ?
              <tbody>
              <tr>
                <td colSpan='5' className='text-center'>
                  ...loading
                </td>
              </tr>
              </tbody>
                :
            <tbody>
            {users?.map((u, index) => (
              <tr key={index}>
                <td>{u.id}</td>
                <td>{u.email}</td>
                <td>{u.name}</td>
                <td>{u.created_at}</td>
                <td>
                  <Link to={`/users/${u.id}`} className='btn-edit'>Edit</Link>

                  <button onClick={event => handleDelete(u.id)} style={{marginLeft:'5px'}} className='btn-delete'>Delete</button>
                </td>
              </tr>
            ))}
            </tbody>
            }
            </table>

          </div>
        </>
    )

}

export default Users
