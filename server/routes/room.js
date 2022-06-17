const express = require('express');
const db = require('../database');
const router = express.Router();

router.get('/', (req, res) => {
  const {topic, user } = req.query;
  let query = `SELECT rooms.id as room_id, users.id as host, email, users.name AS username, rooms.name as title, description, avatar, topics.name as topic_name, rooms.created_at FROM rooms, users, topics WHERE rooms.host = users.id and rooms.topic = topics.id and (topics.name LIKE '%${topic}%' or rooms.name LIKE '%${topic}%') ORDER BY rooms.created_at DESC`;

  if(user) {
    query = `SELECT rooms.id as room_id, users.id as host, email, users.name AS username, rooms.name as title, description, avatar, topics.name as topic_name, rooms.created_at FROM rooms, users, topics WHERE rooms.host = users.id and rooms.topic = topics.id and (topics.name LIKE '%${topic}%' or rooms.name LIKE '%${topic}%') and rooms.host = ${user} ORDER BY rooms.created_at DESC`;
  }
  db.query(query, (err, results) => {
    if( err ) {
      console.log(err)
      return res.status(500).json({error: err.message});
    }else{
      return res.status(200).json(results);
    }
  });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  db.query(`SELECT rooms.id as room_id, rooms.host as user_id, email, users.name AS username, rooms.name as title, description, avatar, topics.name as topic_name, rooms.created_at FROM rooms, users, topics WHERE rooms.host = users.id and rooms.topic = topics.id and rooms.id = ${id}`, (err, results) => {
    if( err ) {
      return res.status(500).json({error: err.message});
    }else{
      return res.status(200).json(results[0]);
    }
  });
});

router.post('/', (req, res) => {
  let { host, name, topic, description } = req.body;
  if( !host || !name || !topic ) {
    return res.status(400).json({error: 'Please fill all the fields'});
  }
  db.query(`SELECT * FROM topics WHERE name = '${topic}'`, (err, results) => {
    if( err ) {
      return res.status(500).json({error: err.message});
    }else{
      if( results.length > 0 ) {
        topic = results[0].id;
        db.query(`INSERT INTO rooms (host, name, topic, description) VALUES ('${host}', '${name}', '${topic}', '${description}')`, (err, results) => {
          if( err ) {
            return res.status(500).json({error: err.message});
          }else{
            return res.status(200).json({message: 'Room added successfully'});
          }
        });
      }else{
        db.query(`INSERT INTO topics (name) VALUES ('${topic}')`, (err, results) => {
          if( err ) {
            return res.status(500).json({error: err.message});
          }else{
            console.log(results);
            topic = results.insertId;
            db.query(`INSERT INTO rooms (host, name, topic, description) VALUES ('${host}', '${name}', '${topic}', '${description}')`, (err, results) => {
              if( err ) {
                return res.status(500).json({error: err.message});
              }else{
                return res.status(200).json({message: 'Room added successfully'});
              }
            });
          }
        });
      }
      
    }
  });
  
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.query(`DELETE FROM rooms WHERE id = '${id}'`, (err, results) => {
    if( err ) {
      return res.status(500).json({error: err.message});
    }else{
      return res.status(200).json({message: 'Room deleted successfully'});
    }
  });
});

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  let { name, topic, description } = req.body;
  if( !name || !topic ) {
    return res.status(400).json({error: 'Please fill all the fields'});
  }
  db.query(`SELECT * FROM topics WHERE name = '${topic}'`, (err, results) => {
    if( err ) {
      return res.status(500).json({error: err.message});
    }else{
      if( results.length > 0 ) {
        topic = results[0].id;
        db.query(`UPDATE rooms SET name = '${name}', topic = '${topic}', description = '${description}' WHERE id = '${id}'`, (err, results) => {
          if( err ) {
            return res.status(500).json({error: err.message});
          }else{
            return res.status(200).json({message: 'Room updated successfully'});
          }
        });
      }else{
        db.query(`INSERT INTO topics (name) VALUES ('${topic}')`, (err, results) => {
          if( err ) {
            return res.status(500).json({error: err.message});
          }else{
            console.log(results);
            topic = results.insertId;
            db.query(`UPDATE rooms SET name = '${name}', topic = '${topic}', description = '${description}' WHERE id = '${id}'`, (err, results) => {
              if( err ) {
                return res.status(500).json({error: err.message});
              }else{
                return res.status(200).json({message: 'Room updated successfully'});
              }
            });
          }
        });
      }
    }
  });
});
    

module.exports = router;