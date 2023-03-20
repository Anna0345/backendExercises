const express = require('express');
const bcrypt = require('bcrypt');
const pool = require('../connection');
const router = express.Router();


router.post('/', async (req, res) => {
  const { name, email, password, isAdmin } = req.body;

  try {
    const userExists = await pool.query(usersTableQuery)('SELECT * FROM users WHERE email = ?', [email]);
    if (userExists.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = { name, email, password: hashedPassword, isAdmin };
    const query = 'INSERT INTO users SET ?';
    const result = await pool.query(query, newUser);

    console.log(`${result.affectedRows} rows inserted`);
    return res.status(201).json({ message: 'User created successfully' });

  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: 'Error creating user' });
  }
});

module.exports = router;
