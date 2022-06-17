import React, { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ROOMS_URL } from '../constants/url';
import { client } from '../utils/client';
import Room from './Room'
import './styles/roomlist.style.css'

function RoomLIst({user}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [rooms, setRooms] = useState([]);
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        let query = ""
        let topic = searchParams.get('q');
        if(topic === null){
          topic = ""
        }
        if(user){
          query = `?topic=${topic}&user=${user}`;
        }else{
          query = `?topic=${topic}`
        }
        const res = await client.get(ROOMS_URL+query);
        if(res.status === 200){
          setRooms(res.data)
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchRooms();
  }, [searchParams])
  
  return (
    <div className="roomList">
      {!user && 
        <div className="roomList__header">
        <div>
          <h2>Study Room</h2>
          <p>{rooms.length} Rooms available</p>
        </div>
        <Link to={"/create-room"} className="btn btn--main">
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
            <title>add</title>
            <path
              d="M16.943 0.943h-1.885v14.115h-14.115v1.885h14.115v14.115h1.885v-14.115h14.115v-1.885h-14.115v-14.115z"
            ></path>
          </svg>
          Create Room
        </Link>
      </div>
      }

      {rooms.map(room => {
        return <Room room={room} key={room.room_id}/>
      })}
      
    </div>
  )
}

export default RoomLIst