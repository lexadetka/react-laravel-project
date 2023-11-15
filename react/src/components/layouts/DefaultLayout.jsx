import {Link, Navigate, Outlet} from "react-router-dom";
import {useStateContext} from "../../context/ContextProvider.jsx";
import $axios from "../../axios/axios.js";
import {useEffect} from "react";

const DefaultLayout = () => {
  const {user, token, notification, setToken, setUser} = useStateContext()

  if (!token) {
    return (
      <Navigate to='/login'/>
    )
  }

  const onLogout = (e) => {
    $axios.get('/api/logout')
      .then(res => {
        setToken(null)
        setUser(null)
      })
      .catch(e => {
        console.error(e)
      })
  }

  useEffect(() => {
    $axios.get('/api/user')
      .then(({data}) => {
        setUser(data)
      }).catch(e => {
      console.error(e)
    })
  }, []);

  return (
    <>
      <div id="defaultLayout">
        <aside>
          <Link to='/dashboard'>Dashboard</Link>
          <Link to='/users'>Users</Link>
        </aside>
        <div className="content">
          <header>
            <div>
              Header
            </div>
            <div>
              {user && <>user name: {user.name}</>}
              <a className='btn-logout' href='#' onClick={onLogout}>Logout</a>
            </div>
          </header>
          <main>
            <Outlet></Outlet>
          </main>
        </div>
        {notification &&
          <div className='notification animated fadeInDown'>
            {notification}
          </div>
        }

      </div>
    </>
  )

}

export default DefaultLayout
