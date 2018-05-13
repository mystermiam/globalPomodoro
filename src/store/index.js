import Vue from 'vue'
import Vuex from 'vuex'

import timer from './modules/timer'
import chat from './modules/chat'

Vue.use(Vuex)

export default new Vuex.Store({
    modules : {
        timer,
        chat
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