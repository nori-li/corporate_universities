// 前端路由
import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import homepage from './../views/homepage.vue'
import systemManage from './../views/systemManage'
import epKnowledge from './../views/epKnowledge'
import myStaff from './../views/myStaff'
import myStudy from './../views/myStudy'

import Intensive from './../components/intensive.vue'
import Latest from './../components/latest.vue'
import Recommond from './../components/recommond.vue'
import Guesslike from './../components/guesslike.vue'

Vue.use(Router)

export default new Router({
  mode:"history",
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/homepage',
      name: 'homepage',
      component: homepage
    },
    {
      path: '/systemManage',
      name: 'systemManage',
      component: systemManage
    },
    {
      path: '/epKnowledge',
      name: 'epKnowledge',
      component: epKnowledge
    },
    {
      path: '/myStaff',
      name: 'myStaff',
      component: myStaff
    },
    {
      path: '/myStudy',
      name: 'myStudy',
      component: myStudy
    },
    // 下面是企业知识模块 更多的跳转
    {
      path: '/epKnowledge/Intensive',
      name: 'Intensive',
      component: Intensive
    },
    {
      path: '/epKnowledge/Latest',
      name: 'Latest',
      component: Latest
    },
    {
      path: '/epKnowledge/Recommond',
      name: 'Recommond',
      component: Recommond
    },
    {
      path: '/epKnowledge/Guesslike',
      name: 'Guesslike',
      component: Guesslike
    }
  ]
})
