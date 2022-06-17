import React from 'react'
import { useParams } from 'react-router-dom'
import Profile from '../components/Profile'
import RecentActivities from '../components/RecentActivities'
import RoomLIst from '../components/RoomList'
import TopicList from '../components/TopicList'

function ProfilePage() {
  const {id} = useParams();
  return (
    <main className="profile-page layout layout--3">
    <div className="container">

      <TopicList/>

      <div className="roomList">
        <Profile/>

        
       <RoomLIst user={id}/>
      </div>

      <RecentActivities user={id}/>

    </div>
  </main>
  )
}

export default ProfilePage