import React, { useState } from 'react'
import './styles/header.style.css'
import logo from '../assets/images/logo512.png'
import { useAuth } from '../utils/auth'
import ProfileMenu from './ProfileMenu';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { IMAGE_URL } from '../constants/url';

function Header() {
  const auth = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  if(!auth.user) {
    return null;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!searchInput){
      setSearchParams({});
    }else{
      navigate(`/?q=${searchInput}`);
      setSearchInput('')
    }
  }
  return (
    <header className="header header--loggedIn">
      <div className="container">
        <Link to={"/"} className="header__logo">
          <img src={logo} alt='Logo'/>
          <h1>Learn Together</h1>
        </Link>
        <form className="header__search" onSubmit={handleSubmit}>
          <label>
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
              <title>search</title>
              <path
                d="M32 30.586l-10.845-10.845c1.771-2.092 2.845-4.791 2.845-7.741 0-6.617-5.383-12-12-12s-12 5.383-12 12c0 6.617 5.383 12 12 12 2.949 0 5.649-1.074 7.741-2.845l10.845 10.845 1.414-1.414zM12 22c-5.514 0-10-4.486-10-10s4.486-10 10-10c5.514 0 10 4.486 10 10s-4.486 10-10 10z"
              ></path>
            </svg>
            <input placeholder="Search for rooms..." value={searchInput} onChange={(e) => {setSearchInput(e.target.value)}} />
          </label>
        </form>
        <nav className="header__menu">
          <div className="header__user">
            <Link to={`/profile/${auth.user.id}`}>
              <div className="avatar avatar--medium active">
                <img src={IMAGE_URL+`${auth.user.avatar}`} alt='profile'/>
              </div>
              <p>{auth.user.name} <span>{auth.user.email}</span></p>
            </Link>
            <button className="dropdown-button" onClick={() => {setShowDropdown(!showDropdown)}}>
              <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                <title>chevron-down</title>
                <path d="M16 21l-13-13h-3l16 16 16-16h-3l-13 13z"></path>
              </svg>
            </button>
          </div>

          { showDropdown && <ProfileMenu setShowDropdown={setShowDropdown}/>}
        </nav>
      </div>
    </header>
  )
}

export default Header