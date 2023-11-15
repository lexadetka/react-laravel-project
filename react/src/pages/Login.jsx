import {Link} from "react-router-dom";
import {useRef, useState} from "react";
import {useStateContext} from "../context/ContextProvider.jsx";
import $axios from "../axios/axios.js";

const Login = () => {

  const emailRef = useRef()
  const passwordRef = useRef()

  const [errors, setErrors] = useState(null);
  const {setUser, setToken} = useStateContext();
  const onSubmit = (e) => {
    e.preventDefault()
    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    }

    $axios.post('/api/login', payload)
      .then(({data}) => {
        setUser(data.user)
        setToken(data.token)
      }).catch(err => {
      const response = err.response;
      if (response && response.status === 422) {
        setErrors(response.data.errors)
      }
    })
  }

    return (
      <>
        <div className='login-signup-form animated fadeInDown'>
          <div className='form'>
            <form onSubmit={onSubmit}>
              <h1 className='title'>Login into your account</h1>
              <div style={{marginBottom: '5px', color: 'red'}}>
                {errors && <div>{errors.email}</div>}
              </div>
              <input ref={emailRef} type='email' placeholder='Email'/>
              <div style={{marginBottom: '5px', color: 'red'}}>
                {errors && <div>{errors.password}</div>}
              </div>
              <input ref={passwordRef} type='password' placeholder='Password'/>
              <button className='btn btn-block'>Login</button>
              <p className='message'>
                Not Registered? <Link to='/signup'>Create an account</Link>
              </p>
            </form>
          </div>
        </div>
      </>
    )


}

export default Login
