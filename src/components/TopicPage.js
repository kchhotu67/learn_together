import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BROWSE_TOPICS } from '../constants/url';
import { client } from '../utils/client';
import './styles/topicPage.css'

function TopicPage() {
  const [topics, setTopics] = useState([]);
  const [topicsList, setTopicList] = useState([]);
  const [allCount, setAllCount] = useState(0);
  const [searchInput, setSearchInput] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const filteredTopics = topics.filter(topic => {
      if(topic.name.search(searchInput) !==-1) return true;
      return false;
    });
    setTopicList(filteredTopics)
  }

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const res = await client.get(BROWSE_TOPICS);
        if(res.status === 200){
          setTopics(res.data);
          setTopicList(res.data);
          const total = res.data.reduce((acc, topic) => acc + topic.count, 0);
          setAllCount(total);
        }
      } catch (error) {
        console.log(error.response.data)
      }
    }
    fetchTopics();
  }, []);


  return (
    <main className="layout__box">
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
          <h3>Browse Topics</h3>
        </div>
      </div>

      <div className="topics-page layout__body">
        <form className="header__search" onSubmit={handleSubmit}>
          <label>
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
              <title>search</title>
              <path
                d="M32 30.586l-10.845-10.845c1.771-2.092 2.845-4.791 2.845-7.741 0-6.617-5.383-12-12-12s-12 5.383-12 12c0 6.617 5.383 12 12 12 2.949 0 5.649-1.074 7.741-2.845l10.845 10.845 1.414-1.414zM12 22c-5.514 0-10-4.486-10-10s4.486-10 10-10c5.514 0 10 4.486 10 10s-4.486 10-10 10z"
              ></path>
            </svg>
            <input placeholder="Search for topics..." value={searchInput} onChange={(e) => {setSearchInput(e.target.value)}}/>
          </label>
        </form>

        <ul className="topics__list">
          <li>
            <button to="/" onClick={() => {navigate('/')}} className="active">All <span>{allCount}</span></button>
          </li>
          {topicsList.map((topic, index) => {
            return <li key={index}>
              <button onClick={() => {navigate(`/?q=${topic.name}`)}}>{topic.name} <span>{topic.count}</span></button>
            </li>
          })}
        </ul>
      </div>
    </main>
  )
}

export default TopicPage