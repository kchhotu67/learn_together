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

router.get('/:room', (req, res) => {
  const { room } = req.params;
  db.query(`SELECT messages.id, messages.created_at, messages.body, messages.room, users.id as user_id, email, name, avatar FROM messages, users WHERE room = '${room}' and messages.user = users.id`, (err, results) => {
    if( err ) {
      return res.status(500).json({error: err.message});
    }else{
      return res.status(200).json(results);
    }
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.query(`DELETE FROM messages WHERE id = '${id}'`, (err, results) => {
    if( err ) {
      return res.status(500).json({error: err.message});
    }else{
      return res.status(200).json({message: 'Message deleted'});
    }
  });
});
module.exports = router;