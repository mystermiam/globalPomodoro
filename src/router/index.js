import Vue from 'vue'
import Router from 'vue-router'
import Timer from '@/components/pomodoro/Timer'
import Chat from '@/components/pomodoro/Chat'
import Pomodoro from '@/components/pomodoro/Pomodoro'
import LandingPage from '@/components/homepage/LandingPage'

Vue.use(Router)

export default new Router({
  routes: [
  	{
      path: '/',
      name: 'LandingPage',
      component: LandingPage
    },
    {
      path: '/Pomodoro',
      name: 'Pomodoro',
      component: Pomodoro
    }
  ]
})
