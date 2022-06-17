const express = require('express');
const db = require('../database');
const router = express.Router();
const jwt = require('jsonwebtoken');
const authenticateToken = require('../middlewares/validateToken');

const generateAccessToken = (user) => {
  return jwt.sign({id: user.id}, process.env.JWT_SECRET_ACCESS, {expiresIn: '15m'});
}

const generateRefreshToken = (user) => {
  return jwt.sign({id: user.id}, process.env.JWT_SECRET_REFRESH);
}


const login = (req, res) => {
  const { email, password } = req.body;
  if( !email || !password ) {
    return res.status(400).json({error: 'Please fill all the fields'});
  }
  db.query(`SELECT * FROM users WHERE email = '${email}'`, (err, results) => {
    if( err ) {
      return res.status(500).json({error: err.message});
    }else{
      if( results.length > 0 ) {
        if( results[0].password !== password ) {
          return res.status(400).json({error: 'Password is incorrect'});
          
        }else{
          console.log(results[0]);
          const accessToken = generateAccessToken(results[0]);
          const refreshToken = generateRefreshToken(results[0]);
          db.query('INSERT INTO refresh_tokens (token) VALUES (?)', [refreshToken], (err, results) => {
            if( err ) {
              return res.status(500).json({error: err.message});
            }else{
              return res.status(200).json({accessToken});
            }
          });
        }
      }else{
        return res.status(404).json({error: 'User not found'});
      }
    }
  });
}

const register = (req, res) => {
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

}

const logout = (req, res) => {
  return res.status(200).json({message: 'Logged out successfully'});
}



const refresh = (req, res) => {
  const { refreshToken } = req.body;
  console.log('refreshing token...')
  console.log(req.cookies);
  if( !refreshToken ) {
    return res.status(400).json({error: 'Please provide a refresh token'});
  }
  jwt.verify(refreshToken, process.env.JWT_SECRET_REFRESH, (err, decoded) => {
    if( err ) {
      return res.status(401).json({error: 'Invalid refresh token'});
    }else{
      db.query(`SELECT * FROM refresh_tokens WHERE token = '${refreshToken}'`, (err, results) => {
        if( err ) {
          return res.status(500).json({error: 'Invalid refresh token'});
        }else{
          if( results.length > 0 ) {
            const accessToken = generateAccessToken(decoded);
            return res.status(200).json({accessToken});
          }else{
            return res.status(401).json({error: 'Invalid refresh token'});
          }
        }
      });
    }
  });
}


const getUserData = (req, res) => {
  console.log(req.user);
  db.query(`SELECT * FROM users WHERE id = ${req.user.id}`, (err, results) => {
    if( err ) {
      return res.status(500).json({error: err.message});
    }else{
      results[0].password = undefined;
      return res.status(200).json(results[0]);
    }
  });
}
router.post('/login', login);
router.post('/register', register);
router.delete('/logout', logout);
router.post('/refresh', refresh);
router.post('/authenticate', authenticateToken, getUserData);

module.exports = router;