//Importing the modules
const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv/config');
const carRoute = require('./routes/cars');
const cors = require('cors');
const bodyParser = require('body-parser');
const bookingRoute = require('./routes/bookings');

//MiddleWares
app.use(cors());
app.use(bodyParser.json());

//Connect to MongoDB
mongoose.connect(
    process.env.db_connect,
    {useNewUrlParser:true },()=>{
    console.log('Connection to db Successful');
});

//Host the API on localhost
app.listen(2000);

//HomePage
app.get('/',(req,res)=>{
    res.send('Welcome to Cars API.');
});


//Routes
app.use('/cars',carRoute);
app.use('/bookings',bookingRoute);