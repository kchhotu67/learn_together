import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { RECENTS_URL } from '../constants/url';
import { client } from '../utils/client';
import RecentActivity from './RecentActivity'
import './styles/recentactivities.css'

function RecentActivities({user}) {
  const [recentMessages, setRecentMessages] = useState([]);
  const fetchRecentMessages = async () => {
    try {
      let query = '';
      if(user){
        query = `/${user}`;
      }
      const res = await client.get(RECENTS_URL+query);
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
    <div className="activities">
          <div className="activities__header">
            <h2>Recent Activities</h2>
          </div>
          {
            recentMessages.slice(0,5).map(recentMessage => {
              return <RecentActivity recentMessage={recentMessage} key={recentMessage.id}/>
            })
          }
          <div className="view-all">
            <Link to="/activities">View All</Link>
          </div>
        </div>
  )
}

export default RecentActivities