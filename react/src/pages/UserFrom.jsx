import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import $axios from "../axios/axios.js";
import {useStateContext} from "../context/ContextProvider.jsx";

const UserForm = () => {

  const navigate = useNavigate()
  const {setNotification} = useStateContext()

  const {id} = useParams()
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState(false)
  const [user, setUser] = useState({
    id: null,
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  })

  if (id) {
    useEffect(() => {
      setLoading(true)
      $axios.get(`/api/users/${id}`)
        .then(({data}) => {
          setLoading(false)
          setUser(data)
        }).catch(e => {
        console.error(e)
        setErrors(e.response.data.errors)
        setLoading(false)
      })
    }, []);
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if (user.id) {
      await $axios.put(`/api/users/${user.id}`, user)
        .then(() => {
          setNotification('User successfully updater')
          navigate('/users')
        }).catch(e => {
          setErrors(e.response.data.errors)
        })
    } else {
      await $axios.post(`/api/users/`, user)
        .then(() => {
          setNotification('User successfullt updater')
          navigate('/users')
        }).catch(e => {
          setErrors(e.response.data.errors)
        })
    }
  }
  return (
    <>

      {user.id && <h1>Update User : {user.name}</h1>}
      {!user.id && <h1>New user</h1>}
      <div className='card animated fadeInDown'>
        {loading && (
          <div className='text-center'>
            ..loading
          </div>
        )}
        {errors && <div className='alert'>
          {Object.keys(errors).map(key => (
            <p key={key}>
              {errors[key][0]}
            </p>
          ))}
        </div>}
        {!loading &&
          <form onSubmit={onSubmit}>
            <input type="text" value={user.name} onChange={e => setUser({...user, name: e.target.value})}
                   placeholder='Name'/>
            <input type="email" value={user.email} onChange={e => setUser({...user, email: e.target.value})}
                   placeholder='Email'/>
            <input type="password" value={user.password} onChange={e => setUser({...user, password: e.target.value})}
                   placeholder='Password'/>
            <input type="password" value={user.password_confirmation}
                   onChange={e => setUser({...user, password_confirmation: e.target.value})}
                   placeholder='Password confirmation'/>
            <button onSubmit={onSubmit} className='btn-add'>Save</button>
          </form>}
      </div>
    </>
  )

}

export default UserForm
