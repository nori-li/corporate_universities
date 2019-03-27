var express = require('express');
var router = express.Router();
var Roles = require('./../models/roles')
var Users = require('./../models/users')
var mongoose = require('mongoose')

 
mongoose.connect('mongodb://127.0.0.1:27017/enterprise',{useNewUrlParser:true},(err)=>{
    if(err){
　　　　console.log('Connection Error:' + err)
　　}else{
　　　　console.log('Connection success!') 
    }
})

// 登录接口后台处理
router.post("/hp",(req,res,next)=>{
    // 拿到数据
    var param = {
        role:req.body.role
    }
    //查找当前用户的权限    
    Roles.findOne(param,function(err,doc){
        if(doc){
            res.json(doc);
        }else {
            // 查找权限失败
            res.json({
                status:'1',
            })
        }
    })
})

// 我的学习---基本资料
router.post("/users_data",(req,res,next)=>{
    // 拿到数据
    var param = {
        username:req.body.username
    }
    //查找当前用户的权限    
    Users.findOne(param,function(err,doc){
        if(doc){
            res.json(doc);
        }else {
            // 查找权限失败
            res.json({
                status:'1',
            })
        }
    })
})

// 我的学习---修改密码
router.post("/users_password",(req,res,next)=>{
    // 拿到数据
    var param = {
        username:req.body.username
    };
    var newPassword = {
        password:req.body.password
    };
    //查找当前用户的权限    
    Users.update(param,newPassword,function(err,doc){
        if(doc){
            // console.log('修改成功')
             Users.find(param,function(err,doc){
                 if(doc){
                     res.json(doc);
                 }else {
                    res.json({
                        status:'1',
                    })
                 }
             })
        }else {
            // 查找权限失败
            res.json({
                status:'1',
            })
        }
    })
})

module.exports = router;
