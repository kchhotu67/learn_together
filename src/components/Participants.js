import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { PARTICIPANTS_URL } from '../constants/url';
import { client } from '../utils/client';
import ParticipantsItem from './ParticipantsItem'

function Participants() {
  const {roomId} = useParams();
  const [participants, setParticipants] = useState([]);
  const fetchParticipants = async () => {
    try {
      const res = await client.get(PARTICIPANTS_URL+`/${roomId}`);
      if(res.status === 200){
        setParticipants(res.data);
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchParticipants()
  }, [])
  
  return (
    <div className="participants">
    <h3 className="participants__top">Participants <span>({participants?.length} Joined)</span></h3>
    <div className="participants__list">
      {participants.map(participant => {
        return <ParticipantsItem participant={participant} key={participant.id}/>
      })}

    </div>
  </div>
  )
}

export default Participants