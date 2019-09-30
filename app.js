const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const productRoute = require('./api/routes/products');
const orderRoute = require('./api/routes/orders');
const app = express();
const dbUrl = ""

const run = async()=>{
    try{
        await mongoose.connect(dbUrl);
        console.log("We're connected");
    } catch{
        console.log("We're unable to connect");
    }
}
run();
// mongoose.connect(dbUrl);
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type,Accept,Authorization");
    if(req.method==="OPTIONS"){
        res.header("Access-Control-Allow-Methods","GET, POST, PUT, PATCH, DELETE");
        return res.status(200).json({});
    }
    next();
});

app.use('/products',productRoute);
app.use('/orders',orderRoute);
app.use((req,res,next)=>{
    const error = new Error("Page not found");

    error.status=404;
    next(error);
});
app.use((error,req,res,next)=>{
    res.status(error.status ||500);
    res.json({
        error:{
            message:error.message
        }
    });
});
module.exports=app;
