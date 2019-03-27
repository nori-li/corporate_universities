<template>
    <div>
        <hpNav></hpNav>
        <div class="my-staff">
            <div class="mf-search">
                <span>我的员工</span>
                <input type="text" placeholder="请输入员工名称" @blur="searchStaff" v-model="search_staff">
                <button @click="showAssign">指派</button>
            </div>
            <div class="mf-assign" v-if="isAssign">
                <form class="mf-assign-form">
                    <div>
                        员工姓名：<input type="text" v-model="staffName">
                    </div>
                    <!-- <div>
                        学习任务：<input type="text" v-model="staffWork"><button @click.prevent.stop="isShowKnowledge=true">选择</button>
                        <chooseKnowledge v-if="isShowKnowledge" v-on:getkdname="getShowKdname"></chooseKnowledge>
                    </div> -->
                    <div>学习任务：
                        <el-select v-model="valueC" placeholder="请选择">
                            <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                    <div>
                        指派人：<input type="text" v-model="assignPeople">
                    </div>
                    <div>
                        文件路径：<input type="text" v-model="filePath">
                    </div>
                    <div>
                        文件类型：<input type="text" v-model="fileType">
                    </div>
                    <div>
                        <button @click.prevent="sendAssign">确认</button>
                        <button @click.prevent="isAssign=false">取消</button>
                    </div>
                </form>
            </div>
            <div class="mf-table">
                <ul class="mf-table-th">
                    <li>username</li>
                    <li>password</li>
                    <li>role</li>
                    <!-- 岗位 -->
                    <li>post</li>
                    <li>operate</li>
                </ul>
                <ul v-for="item in data_table_staff" class="mf-table-tr">
                    <li class="op_assign_username">{{ item.username }}</li>
                    <li>{{ item.password }}</li>
                    <li>{{ item.role }}</li>
                    <li>{{ item.label }}</li>
                    <li><input type="radio" name="assign" class="op_assign"></li>
                </ul>
                <div class="total-data">一共 {{ data_table_staff.length }} 条数据</div>
            </div>
        </div>
    </div>
</template>
<script>
import {getCookie} from "./../assets/js/util"
import hpNav from './../components/hpNav.vue'
import chooseKnowledge from './../components/chooseKnowledge.vue'
import axios from 'axios'
export default {
    name:"myStaff",
    data(){
        return {
            data_table_staff:[],
            search_staff:'',
            data_table_staff_save:'',
            isAssign:false,
            staffName:'',
            staffWork:'',
            assignPeople:'',
            isShowKnowledge:false,
            options: [],
            valueC: '',
            filePath:'',
            fileType:''
        }
    },
    components:{
        hpNav,
        chooseKnowledge
    },
    created() {
        // 根据当前的用户名渲染员工数据
        axios.post('/mystaff/data_table_staff',{
            username:getCookie('username')
        }).then((response)=>{
          // 对表格数据的处理 
            let res = response.data;
            this.data_table_staff = res[0].childlist;
            this.data_table_staff_save = this.data_table_staff;
        })

        this.assignPeople = getCookie('username');

        // 取企业知识数据
        axios.post('/knowledge/data_knowledge').then((response)=>{
           var jsonStr = JSON.stringify(response.data).replace(/kdname/g,'value');
           this.options = JSON.parse(jsonStr);
        }).catch((error)=>{
            console.log(error)
        })
    },
    methods: {
        searchStaff(){
            // 从表格中的数据进行筛选 searchStaff是输入框里的值
            this.data_table_staff = this.data_table_staff_save;
            let param = this.search_staff;
            // var re =new RegExp("^\\" + param);
            // 不能够实现模糊匹配
            var select_staff = [this.data_table_staff.find(function(item){
                return item.username == param;
            })];
            console.log(select_staff)
            this.data_table_staff = select_staff;
        },

        showAssign(){
            this.isAssign = true;   
            // 判断谁被选中，输入框的默认值
            this.staffName = $('.op_assign:checked').parent().siblings('.op_assign_username').text();
        },
        

        // 指派任务
        sendAssign(){
            console.log(this.assignPeople)
            axios.post('/mystudy/mission_assign',{
                username:this.staffName,
                kdname:this.valueC,
                assigner:this.assignPeople,
                kdpath: this.filePath,
                kdtype: this.fileType
            }).then((response)=>{
               alert('任务指派成功');
            }).catch((error)=>{
                console.log(error)
            })

            this.isAssign = false;
        }
    },
    watch:{
        valueC(val, oldVal){
            //普通的watch监听
            // 当数值变化时，对文件路径的查询
            axios.post('/knowledge/data_knowledge_path',{
                kdname:val
            }).then((response)=>{
                this.filePath = response.data[0].kdpath;
                this.fileType =  response.data[0].kdtype;
            }).catch((error)=>{
                console.log(error)
            })
        },
    }
}
</script>
<style>
.my-staff {
    width: 1000px;
    height: 900px;
    margin: 0 auto;
    border: 1px solid #e4e4e4;
}
.mf-search {
    width: 1000px;
    height: 50px;
    border-bottom: 1px solid #e4e4e4;
}
.mf-table {
    width: 1000px;
}
.mf-table-th {
    background: #f3f6fc;
    font-size: 12px;
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #e4e4e4;
}
.mf-table-th li {
    float: left;
    width: 200px;
    text-align: center;
}
.mf-table-tr {
    font-size: 12px;
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #e4e4e4;
}
.mf-table-tr li {
    float: left;
    width: 200px;
    text-align: center;
}
/* 学习任务的指派 */
.mf-assign {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background: pink;
}
.mf-assign-form {
    width: 400px;
    height: 200px;
    border: 1px solid #e4e4e4;
    margin: 200px auto;
}
</style>