import fakeBackEnd from '@/api/fakeBackEnd'

export default {
    namespaced : true,
    state : {
        timeLeft: 0,
        break: false
    },
    actions : {
        setTimeLeft(context,timeLeft){
            context.commit('setTimeLeft',timeLeft);
        },
        updateTimeLeft(context){
            if(state.timeLeft > 0){
                context.commit('updateTimeLeft')
            }
            if(state.timeLeft === 0 && !state.break){
                //play sound
                context.commit()
            }
            
        },
        fetchTimeLeft({commit}){
            return new Promise((resolve,reject)=>{
                fakeBackEnd.getTimeLeft((timeLeft,pause)=>{
                    console.log('ti '+timeLeft,'pause ' + pause);
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