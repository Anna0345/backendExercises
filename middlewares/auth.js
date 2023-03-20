const jwt = require('jsonwebtoken');
require('dotenv').config();
const secretKey = process.env.secretKey;


const authenticateAdmin = (req, res, next) => {
 
  const token = req.headers.authorization.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Authentication failed: No token provided' });
  }

  try {
    
    const decoded = jwt.verify(token, secretKey);

   
    if (decoded.isAdmin !== true) {
      return res.status(403).json({ message: 'Authorization failed: User is not an admin' });
    }

    req.user = decoded;

    next();
  } catch (err) {
    return res.status(401).json({ message: 'Authentication failed: Invalid token' });
  }
};

module.exports=authenticateAdmin



