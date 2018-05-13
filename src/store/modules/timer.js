import fakeBackEnd from '@/api/fakeBackEnd'

export default {
    namespaced : true,
    state : {
        timeLeft: 0
    },
    actions : {
        setTimeLeft(context,timeLeft){
            context.commit('setTimeLeft',timeLeft);
        },
        updateTimeLeft(context){
            if(state.timeLeft > 0){
                context.commit('updateTimeLeft')
            }
            
        },
        fetchTimeLeft({commit}){
            return new Promise((resolve,reject)=>{
                fakeBackEnd.getTimeLeft(timeLeft=>{
                    commit('setTimeLeft',timeLeft);
                    resolve();
                });
            });
        },
        countdown(context,timeLeft){
            setInterval(function(){
                context.commit('updateTimeLeft');
            },1000);
        }
    },
    getters : {

    },
    mutations : {
       updateTimeLeft(state){
            state.timeLeft--;
       },
       setTimeLeft(state,timeLeft){
            state.timeLeft = timeLeft;
       }
    }
}