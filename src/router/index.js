import Vue from 'vue'
import Router from 'vue-router'
import Session from '@/components/pomodoro/Session'
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
    },
    {
      path: '/Session',
      name: 'Session',
      component: Session
    }
  ]
})
