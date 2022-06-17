import React, { useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { AUTHENTICATE_URL, LOGIN_URL } from '../constants/url';
import { useAuth } from '../utils/auth';
import { client } from '../utils/client';
import './loginPage.css'

function LoginPage() {
  const [user, setUser] = useState({email: '', password: ''});
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectPath = location.state?.path || '/';

  const handleChange = (event) => {
    setUser({...user, [event.target.name]: event.target.value});
  }

  const requestLogin = async (access_token) => {
    const res = await client.post(AUTHENTICATE_URL, {}, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${access_token}`
      }
    });
    auth.login(res.data);
    navigate(redirectPath);
  }
  const onLogin = async (event) => {
    event.preventDefault();
    try {
      const res = await client.post(LOGIN_URL, user);
     
      console.log(res.data);
      await localStorage.setItem('access_token', res.data.accessToken);
      await requestLogin(res.data.accessToken);
    } catch(error) {
      console.log(error.response.data);
    }

  }

  if(auth.user){
    return <Navigate to={'/'} />
  }


  return (
    <main className="auth layout">
    <div className="container">
      <div className="layout__box">
        <div className="layout__boxHeader">
          <div className="layout__boxTitle">
            <h3>Login</h3>
          </div>
        </div>
        <div className="layout__body">
          <h2 className="auth__tagline">Learn Together</h2>

          <form className="form" onSubmit={onLogin}>
            <div className="form__group form__group">
              <label htmlFor="room_name">email</label>
              <input 
                id="email" 
                name="email" 
                type="text" 
                value={user.email} 
                onChange={handleChange} 
                placeholder="e.g. dennis_ivy" 
              />
            </div>
            <div className="form__group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                value={user.password} 
                onChange={handleChange}
                placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
              />
            </div>

            <button className="btn btn--main" type="submit">
              <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 32 32"
              >
                <title>lock</title>
                <path
                  d="M27 12h-1v-2c0-5.514-4.486-10-10-10s-10 4.486-10 10v2h-1c-0.553 0-1 0.447-1 1v18c0 0.553 0.447 1 1 1h22c0.553 0 1-0.447 1-1v-18c0-0.553-0.447-1-1-1zM8 10c0-4.411 3.589-8 8-8s8 3.589 8 8v2h-16v-2zM26 30h-20v-16h20v16z"
                ></path>
                <path
                  d="M15 21.694v4.306h2v-4.306c0.587-0.348 1-0.961 1-1.694 0-1.105-0.895-2-2-2s-2 0.895-2 2c0 0.732 0.413 1.345 1 1.694z"
                ></path>
              </svg>

              Login
            </button>
          </form>

          <div className="auth__action">
            <p>Haven't signed up yet?</p>
            <Link to={"/signup"} className="btn btn--link">Sign Up</Link>
          </div>
        </div>
      </div>
    </div>
  </main>
  )
}

export default LoginPage