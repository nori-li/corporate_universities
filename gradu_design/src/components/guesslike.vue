<template>
    <div>
        <hpNav></hpNav>
        <div class="ep-page">
            <!-- 企业知识轮播图 -->
            <el-carousel :interval="4000" type="card" height="200px">
                <el-carousel-item v-for="item in 6" :key="item">
                    <h3>{{ item }}</h3>
                </el-carousel-item>
            </el-carousel>
        </div>
        <div>
            <div class="ep-container">
                <!-- 点击更多的时候跳转一个新的页面 -->
                <div class="ep-header">精品课程如下</div>
                <div class="ep-body">
                    <!-- 只渲染四个出来 -->
                    <ul class="ep-guesslike"> 
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import hpNav from './../components/hpNav.vue'
import axios from 'axios'
export default {
    name:'Intensive',
    components:{
        hpNav
    },
    created() {
        axios.post('/knowledge/data_guesslike')
            .then((response)=>{
            var url='';
            for(var i=0;i<response.data.length;i++){
                url = response.data[i].kdpath+'.'+response.data[i].kdtype;
                $('.ep-guesslike').append('<li id='+response.data[i]._id+' data-path='+url+'></li>');
                $('#'+response.data[i]._id).append('<span>'+response.data[i].kdname+'</span>');
                $('#'+response.data[i]._id).on('click',function(){
                    window.open('http://localhost:8085/'+$(this).attr('data-path'))
                })   
            }    
            })
            .catch((error)=>{
            console.log(error)
            })
    },
}
</script>
<style>
.ep-page {
    width: 1100px!important;
    margin: 0 auto;
    border: 1px solid #e4e4e4;
}
.el-carousel {
    border-bottom: 1px solid #e4e4e4;
}
.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
}
.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}
.el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
}
.ep-container {
    width: 1100px;
    margin: 0 auto;
}
.ep-container .ep-header {
    width: 100%;
    height: 65px;
    background: pink;
}
.ep-container .ep-body {
    width: 1100px;
        
    border: 1px solid blue;
}
.ep-container .ep-body ul {
    overflow: hidden;
}
.ep-container .ep-body ul li {
    float: left;
    width: 230px;
    height: 200px;
    margin-top: 30px;
    margin-left: 35px;
    background-size: 230px 150px;
    position: relative;
}
ul.ep-guesslike li {
    background: url('./../assets/images/guess_like.jpg') no-repeat;
}
.ep-container .ep-body ul li span {
    position: absolute;
    left: 80px;
    bottom: 20px;
}
.ep-container .ep-body ul li img {
    width: 230px;
    height: 150px;
}
</style>