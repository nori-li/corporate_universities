<template>
  
      <div class="hp-header">
          <div class="hp-nav type-page">
              <!-- 图标 -->
              <div class="hp-icon"><span></span></div>
              <div class="hp-text">企业大学</div>
              <!-- 导航 -->
              <ul>
                <li @click='jumpTo("homepage")' id="homepage">首页</li>
                <li @click='jumpTo("epKnowledge")' id="epKnowledge">企业知识</li>
                <li @click='jumpTo("myStudy")' id="myStudy">我的学习</li>
              </ul>
              <!-- 登出 -->
              <button class="logout" @click="logoutHandle">退出</button>
            </div>
      </div>
  
</template>
<script>
import axios from "axios"
import {getCookie} from "./../assets/js/util"
import {delCookie} from "./../assets/js/util"
export default {
    name:'hpNav',
    data() {
      return {
       
      };
    },
    methods: {
      logoutHandle(){
        // 清除cookie
        delCookie('username');
        delCookie('password');
        delCookie('role');
        this.$router.push({path: '/'});
      },
      jumpTo(url){
        this.$router.push({path: '/'+url});
      }
    },
    created() {
      var that = this;
      // 发请求请求后台数据
      axios.post('/users/hp',{
        role:getCookie('role')
      }).then((response)=>{
        let res = response.data;
        if(res.isAdmin=="true"){
          // 这两个模块必须点击两次才可以加上样式
          $('#homepage').after('<li id="systemManage">系统管理</li>');
          $('#systemManage').on('click',function(){
            that.jumpTo('systemManage');
            $('#systemManage').addClass('is-active');
          })
        }
        if(res.isManager=="true"){
          $('#epKnowledge').after('<li id="myStaff">我的员工</li>');
          $('#myStaff').on('click',function(){
            that.jumpTo('myStaff');
            $('#myStaff').addClass('is-active');
          })
        }
        
      })
    },
    mounted:function(){
      // 根据当前路由，给相应的标签添加样式
        var li_active = this.$route.path.split('/');
        $('#'+li_active[1]).addClass('is-active');
    }
}
</script>
<style>
  .hp-header {
    width: 100%;
    height: 70px;
    background-color:#545c64;
    border-bottom: 5px solid #0000a0; 
  }
  .type-page {
    width: 1100px!important;
    margin: 0 auto;
  }
  .hp-icon {
    position: absolute;
    left: 0;
    color: #ccc;
    top: 16px;
  }
  .hp-icon span {
    display: inline-block;
    width: 40px;
    height: 40px;
    background: url('./../assets/images/logo.jpg');
    background-size: 40px 40px;
    margin-right: 8px;
  }
  .hp-text {
    position: absolute;
    left: 50px;
    color: #ccc;
    top: 16px;
    font-size: 26px;
    height: 40px;
    line-height: 40px;
    display: inline-block;
    padding-bottom: 20px;
  }
  .hp-nav {
    background-color:#545c64;
    position: relative;
  }
  .hp-nav ul {
    margin-left: 200px;
    height: 70px;
    line-height: 70px;
  }
  .hp-nav ul li {
    list-style: none;
    float: left;
    padding: 0 20px;
    color: #ccc;
    font-size: 14px;
  }
  .hp-nav ul li.is-active {
    color:#ffd04b;
    background: #333;
  }
  .hp-nav ul li:hover {
    background: #333;
  }
  .logout {
    position: absolute;
    top: 15px;
    right: 5px;  
    display: block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #000;
    font-size: 8px;
    color:#fff;
  }
  
</style>