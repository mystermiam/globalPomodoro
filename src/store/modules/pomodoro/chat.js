const axios = require('axios'),
        $ = require('jquery');


import fakeBackEnd from '@/api/fakeBackEnd';
export default {
    namespaced : true,
    state : {
        chatId: -1,
        roomId: -1,
        participants: [0,1],
        messages : [],
        users : [],
    },
    actions : {
        fetchMessages({commit}){
            axios.get('http://localhost:3801/fetchMessages').then(function(response){
                console.log('response fetchMessages')
                console.log(response.data.messages)
                commit('setMessages',response.data.messages);
            });
        },

        fetchUsers({commit}){
             return new Promise((resolve,reject)=>{
                fakeBackEnd.getUsers((users)=>{
                    commit('fetchUsers',users);
                    resolve();
                });
            });
        },


        saveMessages(context,message){
            console.log('in store')
            console.log(message)

                     

           axios.post('http://localhost:3801/saveMessages',{newMessage:message
           }).then(function(response){
            console.log('bitch');
            console.log(response);
            //find a better solution because it's not optimal i believe, even tough client looked saved
            context.commit('concatMessages',[response.data.savedMessage]); 
           });

          
        },
        concatMessages(context,messages){
            context.commit('concatMessages',messages);
        }
    },
    getters : {

    },
    mutations : {
        fetchUsers(state, users){
            state.users = users;
        },

        setMessages(state,messages){
            state.messages = messages;
        },

        concatMessages(state,messages){
            console.log('in mutations');
            console.log('messages')
            console.log(messages)
            state.messages = state.messages.concat(messages);
        }
    }
};