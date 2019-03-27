<template>
    <div class="hp">
       <!-- 这个是组件的使用，可以传参数 -->
       <hpNav></hpNav>
       <!-- 首页的轮播图 -->
        <div class="hp-carousel  type-page">
            <el-carousel :interval="5000" arrow="always">
                <el-carousel-item v-for="item in 4" :key="item">
                    <h3>{{ item }}</h3>
                </el-carousel-item>
            </el-carousel>
            <!-- 精品课程 -->
            <el-container>
                <el-header style="font-size:20px;">精品课程</el-header>
                <el-container>
                    <el-aside width="200px">

                    </el-aside>
                    <el-main>
                        <ul>
                            <li>
                                
                            </li>
                            <li></li>
                            <li></li>
                            <li></li>
                        </ul>
                    </el-main>
                </el-container>
            </el-container>
            <!-- 精品课程 -->
            <el-container>
                <el-header style="font-size:20px;">精品课程</el-header>
                <el-container>
                    <el-aside width="200px">

                    </el-aside>
                    <el-main>
                        <ul>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                        </ul>
                    </el-main>
                </el-container>
            </el-container>
            <!-- 精品课程 -->
            <el-container>
                <el-header style="font-size:20px;">精品课程</el-header>
                <el-container>
                    <el-aside width="200px">

                    </el-aside>
                    <el-main>
                        <ul>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                        </ul>
                    </el-main>
                </el-container>
            </el-container>
            <!-- 最后部分 -->
            <el-container>
              <el-header>Header</el-header>
              <el-main>Main</el-main>
              <el-footer>Footer</el-footer>
            </el-container>
        </div>
        
    </div>
</template>
<script>
import hpNav from './../components/hpNav.vue'
export default {
    name:"homepage",
    components: {
        hpNav
    }
}
</script>
<style>
 .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }
  .type-page {
    width: 1100px!important;
    margin: 0 auto;
  }
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: left;
    padding-left: 60px;
    line-height: 60px;
    position: relative;
  }
  .el-header::before {
      position: absolute;
      left: 38px;
      top: 21px;
      content: '';
      display: inline-block;
      width: 10px;
      height: 10px;
      border: 4px solid red;
      border-radius: 50%;
  }
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    
    line-height: 200px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
   
    line-height: 160px;
  }
  .el-main ul {
    overflow: hidden;
  }
  .el-main ul li {
      float: left;
      width: 210px;
      height: 100px;
      border:1px solid red;
      margin-left: 10px;
      
  }
</style>
