import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import RecentActivity from '../components/RecentActivity'
import { RECENTS_URL } from '../constants/url';
import { client } from '../utils/client';
import './createRoom.css'

function ActivitiesPage() {
  const [recentMessages, setRecentMessages] = useState([]);
  const fetchRecentMessages = async () => {
    try {
      const res = await client.get(RECENTS_URL);
      if(res.status === 200){
        setRecentMessages(res.data)
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fetchRecentMessages();
  }, []);
  return (
        <main className="layout">
      <div className="container">
        <div className="layout__box">
          <div className="layout__boxHeader">
            <div className="layout__boxTitle">
              <Link to="/">
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                  <title>arrow-left</title>
                  <path
                    d="M13.723 2.286l-13.723 13.714 13.719 13.714 1.616-1.611-10.96-10.96h27.625v-2.286h-27.625l10.965-10.965-1.616-1.607z"
                  ></path>
                </svg>
              </Link>
              <h3>Recent Activities</h3>
            </div>
          </div>

          <div className="activities-page layout__body">
          {
            recentMessages.slice(0,50).map(recentMessage => {
              return <RecentActivity recentMessage={recentMessage} key={recentMessage.id}/>
            })
          }
          </div>
        </div>
      </div>
    </main>
  )
}

export default ActivitiesPage