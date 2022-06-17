const express = require('express');
const db = require('../database');
const router = express.Router();

router.post('/', (req, res) => {
  const { name, email, password, cpassword } = req.body;
  if( !name || !email || !password || !cpassword ) {
    return res.status(400).json({error: 'Please fill all the fields'});
  }
  if( password !== cpassword ) {
    return res.status(400).json({error: 'Passwords do not match'});
  }
  db.query(`SELECT * FROM users WHERE email = '${email}'`, (err, results) => {
    if( err ) {
      return res.status(500).json({error: err.message});
    }else{
      if( results.length > 0 ) {
        return res.status(400).json({error: 'Email already exists'});
      }else{
        db.query(`INSERT INTO users (name, email, password) VALUES ('${name}', '${email}', '${password}')`, (err, results) => {
          if( err ) {
            return res.status(500).json({error: err.message});
          }else{
            console.log(results);
            db.query(`SELECT * FROM users WHERE email = '${email}'`, (err, results) => {
              if( err ) {
                return res.status(500).json({error: err.message});
              }else{
                results[0].password = undefined;
                return res.status(200).json(results[0]);
              }
            });
          }
        });
      }
    }
  });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  db.query(`SELECT * FROM users WHERE id = ${id}`, (err, results) => {
    if( err ) {
      return res.status(500).json({error: err.message});
    }else{
      if( results.length > 0 ) {
        results[0].password = undefined;
        return res.status(200).json(results[0]);
      }else{
        return res.status(404).json({error: 'User not found'});
      }
    }
  });
});

module.exports = router;