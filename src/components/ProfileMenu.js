import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../utils/auth'

function ProfileMenu({setShowDropdown}) {
  const auth = useAuth();
  const navigate = useNavigate();
  return (
    <div className="dropdown-menu">
      <button to={"/edit-profile"} className="dropdown-link" onClick={() => {setShowDropdown(false); navigate('/edit-profile')}}>
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
          <title>tools</title>
          <path
            d="M27.465 32c-1.211 0-2.35-0.471-3.207-1.328l-9.392-9.391c-2.369 0.898-4.898 0.951-7.355 0.15-3.274-1.074-5.869-3.67-6.943-6.942-0.879-2.682-0.734-5.45 0.419-8.004 0.135-0.299 0.408-0.512 0.731-0.572 0.32-0.051 0.654 0.045 0.887 0.277l5.394 5.395 3.586-3.586-5.394-5.395c-0.232-0.232-0.336-0.564-0.276-0.887s0.272-0.596 0.572-0.732c2.552-1.152 5.318-1.295 8.001-0.418 3.274 1.074 5.869 3.67 6.943 6.942 0.806 2.457 0.752 4.987-0.15 7.358l9.392 9.391c0.844 0.842 1.328 2.012 1.328 3.207-0 2.5-2.034 4.535-4.535 4.535zM15.101 19.102c0.26 0 0.516 0.102 0.707 0.293l9.864 9.863c0.479 0.479 1.116 0.742 1.793 0.742 1.398 0 2.535-1.137 2.535-2.535 0-0.668-0.27-1.322-0.742-1.793l-9.864-9.863c-0.294-0.295-0.376-0.74-0.204-1.119 0.943-2.090 1.061-4.357 0.341-6.555-0.863-2.631-3.034-4.801-5.665-5.666-1.713-0.561-3.468-0.609-5.145-0.164l4.986 4.988c0.391 0.391 0.391 1.023 0 1.414l-5 5c-0.188 0.188-0.441 0.293-0.707 0.293s-0.52-0.105-0.707-0.293l-4.987-4.988c-0.45 1.682-0.397 3.436 0.164 5.146 0.863 2.631 3.034 4.801 5.665 5.666 2.2 0.721 4.466 0.604 6.555-0.342 0.132-0.059 0.271-0.088 0.411-0.088z"
          ></path>
        </svg>
        Edit Profile</button>
      <button to={'/login'} className="dropdown-link" onClick={() => {setShowDropdown(false);auth.logout();}}>
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
          <title>sign-out</title>
          <path
            d="M3 0h22c0.553 0 1 0 1 0.553l-0 3.447h-2v-2h-20v28h20v-2h2l0 3.447c0 0.553-0.447 0.553-1 0.553h-22c-0.553 0-1-0.447-1-1v-30c0-0.553 0.447-1 1-1z"
          ></path>
          <path
            d="M21.879 21.293l1.414 1.414 6.707-6.707-6.707-6.707-1.414 1.414 4.293 4.293h-14.172v2h14.172l-4.293 4.293z"
          ></path>
        </svg>
        Logout</button>
    </div>
  )
}

export default ProfileMenu