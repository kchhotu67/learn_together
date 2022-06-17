const express = require('express');
const db = require('../database');
const router = express.Router();

router.post('/:id', (req, res) => {
  const { bio } = req.body;
  const { id } = req.params;
  console.log(bio)
  if (req.files && bio.length > 0) {
    const file = req.files.profile;
    let filename = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + file.name;
    file.mv(`${__dirname}/../images/${filename}`, (err) => {
      if (err) {
        return res.status(500).send(err);
      }else{
        db.query(`UPDATE users SET bio = '${bio}', avatar = '${filename}' WHERE id = ${id}`, (err, results) => {
          if (err) {
            return res.status(500).send(err);
          }else{
            db.query(`SELECT * FROM users WHERE id = ${id}`, (err, results) => {
              if (err) {
                return res.status(500).send(err);
              }else{
                results[0].password = undefined;
                return res.status(200).json(results[0]);
              }
            });
          }
        });
      }
    });
  }else{
    res.status(400).send('Please fill all the fields');
  }
});

module.exports = router;