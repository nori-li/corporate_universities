var express = require('express');
var router = express.Router();
var Users = require('./../models/users');
var Roles = require('./../models/roles');
var mongoose = require('mongoose');
 
 
 
mongoose.connect('mongodb://127.0.0.1:27017/enterprise',{useNewUrlParser:true},(err)=>{
    if(err){
　　　　console.log('Connection Error:' + err)
　　}else{
　　　　console.log('Connection success!') 
    }
})


// 登录接口后台处理
router.post("/login",(req,res,next)=>{
    // 拿到数据
    var param = {
        username:req.body.username,
        password:req.body.password
    }
    // console.log(userName)
    Users.findOne(param,function(err,doc){
        if(doc){
            res.cookie("username",doc._doc.username,{
                // 一些配置
                path:'/',
                maxAge:1000*60*60
            });
            res.cookie("password",doc._doc.password,{
                // 一些配置
                path:'/',
                maxAge:1000*60*60
            });
            res.cookie("role",doc._doc.role,{
                // 一些配置
                path:'/',
                maxAge:1000*60*60
            });
            // req.session.user = doc;
            // 如何取doc中的单个值
            // console.log(doc._doc.role)
            var roleParam = {
                role:doc._doc.role
            };
            Roles.findOne(roleParam,function(err,doc){
                if(doc){
                   var data = {
                       status:'0',
                       isAdmin:doc._doc.isAdmin,
                       isManager:doc._doc.isManager
                   }
                   res.json(data);
                }else {
                   console.log('出现错误');
                }
            })
            // res.json({
            //     status:'0',
            //     msg:'',
            //     result:{
            //         userName:doc.userName
            //     }
            // })
        }else {
            //当没有找到这个员工时
            res.json({
                status:'1',
            })
        }
    })
})
 




 
module.exports = router;
