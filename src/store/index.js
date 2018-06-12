import Vue from 'vue'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import VueRouter from 'vue-router'

//Pomodoro Modules
import timer from './modules/pomodoro/timer'
import chat from './modules/pomodoro/chat'
import session from './modules/pomodoro/session'
import toDoList from './modules/pomodoro/toDoList'

//Sidebar Modules
import avatar from './modules/menu/sidebar/avatar'

//Landing Page Modules
import landingPage from './modules/homepage/landingPage'


Vue.use(Vuex)
Vue.use(VueRouter)

Vue.use(Vuetify)

export default new Vuex.Store({
    modules : {
        timer,
        chat,
        toDoList,
        session,
        avatar,
        landingPage,
      
    },
    state : {
        
    },
    actions : {

    },
    getters : {

    },
    mutations : {
        
    }
});