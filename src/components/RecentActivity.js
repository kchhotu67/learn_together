import React from 'react'
import { Link } from 'react-router-dom'
import './styles/recentActivityItem.css'
import { format } from 'timeago.js'
import { IMAGE_URL } from '../constants/url'

function RecentActivity({recentMessage}) {
  return (
    <div className="activities__box">
      <div className="activities__boxHeader roomListRoom__header">
        <Link to={`/profile/${recentMessage.user_id}`} className="roomListRoom__author">
          <div className="avatar avatar--small active">
            <img src={IMAGE_URL+`/${recentMessage.avatar}`} alt='avatar'/>
          </div>
          <p>
            {recentMessage?.name}
            <span>{format(recentMessage.created_at)}</span>
          </p>
        </Link>
      </div>
      <div className="activities__boxContent">
        <p>replied to post “<Link to={`/rooms/${recentMessage?.room_id}`} href="room.html">{recentMessage?.room_title}</Link>”</p>
        <div className="activities__boxRoomContent">
          {recentMessage?.body.length> 50? recentMessage?.body.slice(0,50)+ '...': recentMessage.body}
        </div>
      </div>
    </div>
  )
}

export default RecentActivity