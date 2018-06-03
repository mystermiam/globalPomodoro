import Vue from 'vue'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import VueRouter from 'vue-router'


import timer from './modules/pomodoro/timer'
import chat from './modules/pomodoro/chat'
import readyButton from './modules/pomodoro/readyButton'

Vue.use(Vuex)
Vue.use(VueRouter)

Vue.use(Vuetify)

export default new Vuex.Store({
    modules : {
        timer,
        chat,
        readyButton,
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