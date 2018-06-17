import Vue from 'vue'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import VueRouter from 'vue-router'

import router from '../router/index'

//Pomodoro Modules

import timer from './modules/pomodoro/timer'
import chat from './modules/pomodoro/chat'
import session from './modules/pomodoro/session'
import distractionList from './modules/pomodoro/distractionList'
import sessionTitleList from './modules/pomodoro/sessionTitleList'


//Sidebar Modules
import avatar from './modules/menu/sidebar/avatar'

//Landing Page Modules
import landingPage from './modules/homepage/landingPage'
import axios from 'axios'


Vue.use(Vuex)
Vue.use(VueRouter)

Vue.use(Vuetify)

export default new Vuex.Store({
    modules : {
        timer,
        chat,
        distractionList,
        sessionTitleList,
        session,
        avatar,
        landingPage,
      
    },
    state : {
        userIsLoggedIn : true
    },
    actions : {
        checkCredentials(context,user){
            axios.post('http://localhost:3801/connection',user).then(function(response){
                if(response.data.error){
                  console.log('not granted')
                }
                else if(response.data.success){
                  context.state.userIsLoggedIn = true;
                  console.log('granted');
                  router.push({name:'Session'});
                }
            });
        },
        setUserIsLoggedIn(context,userIsLoggedIn){
            context.commit('setUserIsLoggedIn',userIsLoggedIn)
        }
    },
    getters : {

    },
    mutations : {
        setUserIsLoggedIn(state,userIsLoggedIn){
            state.userIsLoggedIn = userIsLoggedIn;
        }
    }
});