import fakeBackEnd from '@/api/fakeBackEnd'

export default {
    namespaced : true,
    state : {
        timeLeft: 0,
        pause: false,
        timerBlinkAnimation: false,
        bell: new Audio("http://soundbible.com/mp3/Air Plane Ding-SoundBible.com-496729130.mp3"),
        timerInverval: 0
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
        countdown({commit, state, dispatch},timeLeft){

            return state.timerInterval = setInterval(() => {
                  if(state.timeLeft > 0){
                    commit('updateTimeLeft')
                } else if (state.timeLeft <= 0 && !state.pause){

                    // let seconds blink for three times - pause timer for 3 seconds
                    clearInterval(state.timerInterval);
                    
                    commit('switchTopause')

                    state.bell.play()

                    setTimeout(function() { 
                        dispatch('countdown');     
                    }, 3000)


                } else if (state.timeLeft <= 0 && state.pause) {

                    clearInterval(state.timerInterval);

                    commit('switchToWork')
                    
                    state.bell.play()

                    setTimeout(function() { 
                        dispatch('countdown');     
                    }, 3000)
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
            state.timerBlinkAnimation = true;

            //start new timer after 3 seconds 
            setTimeout(function() { 
                state.pause = true;
                state.timeLeft = 300; 
                state.timerBlinkAnimation = false;     
            }, 3000)

            

      },
       switchToWork(state,timeLeft){
            state.timerBlinkAnimation = true;

            setTimeout(function() { 
                state.timeLeft = 1500;
                state.pause = false;     
                state.timerBlinkAnimation = false; 
            }, 3000)
            
       },

    }
}