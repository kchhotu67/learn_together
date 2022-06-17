const express = require('express');
const db = require('../database');
const router = express.Router();

router.get('/:roomId', (req, res) => {
  const { roomId } = req.params;
  const query = `select * from (select distinct m.user as user_id from messages m where m.room = ${roomId}) as temp inner join users on users.id = temp.user_id`;
  db.query(query, (err, results) => {
    if( err ) {
      return res.status(500).json({error: err.message});
    }
    return res.status(200).json(results);
  });
});

router.get('/:roomId/count', (req, res) => {
  const { roomId } = req.params;
  const query = `select * from (select distinct m.user as user_id from messages m where m.room = ${roomId}) as temp inner join users on users.id = temp.user_id`;
  db.query(query, (err, results) => {
    if( err ) {
      return res.status(500).json({error: err.message});
    }
    return res.status(200).json(results.length);
  });
});


module.exports = router;