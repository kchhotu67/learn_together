import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { API_USERS_URL, IMAGE_URL } from '../constants/url';
import { useAuth } from '../utils/auth'
import { client } from '../utils/client';
import './styles/profile.css'

function Profile() {
  const auth = useAuth();
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const fetchUserData = async () => {
    try {
      const res = await client.get(API_USERS_URL+`/${id}`);
      if(res.status === 200){
        setUser(res.data)
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchUserData();
  }, [])
  

  
  return (
    <>
      <div className="profile">
        <div className="profile__avatar">
          <div className="avatar avatar--large active">
            <img src={IMAGE_URL+`${user?.avatar}`} alt='avatar'/>
          </div>
        </div>
        <div className="profile__info">
          <h3>{user?.name}</h3>
          <p>{user?.email}</p>
          { auth.user.id == id ? <Link to={'/edit-profile'} className="btn btn--main btn--pill">Edit Profile</Link>: null}
        </div>
        <div className="profile__about">
          <h3>About</h3>
          <p>
            {user?.bio}
          </p>
        </div>
      </div>
      <div className="roomList__header">
      <div>
        <h2>Study Rooms Hosted by {user?.name}</h2>
      </div>
    </div>
    </>
  )
}

export default Profile