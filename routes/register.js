const express = require('express');
const bcrypt = require('bcrypt');
const pool = require('../connection');
const router = express.Router();

router.post('/', async (req, res) => {
  const { name, email, password, isAdmin } = req.body;

  
  const userExists = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
  if (userExists.length > 0) {
    return res.status(400).json({ message: 'User already exists' });
  }


  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

 
  const newUser = { name, email, password: hashedPassword, isAdmin };
  const query = 'INSERT INTO users SET ?';
  pool.query(query, newUser, (err, result) => {
    if (err) throw err;
    console.log(`${result.affectedRows} rows inserted`);
    return res.status(201).json({ message: 'User created successfully' });
  });
});

module.exports = router;
