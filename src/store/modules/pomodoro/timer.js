import fakeBackEnd from '@/api/fakeBackEnd'


// Done // Timer: fetch time --> click start --> start countdown (through button click) --> timer == 0 --> Stop timer + beep + blink --> switch pause --> click start to go into pause --> increment pomodoro sessions done by one --> timer == 0 --> Go to work --> repeat until pomodoroDone == pomodoroGoal
// Done // PomodoroGoal: Default 10 --> click pomodoro goal --> change number --> save to state

// Improvements: 
// Show timer in tab (on hover)
// Multi user: 
// Statistics: see how long a user needs to press button to continue --> calculate an average --> implement that as new timer length

export default {
    namespaced : true,
    
    state : {
        timeWork: 1500,
        timePause: 300,
        timeLeft: 0,
        pause: false,
        timerInverval: false,
        timerBlinkAnimation: false,
        bell: new Audio("http://soundbible.com/mp3/Air Plane Ding-SoundBible.com-496729130.mp3"),
        pomodorosDone: 1,
        pomodoroGoal: 4,
        ownRoom: [25,5,false]
    },

    actions : {

        // Fetch time from server
        fetchTimeLeft({commit}){
            return new Promise((resolve,reject)=>{
                fakeBackEnd.getTimeLeft((time)=>{
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
            });    

            commit({
              type: 'highlightNextSessionTitle',
              sessionTitleNumber: rootState.sessionTitleList.sessionTitles[state.pomodorosDone - 1]
            });    
        },


        countdown({commit, state, dispatch, rootState},timeLeft){

            if(!state.timerInterval){
            // INSERT CONDITION HERE SO THAT THE COUNTDOWN CAN ONLY BE CALLED ONCE!
            return state.timerInterval = setInterval(() => {
                  if(state.timeLeft > 0){
                    commit('updateTimeLeft');
                } else if (state.timeLeft === 0 && state.pause) {
                    state.bell.play();
                    commit('switchToWork');

                    //highlight current session title
                    commit({
                      type: 'toneDownLastSessionTitle',
                      previousSessionNumber: rootState.sessionTitleList.sessionTitles[state.pomodorosDone] 
                    });   
                    commit({
                      type: 'highlightNextSessionTitle',
                      sessionTitleNumber: rootState.sessionTitleList.sessionTitles[state.pomodorosDone + 1]
                    });   


                       
                    commit('clearTimer');
                    state.timerInterval = false
                } else if (state.timeLeft === 0 && !state.pause) {
                    state.bell.play();
                    commit('switchToPause');
                    commit('clearTimer');
                    state.timerInterval = false
                    setTimeout(function() {
                    dispatch('countdown');
                    }, 3000)         
                };
            },1000);
        }
        },

        // Set new pomodoro goal (can't decrease beyond pomodorosDone) --> change sessionlist accordingly --> if length is different from before in/decrease length of array 
        changePomodoroGoal({commit, state}){
            if( document.getElementById("pomodoroGoal").value > 0 && document.getElementById("pomodoroGoal").value <= 16){
                commit('updatePomodoroGoal')
            } else {
                document.getElementById("pomodoroGoal").value = ''+ state.pomodoroGoal +'';
            }
        },



       


    },
    getters : {

    },
    mutations : {
       updateTimeLeft(state){
            state.timeLeft--;
       },
       //From server
       setTimeLeft(state,payload){
            state.timeLeft = time[0];
            state.pause = time[1];
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
       switchToPause(state,timeLeft){
            state.timerBlinkAnimation = true;
            state.pomodorosDone++;
            
            //start new timer after 3 seconds 
            setTimeout(function() {
                state.pause = true;
                state.timeLeft = state.timePause; 
                state.timerBlinkAnimation = false;     
            }, 3000)            
      },
      switchToWork(state,timeLeft){
            state.timerBlinkAnimation = true;

            setTimeout(function() { 
                state.timeLeft = state.timeWork;
                state.pause = false;     
                state.timerBlinkAnimation = false; 
            }, 3000)   
       },

       highlightNextSessionTitle(state, session){
           session.sessionTitleNumber.active = true;
       },

       toneDownLastSessionTitle(state, session){
            session.previousSessionNumber.active = false;
       },

       updatePomodoroGoal(state){
            state.pomodoroGoal = document.getElementById("pomodoroGoal").value;
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
            clearInterval(state.timerInterval);
        }
    }
}


