const express = require('express');
const pool = require('../connection');
require('dotenv').config();

const router = express.Router();

router.post('/:id/cartItems', (req, res) => {
    const { product_id, quantity } = req.body;
    const user_Id = req.params.id;
  
    const sql = `
      INSERT INTO cartItems (user_id, product_id, quantity)
      VALUES (?, ?, ?)
    `;
  
    pool.query(sql, [user_Id, product_id, quantity], (error, results, fields) => {
      if (error) throw error;
      res.json({ message: 'Cart item added successfully' });
    });
  });
  
  module.exports=router