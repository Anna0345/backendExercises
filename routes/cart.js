const express = require('express');
const pool = require('../connection');
require('dotenv').config();

const router = express.Router();

router.get('/:user_id/cartItems', async (req, res) => {
  const user_Id = req.params.user_id;

  try {
    const userCheckSql = `
      SELECT * FROM users
      WHERE id = ?
    `;
    const [userCheckResults] = await pool.query(userCheckSql, [user_Id]);
    if (userCheckResults.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const sql = `
      SELECT * FROM cartItems
      WHERE user_id = ?
    `;
    const [results] = await pool.query(sql, [user_Id]);
    res.json(results);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
});


router.post('/:user_id/cartItems', async (req, res) => {
  const { product_id, quantity } = req.body;
  const user_Id = req.params.user_id;

  try {
    const userCheckSql = `
      SELECT * FROM users
      WHERE id = ?
    `;
    const [userCheckResults] = await pool.query(userCheckSql, [user_Id]);
    if (userCheckResults.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const sql = `
      INSERT INTO cartItems (user_id, product_id, quantity)
      VALUES (?, ?, ?)
    `;
    const [results] = await pool.query(sql, [user_Id, product_id, quantity]);
    res.json({ message: 'Cart item added successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
});



router.delete('/:user_id/cartItems/:product_id', async (req, res) => {
  const user_Id = req.params.user_id;
  const product_id = req.params.product_id;

  try {
    const userCheckSql = `
      SELECT * FROM users
      WHERE id = ?
    `;
    const [userCheckResults] = await pool.query(userCheckSql, [user_Id]);
    if (userCheckResults.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const sql = `
      DELETE FROM cartItems
      WHERE user_id = ? AND product_id = ?
    `;
    const [results] = await pool.query(sql, [user_Id, product_id]);
    console.log(`Deleted ${results.affectedRows} cart item(s)`);
    res.json({ message: 'Cart item removed successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server Error" });
  }
});


module.exports = router;
