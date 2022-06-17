import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ROOMS_URL, TOPICS_URL } from '../constants/url';
import { useAuth } from '../utils/auth';
import { client } from '../utils/client';

function EditRoom() {
  const auth = useAuth();
  const [topics, setTopics] = useState([]);
  const [room, setRoom] = useState({
    topic: '',
    name: '',
    description: ''
  });
  const navigate = useNavigate();
  const {id} = useParams();
  console.log(id)

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const res = await client.get(TOPICS_URL);
        if(res.status === 200){
          console.log(res.data)
          setTopics(res.data);
        }
      } catch (error) {
        console.log(error.response.data)
      }
    }
    fetchTopics();
  }, [])

  const fetchRoomData = async () => {
    try {
      const res = await client.get(ROOMS_URL+`/${id}`);
      if(res.status === 200){
        if(res.data.user_id !== auth.user.id){
          navigate("/")
        }
        setRoom({...room, topic: res.data.topic_name, description: res.data.description, name: res.data.title})
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchRoomData();
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(room);
    try {
      const res = await client.patch(ROOMS_URL+`/${id}`, room);
      if(res.status === 200){
        navigate("/");
      }
    } catch (error) {
      console.log(error.response.data)
    }
  }
  const handleChange = (e) => {
    setRoom({...room, [e.target.name]: e.target.value})
  }
  return (
    <main className="create-room layout">
    <div className="container">
      <div className="layout__box">
        <div className="layout__boxHeader">
          <div className="layout__boxTitle">
            <Link to={"/"}>
              <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                <title>arrow-left</title>
                <path
                  d="M13.723 2.286l-13.723 13.714 13.719 13.714 1.616-1.611-10.96-10.96h27.625v-2.286h-27.625l10.965-10.965-1.616-1.607z">
                </path>
              </svg>
            </Link>
            <h3>Edit Study Room</h3>
          </div>
        </div>
        <div className="layout__body">
          <form className="form" onSubmit={handleSubmit}>
            <div className="form__group">
              <label htmlFor="room_name">Room Name</label>
              <input id="room_name" name="name" type="text" value={room.name} onChange={handleChange} placeholder="E.g. Mastering Python + Django" />
            </div>

            <div className="form__group">
              <label htmlFor="room_topic">Topic</label>
              <input type="text" list="data" id='room_topic' name='topic' value={room.topic} onChange={handleChange} />
              <datalist id="data">
                {topics.map((item, key) =>
                  <option key={key} value={item.name} />
                )}
              </datalist>

            </div>


            <div className="form__group">
              <label htmlFor="room_about">Description</label>
              <textarea name="description" id="room_about" value={room.description} onChange={handleChange} placeholder="Write about your study group..."></textarea>
            </div>
            <div className="form__action">
              <Link to={"/"} className="btn btn--dark">Cancel</Link>
              <button className="btn btn--main" type="submit">Update Room</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </main>
  )
}

export default EditRoom