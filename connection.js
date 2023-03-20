const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

pool.query(`
  CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    isAdmin BOOLEAN NOT NULL DEFAULT false
  )
`, (error, results, fields) => {
  if (error) {
    console.error(error);
  } else {
    console.log('Users table created or already exists');
  }
});
pool.query(`
 
CREATE TABLE IF NOT EXISTS products (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  description TEXT NOT NULL
)
`, (error, results, fields) => {
  if (error) {
    console.error(error);
  } else {
    console.log('products table created or already exists');
  }
});
pool.query(`
 
CREATE TABLE IF NOT EXISTS cartItems (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
)
`, (error, results, fields) => {
  if (error) {
    console.error(error);
  } else {
    console.log('cartItems table created or already exists');
  }
});


module.exports = pool;