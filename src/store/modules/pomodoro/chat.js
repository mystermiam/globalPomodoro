const axios = require('axios'),
        $ = require('jquery');

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
            axios.get('/api/fetchMessages').then(function(response){
                commit('setMessages',response.data.messages);
            });
        },

        fetchUsers({commit, rootState}){
             return new Promise((resolve,reject)=>{
                rootState.fakeBackEnd.getUsers((users)=>{
                    commit('fetchUsers',users);
                    resolve();
                });
            });
        },


        saveMessages(context,message){
            
           axios.post('/api/saveMessages',{newMessage:message
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
            
            state.messages = state.messages.concat(messages);
        }
    }
};