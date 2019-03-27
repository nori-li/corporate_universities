var express = require('express');
var router = express.Router();
var Knowledges = require('./../models/knowledges')
var mongoose = require('mongoose')

 
mongoose.connect('mongodb://127.0.0.1:27017/enterprise',{useNewUrlParser:true},(err)=>{
    if(err){
　　　　console.log('Connection Error:' + err)
　　}else{
　　　　console.log('Connection success!') 
    }
})          

// 企业知识后台处理
router.post("/data_jingpin",(req,res,next)=>{  
    var param = {kdlabel:"精品课程"};
    Knowledges.find(param,function(err,doc){
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


// 企业知识后台处理
router.post("/data_zuixin",(req,res,next)=>{  
    var param = {kdlabel:"最新知识"};
    Knowledges.find(param,function(err,doc){
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

// 企业知识后台处理
router.post("/data_tuijian",(req,res,next)=>{  
    var param = {kdlabel:"推荐课程"};
    Knowledges.find(param,function(err,doc){
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

// 企业知识后台处理
router.post("/data_guesslike",(req,res,next)=>{  
    var param = {kdlabel:"猜你喜欢"};
    Knowledges.find(param,function(err,doc){
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


// 企业知识后台处理  两个搜索
router.post("/epSearchType",(req,res,next)=>{  
    var param = {kdtype:req.body.kdtype};
    Knowledges.find(param,function(err,doc){
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

router.post("/epSearchName",(req,res,next)=>{  
    var param = {kdname:{$regex: req.body.kdname}};
    Knowledges.find(param,function(err,doc){
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

// 员工指派任务---选择知识控件
router.post('/data_knowledge',(req,res,next)=>{
    Knowledges.find({},function(err,doc){
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

// 员工指派任务---选择知识控件
router.post('/data_knowledge_path',(req,res,next)=>{
    Knowledges.find(req.body,function(err,doc){
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

module.exports = router;
