import React from 'react'
import RecentActivities from '../components/RecentActivities'
import RoomLIst from '../components/RoomList'
import '../components/styles/home.style.css'
import TopicList from '../components/TopicList'

function Home() {
  return (
    <main className="layout layout--3">
      <div className="container">

        <TopicList/>

        <RoomLIst/>
 
        <RecentActivities/>

      </div>
    </main>
  )
}

export default Home