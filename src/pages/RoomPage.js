import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { format } from 'timeago.js';
import Participants from '../components/Participants'
import { IMAGE_URL, MESSAGES_URL, ROOMS_URL } from '../constants/url';
import { useAuth } from '../utils/auth';
import { client } from '../utils/client';
import './roomPage.css'

function RoomPage() {
  const {roomId} = useParams();
  const [room, setRoom] = useState(null);
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();
  const auth = useAuth()
  const [body, setBody] = useState('');

  const fetchRooms = async () => {
    try {
 
      const res = await client.get(ROOMS_URL+`/${roomId}`);
      if(res.status === 200){
        setRoom(res.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchRooms();
  }, [roomId])


  const fetchMessages = async () => {
    try {
 
      const res = await client.get(MESSAGES_URL+`/${roomId}`);
      if(res.status === 200){
        setMessages(res.data)
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    
    fetchMessages();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const messageBody = {
      body,
      room: roomId,
      user: auth.user.id
    }

    try {
      const res = await client.post(MESSAGES_URL, messageBody);
      if(res.status === 200){
        console.log(res.data)
        fetchMessages()
      }
    } catch (error) {
      console.log(error);
    }
    setBody('')
  }

  const deleteMessage = async (id) => {
    try {
      const res = await client.delete(MESSAGES_URL+`/${id}`);
      if(res.status === 200){
        fetchMessages();
      }
    } catch (error) {
      console.log(error);
    }
  }

  const deleteRoom = async () => {
    try {
      const res = await client.delete(ROOMS_URL+`/${roomId}`);
      if(res.status === 200){
        navigate("/")
      }
    } catch (error) {
      console.log(error);
    }
  }
  if(!room){
    return <div>Loading...</div>
  }
  
  return (
    <main className="room-page">
    <div className="container">

      <div className="room">
        <div className="room__top">
          <div className="room__topLeft">
            <Link to={"/"}>
              <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                <title>arrow-left</title>
                <path
                  d="M13.723 2.286l-13.723 13.714 13.719 13.714 1.616-1.611-10.96-10.96h27.625v-2.286h-27.625l10.965-10.965-1.616-1.607z"
                ></path>
              </svg>
            </Link>
            <h3>Study Room</h3>
          </div>

          { auth.user.id === room.user_id &&
          <div className="room__topRight">
          <Link to={`/edit-room/${roomId}`}>
            <svg
              enableBackground="new 0 0 24 24"
              height="32"
              viewBox="0 0 24 24"
              width="32"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>edit</title>
              <g>
                <path d="m23.5 22h-15c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h15c.276 0 .5.224.5.5s-.224.5-.5.5z" />
              </g>
              <g>
                <g>
                  <path
                    d="m2.5 22c-.131 0-.259-.052-.354-.146-.123-.123-.173-.3-.133-.468l1.09-4.625c.021-.09.067-.173.133-.239l14.143-14.143c.565-.566 1.554-.566 2.121 0l2.121 2.121c.283.283.439.66.439 1.061s-.156.778-.439 1.061l-14.142 14.141c-.065.066-.148.112-.239.133l-4.625 1.09c-.038.01-.077.014-.115.014zm1.544-4.873-.872 3.7 3.7-.872 14.042-14.041c.095-.095.146-.22.146-.354 0-.133-.052-.259-.146-.354l-2.121-2.121c-.19-.189-.518-.189-.707 0zm3.081 3.283h.01z"
                  />
                </g>
                <g>
                  <path
                    d="m17.889 10.146c-.128 0-.256-.049-.354-.146l-3.535-3.536c-.195-.195-.195-.512 0-.707s.512-.195.707 0l3.536 3.536c.195.195.195.512 0 .707-.098.098-.226.146-.354.146z"
                  />
                </g>
              </g>
            </svg>
          </Link>
          <div onClick={deleteRoom}>
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
              <title>remove</title>
              <path
                d="M27.314 6.019l-1.333-1.333-9.98 9.981-9.981-9.981-1.333 1.333 9.981 9.981-9.981 9.98 1.333 1.333 9.981-9.98 9.98 9.98 1.333-1.333-9.98-9.98 9.98-9.981z"
              ></path>
            </svg>
          </div>
        </div>}


        </div>
        <div className="room__box">
          <div className="room__header">
            <div className="room__info">
              <h3>{room?.title}</h3>
              <span>{format(room.created_at)}</span>
            </div>
            <div className="room__hosted">
              <p>Hosted By</p>
              <Link to={`/profile/${room.user_id}`}  className="room__author">
                <div className="avatar avatar--small">
                  <img src={IMAGE_URL+`/${room.avatar}`} alt='avatar'/>
                </div>
                <span>{room.username}</span>
              </Link>
            </div>
            <div className="room__details">
              {room?.description}
            </div>
            <span className="room__topics">{room?.topic_name}</span>
          </div>
          <div className="room__conversation">
            <div className="threads">
              {messages.map(mess => {
                return (
                  <div className="thread" key={mess.id}>
                <div className="thread__top">
                  <div className="thread__author">
                    <Link to={`/profile/${mess.user_id}`} className="thread__authorInfo">
                      <div className="avatar avatar--small">
                        <img src={IMAGE_URL+`/${mess.avatar}`} alt='avatar'/>
                      </div>
                      <span>{mess.name}</span>
                    </Link>
                    <span className="thread__date">{format(mess.created_at)}</span>
                  </div>
                  {
                    auth.user.id === mess.user_id && 
                    <div className="thread__delete" onClick={() => deleteMessage(mess.id)}>
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                      <title>remove</title>
                      <path
                        d="M27.314 6.019l-1.333-1.333-9.98 9.981-9.981-9.981-1.333 1.333 9.981 9.981-9.981 9.98 1.333 1.333 9.981-9.98 9.98 9.98 1.333-1.333-9.98-9.98 9.98-9.981z"
                      ></path>
                    </svg>
                  </div>
                  }
                </div>
                <div className="thread__details">
                  {mess.body}
                </div>
              </div>
                )
              })}
            </div>
          </div>
        </div>
        <div className="room__message">
          <form onSubmit={handleSubmit}>
            <input name="" placeholder="Write your message here..." value={body} onChange={(e) => setBody(e.target.value)}/>
          </form>
        </div>
      </div>

      <Participants/>

    </div>
  </main>
  )
}

export default RoomPage