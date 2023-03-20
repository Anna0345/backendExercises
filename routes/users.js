const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const pool = require('../connection');
require('dotenv').config();
// const authenticateAdmin = require('../middlewares/auth');

const router = express.Router();
const secretKey = process.env.secretKey;

router.post('/', (req, res) => {
  const { email, password } = req.body;

  new Promise((resolve, reject) => {
    pool.query('SELECT * FROM users WHERE email = ?', [email], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  }).then((rows) => {
    if (rows.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const user = rows[0];
    const passwordMatch = bcrypt.compareSync(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ email: user.email, isAdmin: Boolean(user.isAdmin) }, secretKey, { expiresIn: '1h' });
    return res.json({ message: 'Authentication successful', token });
  }).catch((err) => {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  });
});

module.exports = router;


