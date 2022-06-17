const express = require('express');
const db = require('../database');
const router = express.Router();

router.get('/', (req, res) => {
  db.query('SELECT * FROM topics', (err, results) => {
    if( err ) {
      return res.status(500).json({error: err.message});
    }else{
      return res.status(200).json(results);
    }
  });
});

router.get('/browse-topic', (req, res) => {
  db.query(`SELECT topics.name as name, COUNT(*) as count FROM rooms INNER JOIN topics WHERE topics.id  = rooms.topic GROUP BY topics.name ORDER BY count DESC`, (err, results) => {
    if( err ) {
      return res.status(500).json({error: err.message});
    }else{
      return res.status(200).json(results);
    }
  });
});

module.exports = router;