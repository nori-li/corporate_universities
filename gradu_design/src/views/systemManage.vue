<template>
    <div>
        <hpNav></hpNav>
        <div class="sm-type-page">
            <div class="sm-left">
              <div class="sm-tree-search">
                <input v-model="input_tree" placeholder="请输入岗位名称" @blur="handleSelectTree">
              </div>
              <div class="sm-tree">
                <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
              </div>
            </div>
            <div class="sm-right">
                <div class="sm-operate">
                  <!-- 操作按钮 -->
                    <el-button type="primary" icon="el-icon-edit" @click="addUserM">新增用户</el-button>
                    <el-button type="danger" icon="el-icon-delete" style="margin-right:350px;" @click="deleteUser">删除用户</el-button>
                    <input v-model="input_table" placeholder="请输入用户名"  @blur="handleSelectTable">
                </div>

                <!-- 新增用户表单 -->
                <div class="add-user-shadow" v-if="isShow" @click="isShow=false">
                </div>
                <form class="add-user" v-if="isShow">
                  <div class="add-title">新增用户表单</div>
                   username:<input type="text" name="username"><br>
                   password:<input type="text" name="password"><br>
                   role:<input type="text" name="role"><br>
                   post:<input type="text" name="post"><br>
                   <!-- 修饰符阻止事件的默认行为 -->
                   <input type="button" value="提交" @click.prevent="addUserSM">
                </form>


                <!-- 表格 -->
                <div class="sm-table">
                  <ul class="sm-table-th">
                    <li>username</li>
                    <li>password</li>
                    <li>role</li>
                    <li>post</li>
                    <li>operate</li>
                  </ul>
                  <ul v-for="item in data_table" class="sm-table-tr">
                    <li class="username">{{ item.username }}</li>
                    <li>{{ item.password }}</li>
                    <li>{{ item.role }}</li>
                    <li>{{ item.label }}</li>
                    <li><input type="radio" name="del" class="input_del"></li>
                  </ul>
                  <div class="total-data">一共 {{ data_table.length }} 条数据</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {getCookie} from "./../assets/js/util"
import {delCookie} from "./../assets/js/util"
import hpNav from './../components/hpNav.vue'
import axios from 'axios'
export default {
    name:"systemManage",
    data() {
      return {
        data: [],
        data_table:[],
        isShow:false,
        defaultProps: {
          username:'admin',
          password:'112233',
          role:'admin',
          childlist:[]
        },
        input_tree:'',
        input_table:''
    }
  },
    components:{
        hpNav
    },
    methods: {
      // 树控件每个节点的点击事件
      handleNodeClick(data) {
        axios.post('/sys/treeSearch',{
          label:data.label
        }).then((response)=>{
          let res = response.data;
          this.data_table = res;
          this.input_tree = data.label;
        })
      },
   
      
      
      // 树控件上面的搜索框点击事件
      handleSelectTree() {
        axios.post('/sys/search_tree',{
          label:this.input_tree
        }).then((response)=>{
          this.data_table = response.data;
        })
      },

      // 表格的搜索框 
      handleSelectTable(){
        axios.post('/sys/search_table',{
          username:this.input_table
        }).then((response)=>{
          this.data_table = response.data;
        })
      },




      //  对User一表的操作
      //  删除用户
      deleteUser(){
        //  删除数据，重新渲染
        //  取得所有的radio，判断谁被选中
        var radioObj = $('.input_del:checked');
        var param_username = radioObj.parent().siblings('.username').text();
        

        axios.post('/sys/data_table_delete',{
          username:param_username
        }).then((response)=>{
          // 对表格数据的处理 
          // console.log('数据的重新渲染')
          let res = response.data;
          this.data_table = res;
        })
      
      },
      // 遮罩层
      addUserM(){
        this.isShow = true;
      },
      // 提交表单，添加数据
      addUserSM(){
        var req_param = {
          username:$("[name='username']").val(),
          password:$("[name='password']").val(),
          role:$("[name='role']").val(),
          post:$("[name='post']").val()
        }
        axios.post('/sys/addUserTable',req_param).then(
          (response)=>{
            // 修改表格数据
             let res = response.data;
             this.data_table = res;
            //  消除弹框
             this.isShow = false;
            // console.log('添加数据成功')
          }
        )
      }
    },
    created() {

        // 对“树形控件”数据的请求
        axios.post('/sys/data',{
            // 将表单的数据传到后台，得到响应结果
            role:getCookie('role')
        }).then((response)=>{
            let res = response.data;
            // let resStr = JSON.stringify(res).replace(/username/g,'label').replace(/childlist/g,'children');
            // let resJson = $.parseJSON(resStr);
            this.data = [res];
        });



        // 对表格数据的请求
        axios.post('/sys/data_table',{
          role:getCookie('role')
        }).then((response)=>{
          // 对表格数据的处理 
            let res = response.data;
            this.data_table = res;
        
        })

       
         
         
    },
    mounted() {
       
      
     
     
    }
}
</script>
<style>
.sm-type-page {
  width: 1100px!important;
  margin: 0 auto;
  border: 1px solid #e4e4e4;
  margin-top: 10px;
  background: #fff;
  height: 800px;
}
.sm-left {  
  float: left;
  width: 250px;
  border-right: 1px solid #e4e4e4;
}
.sm-tree-search {
  width: 250px;
  height: 50px;
  border-bottom: 1px solid #e4e4e4;
}
.sm-tree-search input {
  width: 230px;
  height: 30px;
  border-radius: 0;
  margin: 10px;
  padding: 0 15px;
  color: #606266;
  box-sizing: border-box;
  border: 1px solid #DCDFE6;
}

.sm-tree {
    padding-top : 10px;
    width: 250px;
    height: 740px;
}
/* 系统管理右边的部分 */
.sm-right {
  float: left;
}
.sm-table {
  border: 1px solid #e4e4e4;
  margin: 10px;
  height: 600px;
  font-size: 12px;
  width: 820px;
}
.sm-operate {
  height: 50px;
  width: 849px;
  border-bottom: 1px solid #e4e4e4;
}
.sm-operate input {
  width: 230px;
  height: 30px;
  border-radius: 0;
  margin: 10px;
  padding: 0 15px;
  color: #606266;
  box-sizing: border-box;
  border: 1px solid #DCDFE6;
  display: inline-block;
}
.el-button {
  height: 30px;
  width: 100px;
  margin-top: 10px;
  border-radius: 0;
  margin-left: 10px;
  padding: 0;
}
.sm-table-th li {
  float: left;
  width: 164px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-weight: bold;
  color: #666;
  border-bottom: 1px solid #e4e4e4;
  background: #f3f6fc;
}
.sm-table-tr li {
  float: left;
  width: 164px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  color: #595a5d;
  border-bottom: 1px solid #e4e4e4;
}
.none {
  color: pink;
}
.total-data {
  text-align: center;
}
/* 新增用户表单 */
.add-user {
  width: 400px;
  height: 230px;
  border: 1px solid #e4e4e4;
  position: fixed;
  left: 35%;
  top:30%;
  z-index: 101;
  background: #fff;
}
.add-user input {
  border: 1px solid #e4e4e4;
  height: 28px;
}
.add-user div.add-title {
  text-align: center;
  margin-top: 25px;
  margin-bottom: 10px;
}
.add-user-shadow {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: rgba(0,0,0,0.4);
  z-index: 100;
}
</style>