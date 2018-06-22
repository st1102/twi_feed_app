import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Search from '@/components/Search'
import MyFeeds from '@/components/MyFeeds'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    },
    {
      path: '/myfeeds',
      name: 'MyFeeds',
      component: MyFeeds
    }
  ]
})
