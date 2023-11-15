import {Link} from "react-router-dom";
import {useRef, useState} from "react";
import $axios from "../axios/axios.js";
import {useStateContext} from "../context/ContextProvider.jsx";

const Signup = () => {

  const nameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmationRef = useRef()

  const [errors, setErrors] = useState(null);
  const {setUser, setToken} = useStateContext();
  const onSubmit = (e) => {
    e.preventDefault()
    const payload = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: passwordConfirmationRef.current.value
    }
    // console.log(payload)

    $axios.post('/api/signup', payload)
      .then(({data})=>{
        setUser(data.user)
        setToken(data.token)
      }).catch(err => {
        const response = err.response;
        if (response && response.status === 422){
          setErrors(response.data.errors)

        }
    })
  }

    return(
      <>
        <div className='login-signup-form animated fadeInDown'>
          <div className='form'>
            <form onSubmit={onSubmit}>
              <h1 className='title'>Signup for free</h1>
              <div style={{marginBottom: '5px', color:'red'}}>
                {errors && <div>{errors.name}</div>}
              </div>
              <input ref={nameRef} type='text' placeholder='Name'/>
              <div style={{marginBottom: '5px', color:'red'}}>
                {errors && <div>{errors.email}</div>}
              </div>
              <input ref={emailRef} type='email' placeholder='Email'/>
              <div style={{marginBottom: '5px', color:'red'}}>
                {errors && <div>{errors.password}</div>}
              </div>
              <input ref={passwordRef} type='password' placeholder='Password'/>
              <div style={{marginBottom: '5px', color:'red'}}>
                {errors && <div>{errors.password}</div>}
              </div>
              <input ref={passwordConfirmationRef} type='password' placeholder='Password confirmation'/>
              <button className='btn btn-block'>Sign up</button>
              <p className='message'>
                Already registered? <Link to='/login'>Sign in</Link>
              </p>
            </form>
          </div>
        </div>
      </>
    )

}

export default Signup
