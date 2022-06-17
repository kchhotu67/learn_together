const jwt = require('jsonwebtoken');
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const accessToken = authHeader && authHeader.split(' ')[1];
  if( !accessToken ) {
    return res.status(401).json({error: 'No token provided'});
  } else{
    jwt.verify(accessToken, process.env.JWT_SECRET_ACCESS, (err, decoded) => {
      if( err ) {
        return res.status(500).json({error: 'Failed to authenticate token'});
      }else{
        req.user = decoded;
        next();
      }
    });
  }
}
module.exports = authenticateToken;