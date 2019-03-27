var express = require('express');
var router = express.Router();
var Missions = require('./../models/missions');
var mongoose = require('mongoose');
 
 
 
mongoose.connect('mongodb://127.0.0.1:27017/enterprise',{useNewUrlParser:true},(err)=>{
    if(err){
　　　　console.log('Connection Error:' + err)
　　}else{
　　　　console.log('Connection success!') 
    }
})



router.post("/mission",(req,res,next)=>{
    // 拿到数据
    var param = {
        username:req.body.username,
    }
    // console.log(param)
    Missions.find(param,function(err,doc){
        if(doc){
            // console.log(doc)
            res.json(doc);
        }else{
            res.json({
                status:'1'
            })
        }
    })
})
 


// 指派任务
router.post("/mission_assign",(req,res,next)=>{
    // 拿到数据
    var param = {
        username:req.body.username,
        kdname:req.body.kdname,
        assigner:req.body.assigner,
        kdpath:req.body.kdpath,
        kdtype:req.body.kdname,
    }
    
    Missions.insertMany(param,function(err,doc){
        if(doc){
            // console.log(doc)
            res.json(doc);
        }else{
            res.json({
                status:'1'
            })
        }
    })
})
 

 
module.exports = router;
