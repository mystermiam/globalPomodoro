import Vue from 'vue'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import VueRouter from 'vue-router'

import router from '../router/index'
import timer from './modules/pomodoro/timer'
import chat from './modules/pomodoro/chat'
import session from './modules/pomodoro/session'
import avatar from './modules/menu/sidebar/avatar'
import landingPage from './modules/homepage/landingPage'
import axios from 'axios'

Vue.use(Vuex)
Vue.use(VueRouter)

Vue.use(Vuetify)

export default new Vuex.Store({
    modules : {
        timer,
        chat,
        session,
        avatar,
        landingPage
    },
    state : {
        userIsLoggedIn : false
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
                  router.push({name:'Menu'});
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