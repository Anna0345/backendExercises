const express = require('express');
const pool = require('../connection');
require('dotenv').config();
const authenticateAdmin = require('../middlewares/auth');
const router = express.Router();


router.get('/',  authenticateAdmin,async (req, res) => {
    try {
      const rows = await pool.query('SELECT * FROM users');
      res.json(rows);
    } catch (err) {
      console.error(err);
      throw err;
    }
  });

  module.exports = router