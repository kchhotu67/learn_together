import React from 'react'
import { Link } from 'react-router-dom'
import { IMAGE_URL } from '../constants/url'

function ParticipantsItem({participant}) {
  return (
    <Link to={`/profile/${participant.id}`} href="profile.html" className="participant">
      <div className="avatar avatar--medium">
        <img src={IMAGE_URL+`/${participant?.avatar}`} alt='avatar'/>
      </div>
      <p>
        {participant?.name}
        <span>{participant?.email}</span>
      </p>
    </Link>
  )
}

export default ParticipantsItem