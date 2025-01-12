import React, { useState } from 'react';
import {getAuth,signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider} from 'firebase/auth'
import { app } from '../Firebase'; 
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
  
    const navigate = useNavigate();
  
    const submitHandler = (event)=>{
      event.preventDefault();
      const auth = getAuth(app);
      signInWithEmailAndPassword(auth, email, password)
      .then(userData=>{
         navigate('/dashboard')
      })
      .catch(err=>{
        console.log(err)
      })
    }

    const loginWithGoogle = ()=>{
       const auth = getAuth(app)
       const provider = new GoogleAuthProvider()
       signInWithPopup(auth, provider)
       .then((result)=>{
         console.log(result)
         navigate('/dashboard')
       })
       .catch((error)=>{
        console.log(error)
       })
    }

    const loginWithFacebook =()=>{
      const auth = getAuth(app)
       const provider = new FacebookAuthProvider()
       signInWithPopup(auth, provider)
       .then((result)=>{
         console.log(result)
         navigate('/dashboard')
       })
       .catch((error)=>{
        console.log(error)
       })
    }
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={submitHandler}>
          <input onChange={(e)=>{setEmail(e.target.value)}} type="email" placeholder='email'/>
          <input onChange={(e)=>{setPassword(e.target.value)}} type="password" placeholder='password' />
          <button type='submit'>Login</button>
          <br />
          <br />
          <button type='button' onClick={loginWithGoogle}>Login With Google</button>
          <button type='button' onClick={loginWithFacebook}>Login With Facebook</button>
        </form>
      </div>
    )
}

export default Login
