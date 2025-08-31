const express=require("express");
const app=express();
const cors=require("cors");
const bcrypt=require("bcrypt");
const cookieParser = require("cookie-parser");

require('./config/db');

app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors({
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));


app.use('/api/users', require('./routes/users'));
app.use('/api/cars', require('./routes/cars'));
app.use('/api/bookings', require('./routes/bookings'));

app.listen(5000,()=>{
    console.log("Server running on Port 5000")
})