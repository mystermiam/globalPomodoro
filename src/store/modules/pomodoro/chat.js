export default {
    namespaced : true,
    state : {
        messages : [{
            nickname : 'bobo',
            textMessage : 'Hello!',
            time : new Date()
        },
        {
            nickname : 'baba',
            textMessage : 'Hi',
            time : new Date()
        }]
    },
    actions : {
        concatMessages(context,messages){
            context.commit('concatMessages',messages);
        }
    },
    getters : {

    },
    mutations : {
        concatMessages(state,messages){
            state.messages = state.messages.concat(messages);
        }
    }
};