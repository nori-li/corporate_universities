<template>
    <div>
        <ul class="knowledge-list">
        </ul>
    </div>
</template>
<script>
// import {choose} from './../assets/js/common.js'
import axios from 'axios'
export default {
    name:'chooseKnowledge',
    data(){
        return {
          
        }
    },
    created(){
        axios.post('/knowledge/data_knowledge').then((response)=>{
            for(var i=0;i<response.data.length;i++){
                $('.knowledge-list').append('<li class="knowledge-list-li">'+response.data[i].kdname+'</li>');
            } 
            $('.knowledge-list-li').on('click',function(){
                 console.log(this.innerText)
            })
            this.$emit('getkdname',response.data[1].kdname)
        }).catch((error)=>{
            console.log(error)
        })
    },
    methods:{
        
    },
    mounted(){
       
    }
}
</script>
<style>
.knowledge-list {
    width: 200px;
    height: 200px;
    border: 1px solid red;
    overflow-y:scroll;
}
.knowledge-list li:hover {
    background: blue;
}
</style>
