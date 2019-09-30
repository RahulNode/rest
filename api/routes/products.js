const express = require('express');
const Product = require('../models/product');
const mongoose = require('mongoose');
const router = express.Router();

router.get('/',(req,res,next)=>{
    Product.find().exec()
    .then((docs)=>{
        console.log(docs);
        if(docs.length>0){
            res.status(200).json(docs);
        } else{
            res.status(404).json({
                message:"No Entry is found"
            })
        }
        

    })
    .catch(err=>{
        res.status(500).json({
            error:err
        })
    });
});

router.post('/',(req,res,next)=>{

    const product = new Product({
        _id:mongoose.Types.ObjectId(),
        name:req.body.name,
        price:req.body.price
    });
    product.save()
    .then((result)=>{
        console.log(result);
        res.status(201).json({
            message:"HAnding the post products",
            createdProduct:product,
    })
    .catch(
        err=>{
            console.log(err);
            res.status(500).json({
                error:err
            });
        }
    )
    
    });
});

router.get('/:productId',(req,res,next)=>{
    const id = req.params.productId;
    Product.findById(id)
    .then((doc)=>{
        console.log('From the database',doc);
        if(doc){
            res.status(200).json(doc);
        } else{
            res.status(404).json({
                message:"The provied id doesn't exit"
            })
        }
        

    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    });
});

    router.patch('/:productId', (req,res,next)=>{
        const id = req.params.productId;
        const updateOps = {};
        for(const ops of req.body){
            updateOps[ops.propName]=ops.value;
        }
        Product.update({_id:id}, {$set:updateOps}).exec()
        .then((result)=>{
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err=>{
            res.status(500).json({
                Error : err
            });
        });
    });
    
     router.delete('/:productId', (req,res,next)=>{
         const id = req.params.productId;
         Product.remove({_id:id}).exec()
         .then((result)=>{
             console.log(result);
             res.json(200).json(result);
         })
         .catch(err=>{
             res.status(500).json({
                 error:err
             })
         })
     });
module.exports=router;
