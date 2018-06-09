const axios = require('axios');

export default {
    namespaced : true,
    state : {
        chatId: -1,
        roomId: -1,
        participants: [0,1],
        messages : [{ 
            authorId: 0,
            chatId: -1,
            author : 'bobo',
            textMessage : 'Hello!',
            time : new Date()
        },
        {
            authorId:1,
            chatId: -1,
            author : 'baba',
            textMessage : 'Hi',
            time : new Date()
        }]
    },
    actions : {
        fetchMessages({commit},messages){
            axios.get('http://localhost:3801/fetchMessages').then(function(response){
                commit('concatMessages',messages);
            });


        },
        saveMessages(context,messages){

            console.log(messages);

            context.commit('concatMessages',messages);

            axios.post('http://localhost:3801/saveMessages',{
                messages : context.state.messages
            }).then(function(response){
                console.log('saveMessages response ' + response);
                for(var k in response)console.log(k,response[k]);
                
            });
        },
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