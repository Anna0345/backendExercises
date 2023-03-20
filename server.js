const express = require('express');
const app = express();
const port =  3000;
const productRoutes = require('./routes/products');
const usersRoutes = require('./routes/users')
const cartItemsRoutes = require('./routes/cart')
const registerRoutes = require ('./routes/register')



app.use(express.json());
app.use('/products', productRoutes);
app.use('/login',usersRoutes);
app.use('/users',cartItemsRoutes);
app.use('/register',registerRoutes);


app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});







