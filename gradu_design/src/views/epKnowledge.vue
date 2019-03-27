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
            <!-- 企业知识下面的具体内容 -->

           <div class="ep-search-result">
                <!-- 搜索框 -->
                <div class="ep-search-input">
                    请输入文件类型：<input type="text" @blur="epTypeSearch()" v-model="type_search">
                    请输入文件名称：<input type="text" @blur="epNameSearch()" v-model="name_search">
                </div>
    
    
                <!-- 精品课程 -->
                 <div class="ep-container">
                     <!-- 点击更多的时候跳转一个新的页面 -->
                    <div class="ep-header">精品课程<span style="color:blue;" @click='jumpTo("epKnowledge/Intensive")'>更多</span></div>
                    <div class="ep-body">
                        <!-- 只渲染四个出来 -->
                        <ul class="ep-jingpin"> 
                        </ul>
                    </div>
                 </div>
                 <!-- 最新知识 -->
                 <div class="ep-container">
                    <div class="ep-header">最新知识<span style="color:blue;" @click='jumpTo("epKnowledge/Latest")'>更多</span></div>
                    <div class="ep-body">
                        <ul class="ep-zuixin">
                        </ul> 
                    </div>
                </div>
                <!-- 推荐课程 -->
                <div class="ep-container">
                    <div class="ep-header">推荐课程<span style="color:blue;" @click='jumpTo("epKnowledge/Recommond")'>更多</span></div>
                    <div class="ep-body">
                        <ul class="ep-tuijian">
                        </ul>
                    </div>
                </div>
                 
                <!-- 猜你喜欢 -->
                <div class="ep-container">
                    <div class="ep-header">猜你喜欢<span style="color:blue;" @click='jumpTo("epKnowledge/Guesslike")'>更多</span></div>
                    <div class="ep-body">
                        <ul class="ep-guesslike">
                        </ul>
                    </div>
                </div>

           </div>


        </div>
    </div>
</template>
<script>
import hpNav from './../components/hpNav.vue'
import axios from 'axios'
export default {
    name:"systemManage",
    data() {
        return {
            type_search:'',
            name_search:''
        }
    },
    components:{
        hpNav
    },
    methods: {
        jumpTo(url){
            this.$router.push({path: '/'+url});
        },
        epTypeSearch(){
            var param = {
                kdtype:this.type_search
            };
            axios.post('/knowledge/epSearchType',param)
              .then((response)=>{
                var url = '';
                $('.ep-search-result').html('<p>类型为<strong>'+this.type_search+'</strong>的文件如下</p><ul class="ep-result-follow"></ul>');
                for(var i=0;i<response.data.length;i++){
                    url = response.data[i].kdpath +'.'+ response.data[i].kdtype;
                    $('.ep-result-follow').append('<li id='+response.data[i]._id+' data-path='+url+'></li>');
                    switch(response.data[i].kdlabel){
                        case '精品课程':$('#'+response.data[i]._id).addClass('ep-bg-jingpin');break;
                        case '最新知识':$('#'+response.data[i]._id).addClass('ep-bg-zuixin');break;
                        case '推荐课程':$('#'+response.data[i]._id).addClass('ep-bg-tuijian');break;
                        case '猜你喜欢':$('#'+response.data[i]._id).addClass('ep-bg-guesslike');break;
                    }
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
        epNameSearch(){
            var param = {
                kdname:this.name_search
            };
            axios.post('/knowledge/epSearchName',param)
              .then((response)=>{
                var url = '';
                $('.ep-search-result').html('<p>类型为<strong>'+this.type_search+'</strong>的文件如下</p><ul class="ep-result-follow"></ul>');
                for(var i=0;i<response.data.length;i++){
                    url = response.data[i].kdpath +'.'+ response.data[i].kdtype;
                    $('.ep-result-follow').append('<li id='+response.data[i]._id+' data-path='+url+'></li>');
                    switch(response.data[i].kdlabel){
                        case '精品课程':$('#'+response.data[i]._id).addClass('ep-bg-jingpin');break;
                        case '最新知识':$('#'+response.data[i]._id).addClass('ep-bg-zuixin');break;
                        case '推荐课程':$('#'+response.data[i]._id).addClass('ep-bg-tuijian');break;
                        case '猜你喜欢':$('#'+response.data[i]._id).addClass('ep-bg-guesslike');break;
                    }
                    $('#'+response.data[i]._id).append('<span>'+response.data[i].kdname+'</span>');
                    $('#'+response.data[i]._id).on('click',function(){
                        window.open('http://localhost:8085/'+$(this).attr('data-path'))
                    })
                }     
              })
              .catch((error)=>{
                  console.log(error)
              })
        }
    },
    created() {
        // 精品课程--数据的渲染
        axios.post('/knowledge/data_jingpin')
          .then((response)=>{
            var url='';
            for(var i=0;i<4;i++){
                url = response.data[i].kdpath+'.'+response.data[i].kdtype;
                $('.ep-jingpin').append('<li id='+response.data[i]._id+' data-path='+url+'></li>');
                $('#'+response.data[i]._id).append('<span>'+response.data[i].kdname+'</span>');
                $('#'+response.data[i]._id).on('click',function(){
                    window.open('http://localhost:8085/'+$(this).attr('data-path'))
                })   
            }    
          })
          .catch((error)=>{
            console.log(error)
          })

          // 最新知识--数据的渲染
        axios.post('/knowledge/data_zuixin')
          .then((response)=>{
            var url='';
            for(var i=0;i<4;i++){
                url = response.data[i].kdpath+'.'+response.data[i].kdtype;
                $('.ep-zuixin').append('<li id='+response.data[i]._id+' data-path='+url+'></li>');
                $('#'+response.data[i]._id).append('<span>'+response.data[i].kdname+'</span>');
                $('#'+response.data[i]._id).on('click',function(){
                    window.open('http://localhost:8085/'+$(this).attr('data-path'))
                })   
            }    
          })
          .catch((error)=>{
            console.log(error)
          })

        // 推荐课程--数据的渲染
        axios.post('/knowledge/data_tuijian')
          .then((response)=>{
            var url='';
            for(var i=0;i<4;i++){
                url = response.data[i].kdpath+'.'+response.data[i].kdtype;
                $('.ep-tuijian').append('<li id='+response.data[i]._id+' data-path='+url+'></li>');
                $('#'+response.data[i]._id).append('<span>'+response.data[i].kdname+'</span>');
                $('#'+response.data[i]._id).on('click',function(){
                    window.open('http://localhost:8085/'+$(this).attr('data-path'))
                })   
            }    
          })
          .catch((error)=>{
            console.log(error)
          })

        // 猜你喜欢--数据的渲染
        axios.post('/knowledge/data_guesslike')
          .then((response)=>{
            var url='';
            for(var i=0;i<4;i++){
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

/* 精品课程 */
.ep-container {
    width: 1100px;
    height: 300px;
}
.ep-container .ep-header {
    width: 100%;
    height: 65px;
    background: pink;
}
.ep-container .ep-body {
    width: 1100px;
    height: 230px;
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
ul.ep-jingpin li {
    background: url('./../assets/images/jing_pin.jpg') no-repeat;
}
ul.ep-tuijian li {
    background: url('./../assets/images/recom_cou.jpg') no-repeat;
}
ul.ep-zuixin li {
    background: url('./../assets/images/la_kno.jpg') no-repeat;
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


/* 重新渲染的搜索结果的页面 */
.ep-result-follow {
    width: 1100px;
    height: 1000px;
    background: pink;
}
.ep-result-follow li {
    float: left;
    width: 230px;
    height: 150px;
    border: 1px solid blue;
    margin-top: 30px;
    margin-left: 35px;
    position: relative;
}
.ep-bg-jingpin {
    background: url('./../assets/images/jing_pin.jpg') no-repeat;
    background-size: 230px 150px;
}
.ep-bg-tuijian {
    background: url('./../assets/images/recom_cou.jpg') no-repeat;
    background-size: 230px 150px;
}
.ep-bg-zuixin {
    background: url('./../assets/images/la_kno.jpg') no-repeat;
    background-size: 230px 150px;
}
.ep-bg-guesslike {
    background: url('./../assets/images/guess_like.jpg') no-repeat;
    background-size: 230px 150px;
}
.ep-result-follow li span {
    position: absolute;
    left: 80px;
    bottom: 20px;
}

</style>