var express = require('express');
var router = express.Router();
var Users = require('./../models/users');
var mongoose = require('mongoose');
 
 
 
mongoose.connect('mongodb://127.0.0.1:27017/enterprise',{useNewUrlParser:true},(err)=>{
    if(err){
　　　　console.log('Connection Error:' + err)
　　}else{
　　　　console.log('Connection success!') 
    }
})


// 登录接口后台处理
router.post("/data_table_staff",(req,res,next)=>{
    // 拿到数据
    var param = {
        username:req.body.username,
    }
    Users.find(param,function(err,doc){
        if(doc){
            res.json(doc);
        }else{
            res.json({
                status:'1'
            })
        }
    })
})
 




 
module.exports = router;
