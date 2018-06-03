import fakeBackEnd from '@/api/fakeBackEnd'


// Timer: fetch time --> click start --> start countdown (through button click) --> timer == 0 --> Stop timer --> switch pause --> click start to go into pause --> repeat!


export default {
    namespaced : true,
    state : {
        timeLeft: 0,
        pause: false,
        timerBlinkAnimation: false,
        bell: new Audio("http://soundbible.com/mp3/Air Plane Ding-SoundBible.com-496729130.mp3"),
        timerInverval: false,
        pomodorosDone: 0,
        pomodoroGoal: 10
    },
    actions : {
        fetchTimeLeft({commit}){
            return new Promise((resolve,reject)=>{
                fakeBackEnd.getTimeLeft((time)=>{
                    commit('setTimeLeft',time);
                    resolve();
                });
            });
        },

        countdown({commit, state, dispatch},timeLeft){

            if(!state.timerInterval){
            // INSERT CONDITION HERE SO THAT THE COUNTDOWN CAN ONLY BE CALLED ONCE!
            return state.timerInterval = setInterval(() => {
                  if(state.timeLeft > 0){
                    commit('updateTimeLeft');
                } else if (state.timeLeft === 0 && state.pause) {
                    state.bell.play();
                    commit('switchToWork');
                    clearInterval(state.timerInterval);
                    state.timerInterval = false
                } else if (state.timeLeft === 0 && !state.pause) {
                    state.bell.play();
                    commit('switchToPause');
                    clearInterval(state.timerInterval);
                    state.timerInterval = false
                };
            },1000);
        }
        },

        changePomodoroGoal({commit, state}){
            // get text --> replace with form field (text inside) --> get only numbers from 0 - 1 and only 2 --> retrieve and update pomodoroGoal
            
            if( document.getElementById("pomodoroGoal").textContent > 0 && document.getElementById("pomodoroGoal").textContent < 16){
                commit('updatePomodoroGoal')
            } else {
                document.getElementById("pomodoroGoal").innerHTML = ''+ state.pomodoroGoal +'';
            }
        },

       


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
       switchToPause(state,timeLeft){
            state.timerBlinkAnimation = true;
            state.pomodorosDone++;
            
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
       updatePomodoroGoal(state){
            state.pomodoroGoal = document.getElementById("pomodoroGoal").textContent;
       }
    }
}


