import React, { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { BROWSE_TOPICS } from '../constants/url'
import { client } from '../utils/client'
import './styles/topiclist.style.css'
function TopicList() {
  const [topics, setTopics] = useState([]);
  const [allCount, setAllCount] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const res = await client.get(BROWSE_TOPICS);
        if(res.status === 200){
          setTopics(res.data);
          const total = res.data.reduce((acc, topic) => acc + topic.count, 0);
          setAllCount(total);
        }
      } catch (error) {
        console.log(error.response.data)
      }
    }
    fetchTopics();
  }, [])
  return (
    <div className="topics">
          <div className="topics__header">
            <h2>Browse Topics</h2>
          </div>
          <ul className="topics__list">
            <li>
              <button to="/" onClick={() => {setSearchParams({})}} className="active">All <span>{allCount}</span></button>
            </li>
            {topics.slice(0,5).map((topic, index) => {
              return <li key={index}>
              <button onClick={() => {setSearchParams({q:topic.name})}}>{topic.name} <span>{topic.count}</span></button>
            </li>
            })}
          </ul>
          <Link to={"/topics"} className="btn btn--link">
            More
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
              <title>chevron-down</title>
              <path d="M16 21l-13-13h-3l16 16 16-16h-3l-13 13z"></path>
            </svg>
          </Link>
        </div>
  )
}

export default TopicList