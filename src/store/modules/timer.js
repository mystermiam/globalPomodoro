import fakeBackEnd from '@/api/fakeBackEnd'

export default {
    namespaced : true,
    state : {
        timeLeft: 0,
        pause: false,
        bell: new Audio("http://soundbible.com/mp3/Air Plane Ding-SoundBible.com-496729130.mp3")
    },
    actions : {
        setTimeLeft(context,timeLeft){
            context.commit('setTimeLeft',timeLeft);
        },
        updateTimeLeft(context){
           
            
        },
        fetchTimeLeft({commit}){
            return new Promise((resolve,reject)=>{
                fakeBackEnd.getTimeLeft((time)=>{
                    commit('setTimeLeft',time);
                    resolve();
                });
            });
        },
        countdown({commit, state},timeLeft){

            setInterval(() => {
                  if(state.timeLeft > 0){
                    commit('updateTimeLeft')
                } else if (state.timeLeft <= 0 && !state.pause){
                    commit('switchTopause')
                    state.bell.play()
                } else if (state.timeLeft <= 0 && state.pause) {
                    commit('switchToWork')
                    state.bell.play()
                }
            },1000);
        }
    },
    getters : {

    },
    mutations : {
       updateTimeLeft(state){
            state.timeLeft--;
       },
       setTimeLeft(state,time){
            state.timeLeft = time[0];
            state.pause = time[1];
       },
       switchTopause(state,timeLeft){
            state.timeLeft = 300;
            state.pause = true;
      },
       switchToWork(state,timeLeft){
            state.timeLeft = 1500;
            state.pause = false;
       },

    }
}