const express = require('express');
const pool = require('../connection');
require('dotenv').config();

const router = express.Router();

router.post('/:id/cartItems', async (req, res) => {
    const { product_id, quantity } = req.body;
   
   try{ 
    const user_Id = req.params.id;
    const sql = `
      INSERT INTO cartItems (user_id, product_id, quantity)
      VALUES (?, ?, ?)
    `;
    const [results] = await pool.query(sql, [user_Id, product_id, quantity])
    res.json({ message: 'Cart item added successfully' });

   }catch (error){
      console.error(error.message);
      res.status(500).json({ message: "Server Error" });
    }
  })

   
  
  
  module.exports=router