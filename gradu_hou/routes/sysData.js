var express = require('express');
var router = express.Router();
var Posts = require('./../models/posts')
var Users = require('./../models/users')
var mongoose = require('mongoose')

 
mongoose.connect('mongodb://127.0.0.1:27017/enterprise',{useNewUrlParser:true},(err)=>{
    if(err){
　　　　console.log('Connection Error:' + err)
　　}else{
　　　　console.log('Connection success!') 
    }
})

// 系统管理页面  树形控件数据渲染
router.post("/data",(req,res,next)=>{
    // 拿到数据
    console.log('到后台了');
    //查找当前用户的权限    
    Posts.findOne({},function(err,doc){
        if(doc){
            // console.log('查找成功');
            res.json(doc);
        }else {
            // 查找权限失败
            // console.log('查找失败')
            res.json({
                status:'1',
            })
        }
    })
})

// 系统管理页面表格数据的最初渲染
router.post("/data_table",(req,res,next)=>{
    // 拿到数据
    // console.log('表格数据');
    //查找当前用户的权限    
    Users.find({},function(err,doc){
        if(doc){
            // console.log('查找表格数据成功');
            res.send(doc);
        }else {
            // 查找权限失败
            // console.log('查找失败')
            res.json({
                status:'1',
            })
        }
    })
})

// 系统管理页面  表格数据的删除
router.post("/data_table_delete",(req,res,next)=>{
    // 拿到数据
    // console.log('删除数据拿到的请求头')
    // console.log(req.body);
    //查找当前用户的权限    
    Users.remove(req.body,function(err,doc){
        if(doc){  
            Users.find({},function(err,doc){
                if(doc){
                    res.json(doc);
                }else {
                    // console.log('删除数据成功之后的查找数据失败')
                    res.json({
                        status:'1',
                    })  
                }
            })
           
        }else {
            // 查找权限失败
            // console.log('删除数据失败')
            res.json({
                status:'1',
            })
        }
    })
})

// 系统管理页面--添加数据
router.post("/addUserTable",(req,res,next)=>{
    // 拿到数据
    // 表格的数据
    var insertParam = {
        username:req.body.username,
        password:req.body.password,
        role:req.body.role,
        label:req.body.post,
        clildlist:[],
    }
    // console.log(insertParam)
    // console.log(req.body);
    Users.insertMany(insertParam,function(err,doc){
        if(doc){  
            Users.find({},function(err,doc){
                if(doc){
                    // console.log('添加数据成功')
                    res.json(doc);
                }else {
                    // console.log('添加数据成功之后的查找数据失败')
                    res.json({
                        status:'1',
                    })  
                }
            })
           
        }else {
            // 查找权限失败
            // console.log('添加数据失败')
            res.json({
                status:'1',
            })
        }
    })
})

// 树形控件的点击搜索效果
router.post("/treeSearch",(req,res,next)=>{
    if(req.body.label=="岗位体系"){
        Users.find({},function(err,doc){
            if(doc){
                res.send(doc);
            }else {
                res.json({
                    status:'1',
                })
            }
        })
    }else{
        // 进行一个模糊匹配
        var tree_search = {
            label:{$regex: req.body.label}
        };
        Users.find(tree_search,function(err,doc){
            if(doc){
                res.send(doc);
            }else {
                res.json({
                    status:'1',
                })
            }
        })
    }
    
})


// 树形控件上面的搜素框效果
router.post("/search_tree",(req,res,next)=>{
    if(req.body.label=="岗位体系"||"岗位"||"体系"){
        Users.find({},function(err,doc){
            if(doc){
                res.send(doc);
            }else {
                res.json({
                    status:'1',
                })
            }
        })
    }else{
        // 进行一个模糊匹配
        var tree_search = {
            label:{$regex: req.body.label}
        };
        Users.find(tree_search,function(err,doc){
            if(doc){
                res.send(doc);
            }else {
                res.json({
                    status:'1',
                })
            }
        })
    }
    
})

// 表格上面的搜索框
router.post('/search_table',(req,res,next)=>{
    // 是个模糊搜索
    var param = {
        username:{$regex: req.body.username}
    };
    Users.find(param,function(err,doc){
        if(doc){
            res.json(doc);
        }else{
            res.json({
                status:'1',
            })
        }
    })
})




module.exports = router;
