const pool = require('./connection');
const bcrypt = require('bcrypt');


function seedProducts() {
  const products = [];

  for (let i = 1; i <= 10; i++) {
    const name = `Product ${i}`;
    const price =  Math.random() * 100 + 1;
    
    const description = `This is product ${i}`;

    products.push([name, price, description]);
  }

  const query = `INSERT INTO products (name, price, description)
                 VALUES ?`;

  pool.query(query, [products], (err, result) => {
    if (err) throw err;
    console.log(`${result.affectedRows} rows inserted`);
    pool.end();
  });
  return "Seed data inserted successfully";
}

console.log(seedProducts())


const saltRounds = 10;

function seedUsers() {
  const users = [
    ['Anna Serobyan', 'anna@example.com', 'password1', false],
    ['Helga Schmidt', 'helga@example.com', 'password2', false],
    ['Tom Hiddleston', 'tom@example.com', 'password3', false],
    ['Admin', 'admin@example.com', 'adminpassword', true]
  ];

  // Hash the passwords before inserting them into the database
  for (let i = 0; i < users.length; i++) {
    const password = users[i][2];
    const hashedPassword = bcrypt.hashSync(password, saltRounds);
    users[i][2] = hashedPassword;
  }

  const query = `INSERT INTO users (name, email, password, isAdmin)
                 VALUES ?`;

  pool.query(query, [users], (err, result) => {
    if (err) throw err;
    console.log(`${result.affectedRows} rows inserted`);
    pool.end();
  });
  return 'seeded the users '
}

console.log(seedUsers());








  