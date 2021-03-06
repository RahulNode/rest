const express = require('express');
const router = express.Router();

router.get('/',(req,res,next)=>{
    res.status(200).json({
        message:"Order is fetched"
    });
});
router.post('/',(req,res,next)=>{
    const order={
        productId:req.body.productId,
        quantity:req.body.quanity, 
    }
    res.status(201).json({
        message:"Order is created",
        order:order,
    });
});

router.patch('/:orderId',(req,res,next)=>{
    res.status(200).json({
        message:"Order is updated"
    });
});

router.delete('/:orderId', (req,res,next)=>{
    res.status(200).json({
        message:"Order is deleted"
    });
})

 module.exports=router;
