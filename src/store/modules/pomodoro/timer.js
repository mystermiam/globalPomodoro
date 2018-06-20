import fakeBackEnd from '@/api/fakeBackEnd'


// Done // Timer: fetch time --> click start --> start countdown (through button click) --> timer == 0 --> Stop timer + beep + blink --> switch pause --> click start to go into pause --> increment pomodoro sessions done by one --> timer == 0 --> Go to work --> repeat until pomodoroDone == pomodoroGoal
// Done // PomodoroGoal: Default 10 --> click pomodoro goal --> change number --> save to state
// Done // first time you load the timer it doesn't highlight the session 

// Improvements: 


// Show timer in tab (on hover)
// Multi user: 
// Statistics: see how long a user needs to press button to continue --> calculate an average --> implement that as new timer length


// Battle plan: Check off todo



export default {
    namespaced : true,
    
    state : {
        showGoButton: false,
        sessionNumber: 0, // includes breaks
        timeWork: 0,
        timePause: 300,
        timeLeft: 0,
        pause: false,
        timerInverval: false,
        timerBlinkAnimation: false,
        bell: new Audio("http://soundbible.com/mp3/Air Plane Ding-SoundBible.com-496729130.mp3"),
        ownRoom: [25,5,false],
    },

    getters : {

    },

    actions : {

        //Example for how to fetch things from the server 
        fetchTimeLeft({commit}){
            return new Promise((resolve,reject)=>{
                fakeBackEnd.getTimeLeft(()=>{
                    commit('setTimeLeft',time);
                    resolve();
                });
            });
        },


        // Change work and break time in the entry screen
        changeWorkTime({commit, state}){
            if( document.getElementById("changeWorkTime").value > 0 && document.getElementById("changeWorkTime").value <= 300){
                 commit('changeWorkTime');
            } else {
                document.getElementById("changeWorkTime").value = ''+ state.timeWork +'';
            }
        },

        changePauseTime({commit, state}){
             if( document.getElementById("changePauseTime").value > 0 && document.getElementById("changePauseTime").value <= 300){
                commit('changePauseTime');
            } else {
                document.getElementById("changePauseTime").value = ''+ state.timePause +'';
            }
        },


        // Set timer in the entry screen
        setTimer({commit, state, rootState}, payload){
            if(state.timerInterval){
            commit('clearTimer');
            }

            commit({
              type: 'setTimer',
              timeWork: payload[0],
              timePause: payload[1],
              pause: payload[2]
            })

             setTimeout(function(){
             commit('sessionTitleList/highlightNextSession', state.sessionNumber, { root: true })  
        },0)

             commit('showGoButton')
             
        },



        countdown({commit, state, dispatch, rootState},timeLeft){
            if(state.showGoButton){
                commit('hideGoButton')
            };
            
            if(!state.timerInterval){
                
            return state.timerInterval = setInterval(() => {
                if(state.timeLeft > 0){
                    //Counts down the seconds
                    commit('updateTimeLeft');

                } else if(rootState.sessionTitleList.pomodorosDone == rootState.sessionTitleList.pomodoroGoal){
                    //PomodorosDone have reached pomodorogoal
                    commit('clearTimer')
                    alert('You have reached your daily Goal! If you want to continue increase your Pomodoro Goal ;)')

                } else if (state.timeLeft === 0 && state.pause) {
                    // Timer is on 0 and it's pause
                    state.bell.play();
                    commit('switchToWork') 
                    commit('clearTimer')
                    state.timerInterval = false
                    setTimeout(function() {
                    commit('sessionTitleList/toneDownLastSession', state.sessionNumber, { root: true })
                    commit('sessionTitleList/highlightNextSession', state.sessionNumber, { root: true })
                    commit('sessionTitleList/incrementPomodorosDone', null, { root: true }) 
                    commit('showGoButton')
                    }, 3000)    
                } else if (state.timeLeft === 0 && !state.pause) {
                    state.bell.play();
                     //highlight current session title 
                    commit('switchToPause')  

                    commit('clearTimer')
                    state.timerInterval = false
                    setTimeout(function() {
                    dispatch('countdown')
                    commit('sessionTitleList/toneDownLastSession', state.sessionNumber, { root: true })
                    commit('sessionTitleList/highlightNextSession', state.sessionNumber, { root: true })
                    }, 3000)         
                };
            },1000);
        }
        },  

    boxChecked({commit}){
        
    },


    },
  
    mutations : {
       updateTimeLeft(state){
            state.timeLeft--;
       },
       //Example for how to fetch things from the server 
       setTimeLeft(state,payload){
            state.timeWork = time[0];
            state.timePause = time[1];
            state.pause = time[2];

       },
       //From session
       setTimer(state, payload){
            state.timeWork = payload.timeWork,
            state.timePause = payload.timePause,
            state.pause = payload.pause;
            
            if(state.pause){
                state.timeLeft = state.timePause
            } else if (!state.pause) {
                state.timeLeft = state.timeWork
            }
       },

       showGoButton(state){
            state.showGoButton = true
       },

        hideGoButton(state){
            state.showGoButton = false
       },

       switchToPause(state,timeLeft){
            state.timerBlinkAnimation = true;

            //start new timer after 3 seconds 
            setTimeout(function() {
                state.pause = true;
                state.timeLeft = state.timePause; 
                state.timerBlinkAnimation = false;   
                state.sessionNumber++
            }, 3000)            
      },
      switchToWork(state,timeLeft){
            state.timerBlinkAnimation = true;

            setTimeout(function() { 
                state.timeLeft = state.timeWork;
                state.pause = false;     
                state.timerBlinkAnimation = false; 
                state.sessionNumber++
            }, 3000)   
       },

       changeWorkTime(state){
            state.timeWork = document.getElementById("changeWorkTime").value * 60;
            state.ownRoom[0] = state.timeWork;

        },
        changePauseTime(state){
            state.timePause =  document.getElementById("changePauseTime").value * 60;
            state.ownRoom[1] = state.timePause;
        },
        clearTimer(state){
            clearInterval(state.timerInterval)
        },
    }
}


