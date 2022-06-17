const express = require('express');
const db = require('../database');

const router = express.Router();

router.post('/', (req, res) => {
  const { user, body, room } = req.body;
  if( !user || !body || !room ) {
    return res.status(400).json({error: 'Please fill all the fields'});
  }
  db.query(`INSERT INTO messages (user, body, room) VALUES ('${user}', '${body}', '${room}')`, (err, results) => {
    if( err ) {
      return res.status(500).json({error: err.message});
    }else{
      return res.status(200).json({message: 'Message sent'});
    }
  });
});

router.get('/', (req, res) => {
  const query = `select m.id, u.id as user_id, u.name, m.created_at, u.email, u.avatar, r.id as room_id, r.name as room_title, m.body from messages m, users u, rooms r where m.user = u.id and m.room = r.id order by m.created_at desc`;
  db.query(query, (err, results) => {
    if( err ) {
      return res.status(500).json({error: err.message});
    }else{
      return res.status(200).json(results);
    }
  });
});


router.get('/:user', (req, res) => {
  const { user } = req.params;

  const query = `select m.id, u.id as user_id, u.name, m.created_at, u.email, u.avatar, r.id as room_id, r.name as room_title, m.body from messages m, users u, rooms r where u.id = ${user} and m.user = u.id and m.room = r.id order by m.created_at desc`;
  
  db.query(query, (err, results) => {
    if( err ) {
      return res.status(500).json({error: err.message});
    }else{
      return res.status(200).json(results);
    }
  });
});
module.exports = router;