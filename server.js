const express = require('express');
const app = express();
const port =  3000;
const productRoutes = require('./routes/products');
const loginRoutes = require('./routes/login')
const cartItemsRoutes = require('./routes/cart')
const registerRoutes = require ('./routes/register')
const usersRoutes = require ('./routes/users')




app.use(express.json());
app.use('/products', productRoutes);
app.use('/login',loginRoutes);
app.use('/user',cartItemsRoutes);
app.use('/register',registerRoutes);
app.use('/users',usersRoutes);



app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});







