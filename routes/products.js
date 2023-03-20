const express = require('express');
const jwt = require('jsonwebtoken');
const pool = require('../connection');
const authenticateAdmin = require('../middlewares/auth');
require('dotenv').config();

const router = express.Router();

// Routes that require authentication and authorization
router.get('/', async (req, res) => {
  try {
    const rows = await pool.query('SELECT * FROM products ');
    res.json(rows);
  } catch (err) {
    console.error(err);
    throw err;
  }
});


router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM products WHERE id = ?';
  try {
    const rows = await pool.query(query, [id]);
    res.json(rows);
  } catch (err) {
    console.error(err);
    throw err;
  }
});

router.post('/', authenticateAdmin, async (req, res) => {
  const { name, price, description } = req.body;
  const query = 'INSERT INTO products (name, price, description) VALUES (?, ?, ?)';
  try {
    const result = await pool.query(query, [name, price, description]);
    res.json({ message: 'Product added successfully', productId: result.insertId });
  } catch (err) {
    console.error(err);
    throw err;
  }
});

router.put('/:id', authenticateAdmin, async (req, res) => {
  const { name, price, description } = req.body;
  const { id } = req.params;
  const query = 'UPDATE products SET name = ?, price = ?, description = ? WHERE id = ?';
  try {
    const result = await pool.query(query, [name, price, description, id]);
    res.json({ message: `Product ${id} updated successfully` });
  } catch (err) {
    console.error(err);
    throw err;
  }
});

router.delete('/:id', authenticateAdmin, async (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM products WHERE id = ?';
  try {
    const result = await pool.query(query, [id]);
    res.json({ message:` Product ${id} deleted successfully `});
  } catch (err) {
    console.error(err);
    throw err;
  }
});

module.exports = router;



