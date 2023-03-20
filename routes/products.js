const express = require('express');
const jwt = require('jsonwebtoken');
const pool = require('../connection');
const authenticateAdmin  = require('../middlewares/auth');
require('dotenv').config();

const router = express.Router();


// Routes that require authentication and authorization
router.get('/', (req, res) => {
  pool.query('SELECT * FROM products', (err, rows) => {
    if (err) throw err;
    res.json(rows);
  });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM products WHERE id = ?';
  pool.query(query, [id], (err, rows) => {
    if (err) throw err;
    res.json(rows);
  });
});



router.post('/', authenticateAdmin, (req, res) => {
  const { name, price, description } = req.body;
  const query = 'INSERT INTO products (name, price, description) VALUES (?, ?, ?)';
  pool.query(query, [name, price, description], (err, result) => {
    if (err) throw err;
    res.json({ message: 'Product added successfully', productId: result.insertId });
  });
});

router.put('/:id', authenticateAdmin, (req, res) => {
  const { name, price, description } = req.body;
  const { id } = req.params;
  const query = 'UPDATE products SET name = ?, price = ?, description = ? WHERE id = ?';
  pool.query(query, [name, price, description, id], (err, result) => {
    if (err) throw err;
    res.json({ message: `Product ${id} updated successfully` });
  });
});

router.delete('/:id', authenticateAdmin, (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM products WHERE id = ?';
  pool.query(query, [id], (err, result) => {
    if (err) throw err;
    res.json({ message: `Product ${id} deleted successfully` });
  });
});

module.exports = router;


