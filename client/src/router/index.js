import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const page = name => () => import('@/page/' + name)

export default new Router({
  routes: [
    {path: '/', name: 'home', component: page('home')}, 

  ]
})
