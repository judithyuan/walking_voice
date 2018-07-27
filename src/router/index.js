import Vue from 'vue'
import Router from 'vue-router'
import Player from '@/view/Player/index';//单曲播放页面
import HomeIndex from '@/view/Home/index';//项目首页
import List from '@/view/List/index';//列表页
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeIndex
    },
    {
    	path: '/player/:id',//播放页
    	component: Player
    },
    {
    	path: '/list/:id',//列表页
    	component: List
    }
  ]
})
