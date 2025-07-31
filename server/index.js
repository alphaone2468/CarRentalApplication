const express=require("express");
const app=express();
const cors=require("cors");
const bcrypt=require("bcrypt");

app.use(express.json());
app.use(cors());


app.use('/api/users', require('./routes/users'));
app.use('/api/cars', require('./routes/cars'));
app.use('/api/bookings', require('./routes/bookings'));

app.listen(5000,()=>{
    console.log("Server running on Port 5000")
})