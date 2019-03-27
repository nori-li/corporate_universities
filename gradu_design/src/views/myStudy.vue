<template>
    <div>
        <hpNav></hpNav>
        <div class="ep-page">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="个人资料" name="first">
                    <div>
                        <ul>
                            <li>username:<span>{{ data.username }}</span></li>
                            <li>password:<span>{{ data.password }}</span></li>
                            <li>role:<span>{{ data.role }}</span></li>
                            <li>post:<span>{{ data.label }}</span></li>
                        </ul>
                        <button @click="updateUser">修改密码</button>
                        <div v-if="isUpdate" class="update-password">
                            <form>
                                <div>
                                    原密码:<input type="password" v-model="oldPassword">
                                </div>
                                <br>
                                <div>
                                    新密码:<input type="password" v-model="newPassword">
                                </div>
                                <br>
                                <div>
                                    <input type="submit" @click.prevent="updatePassword">
                                </div>
                            </form>
                        </div>
                    </div>
                </el-tab-pane>

                <el-tab-pane label="我的学习" name="second">
                    <div class="ms-mission">
                        <ul v-for="item in mission">
                            <li>{{ item.kdname }}</li>
                            <li>{{ item.kdpath }}</li>
                            <li>{{ item.assigner }}</li>
                            <li>{{ item.kdtype }}</li>
                            <li class="kdpath-type"  @click.prevent="jumpToPath">/{{ item.kdpath }}.{{ item.kdtype }}</li>
                        </ul>    
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
         
    </div>
</template>
<script>
import axios from 'axios';
import hpNav from './../components/hpNav.vue';
import { getCookie } from '../assets/js/util';
export default {
    name:"myStaff",
    data(){
        return {
             activeName: 'first',
             data:'',
             isUpdate:false,
             newPassword:'',
             oldPassword:'',
             mission:'',
             pathType:''
        }
    },
    components:{
        hpNav
    },
    methods: {
      handleClick(tab, event) {
        // console.log(tab, event);
      },
    //   修改密码
      updateUser(){
          this.isUpdate = true;
      },
      updatePassword(){
        //   首先判断输入的原始密码是否正确
        if(this.oldPassword!==this.data.password){
            alert('您输入的原始密码有误');
            // 需要清除输入框里面的内容
            this.newPassword = '';
            this.oldPassword = '';
        }else{
            axios.post('/users/users_password',{
                    username:getCookie('username'),
                    password:this.newPassword
                }).then((response)=>{
                    this.data = response.data; 
                    this.newPassword = '';
                    this.oldPassword = '';
                    alert('您已成功修改密码'); 
                    location.reload();
                    // this.$router.go(0); 重新加载页面，但会出现一段空白时间
                }).catch((error)=>{
                    console.log(error)
                })
            }
            this.isUpdate = false;
        },
        // 跳转学习
        jumpToPath(e){
            var url = e.target.innerText;
            window.open('http://localhost:8085/'+url)
        }
    },
    created() {
        // 个人基本资料的渲染
        axios.post('/users/users_data',{
            username:getCookie('username')
        }).then((response)=>{
            this.data = response.data;
            
        }).catch((error)=>{
            console.log(error)
        })

        // 学习任务的渲染
        axios.post('/mystudy/mission',{
            username:getCookie('username')
        }).then((response)=>{
             this.mission = response.data;
        }).catch((error)=>{
            console.log(error)
        })
    }
}
</script>
<style>
.ep-page {
    width: 1100px!important;
    margin: 0 auto;
    border: 1px solid #e4e4e4;
}
.update-password form {
    border: 1px solid red;
    width: 400px;
    height: 200px;
}
.update-password form div {
    float: left;
    border: 1px solid blue;
    width: 350px;
    height: 40px;
}
.ms-mission {
    width: 600px;
     
    background: pink;
}
.ms-mission ul {
    width: 500px;
    height: 250px;
    border:1px solid red;
}
.kdpath-type {
    color: blue;
    text-decoration: underline;
    cursor: pointer;
}
</style>