import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { REGISTER_URL } from '../constants/url';
import { client } from '../utils/client';

function SignUpPage() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    cpassword: ''
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(user);
    try {
      const res = await client.post(REGISTER_URL, user);
      if(res.status === 200){
        navigate('/login');
      }
    } catch (error) {
      console.log(error.response.data);
    }
  }
  return (
    <main className="auth layout">
    <div className="container">
      <div className="layout__box">
        <div className="layout__boxHeader">
          <div className="layout__boxTitle">
            <h3>Sign up</h3>
          </div>
        </div>
        <div className="layout__body">
          <h2 className="auth__tagline">Learn Together</h2>

          <form className="form" onSubmit={handleSubmit}>
            <div className="form__group form__group">
              <label htmlFor="name">Full Name</label>
              <input id="name" name="name" type="text" onChange={handleChange} value={user.name} placeholder="e.g. Dennis Ivy" />
            </div>
            <div className="form__group form__group">
              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" onChange={handleChange} value={user.email} placeholder="e.g. example@gmail.com" />
            </div>
            <div className="form__group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                onChange={handleChange} value={user.password}
                placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
              />
            </div>

            <div className="form__group">
              <label htmlFor="cpassword">Confirm Password</label>
              <input
                id="cpassword"
                name="cpassword"
                type="password"
                onChange={handleChange} value={user.cpassword}
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

              Sign Up
            </button>
          </form>

          <div className="auth__action">
            <p>Already have an account?</p>
            <Link to={"/login"} className="btn btn--link">Log In</Link>
          </div>
        </div>
      </div>
    </div>
  </main>
  )
}

export default SignUpPage