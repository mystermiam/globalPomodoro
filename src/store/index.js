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
import pomodoroSettings from './modules/pomodoro/pomodoroSettings'


//Sidebar Modules
import avatar from './modules/menu/sidebar/avatar'
import pets from './modules/menu/sidebar/pets'
import progressBar from './modules/menu/sidebar/progressBar'

//Toolbox Modules
import dailies from './modules/menu/toolbox/dailies'
import toDo from './modules/menu/toolbox/toDo'

//Landing Page Modules
import landingPage from './modules/homepage/landingPage'

//Game Modules
import game from './modules/gameWorld/index'

import player from './modules/gameWorld/utilities/player'
import dialogue from './modules/gameWorld/utilities/dialogue'
import createNPCs from './modules/gameWorld/utilities/createNPCs'
import loadInterface from './modules/gameWorld/utilities/loadInterface'

//Axios
import axios from 'axios'



Vue.use(Vuex)
Vue.use(VueRouter)

Vue.use(Vuetify)

const store = new Vuex.Store({
    namespaced : true,
    modules : {
        timer,
        chat,
        distractionList,
        sessionTitleList,
        session,
        avatar,
        pets,
        landingPage,
        dailies,
        toDo,
        progressBar,
        pomodoroSettings,
        game,
        player,
        dialogue,
        createNPCs,
        loadInterface,

    },
    state : {
        userIsLoggedIn : true
    },
    actions : {
        checkCredentials(context,user){
            axios.post('http://grow.cri-paris.org/api/connection',user).then(function(response){
                if(response.data.error){
                  console.log('not granted')
                }
                else if(response.data.success){
                  context.state.userIsLoggedIn = true;
                  console.log('granted');
                  router.push({name:'Pomodoro'});
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

export default store