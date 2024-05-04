const express = require('express'); //required node freamwork
const sequelize = require('./config/config');
const User = require('./models/User');  // user module require
const product = require('./models/products');  // user module require
const jwt = require('jsonwebtoken'); // for jsw token
const app = express();
const bcrypt = require("bcryptjs"); // bcyypt password
const { Json } = require('sequelize/lib/utils');
const { where } = require('sequelize');
app.use(express.json());

//database connection
app.get('/', (req,respoance) => {
    respoance.send("hello test");
});
// sync with database
sequelize.sync()
  .then(() => {
    console.log('Database synced');
  })
  .catch(err => {
    console.error('Error syncing database:', err);
});
// endpoint /api/auth/register
app.post('/api/auth/register', (req,respoance) => {
    const addData = req.body;
    // add data into database
    bcrypt.hash(addData.password, 8, (err, hashedPassword) => { 
        User.create({
            name: addData.name,
            email:addData.email,
            password:hashedPassword,
        })
    })
    .then(User => {
        console.log('add sucessfully');
    });
});
// endpoint /api/auth/login
app.post('/api/auth/login', (req,respoance) => {
    const {email, password} = req.body;
    if (email == undefined || password == undefined) {
        return respoance.status(400).json("message: 'User name and password are required'");
    }
    const users = User.find(e => e.email === email && e.password === password);
    if (!users) {
        return respoance.status(400).json("message: 'User not exits'");
    }
    return respoance.json("message: 'Sucessfully Login'");
});
//inset product
app.post('/api/products/:id', (req,respoance) => {
    const addProductData = req.body;
    product.create({
        name: addProductData.name,
        price:addProductData.price,
        description:addProductData.description,
        product_type:addProductData.product_type,
        product_image:addProductData.product_image,
    })
    .then(product => {
        console.log('Add product sucessfully');
    });
});
//update the product
app.put('/api/products/:id', (req,respoance) => {
    const productID = req.params.id;
    const addProductData = req.body;
    product.update(
        // for edit
        {name: addProductData.name,
        price:addProductData.password,
        description:addProductData.description,
        product_type:addProductData.product_type,
        product_image:addProductData.product_image},
        {where: {id:productID}}
    )
    .then(product => {
        console.log('Update product sucessfully');
    });
});
//delete the product record
app.delete('/api/products/:id', (req,respoance) => {
    const deleteID = req.params.id;
    if (deleteID) {
        product.destroy({
            where: {id:deleteID}
        })
        .then(product => {
            console.log('Delete product sucessfully');
        });
    }
});
// get all product data
// here set limit for getting data as per page limit
app.get('/api/products', (req,respoance) => {
    product.findAndCountAll(
        {
            limit:3,
            offset:1,
        }
    )
    .then((products) => {
        respoance.json(products);
    });
   
});
// get specfic product
app.get('/api/products/:id', (req,respoance) => {
    const specficRecordGet = req.params.id;
    product.findAll(
        {
            where:{id:specficRecordGet}
        }
    )
    .then((products) => {
        respoance.json(products);
    });
});
//server start
const PORT = process.env.PORT || 3043;
app.listen(PORT, () => {
    console.log('server is running on this '  + PORT);
});