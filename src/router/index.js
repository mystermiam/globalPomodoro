import Vue from 'vue'
import Router from 'vue-router'
import Session from './../components/pomodoro/Session'
import Lounge from './../components/pomodoro/Lounge'
import Pomodoro from './../components/pomodoro/Pomodoro'
import LandingPage from './../components/homepage/LandingPage'
import Menu from './../components/menu/Menu'
import GameScreen from './../components/gameWorld/GameScreen'

import store from './../store/index'


Vue.use(Router)

/*
const grantedUser = (to,from,next)=>{

  if(store.state.userIsLoggedIn == true){
    console.log(store.state.userIsLoggedIn)
    next() 
    return;
  } 
  next('/Session')
}*/

const notGrantedUser = (to,from,next)=>{
 
  if(!store.state.userIsLoggedIn){

    next('/'); 
    return;
  } 
  next();
}


const router =  new Router({
  routes: [
  	{
      path: '/',
      name: 'LandingPage',
      component: LandingPage
    },
    {
      path: '/Pomodoro',
      name: 'Pomodoro',
      component: Pomodoro,
      beforeEnter : notGrantedUser
    },
    {
      path: '/Session',
      name: 'Session',
      component : Session,
      beforeEnter: notGrantedUser
    },
    {
      path: '/Lounge',
      name: 'Lounge',
      component: Lounge,
      beforeEnter : notGrantedUser
    },
    {
      path: '/Menu',
      name: 'Menu',
      component: Menu,
      beforeEnter : notGrantedUser
    },
    {
      path: '/Game',
      name: 'Game',
      component: GameScreen,
      beforeEnter : notGrantedUser
    },
  ]
})

export default router;