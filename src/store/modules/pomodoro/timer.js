import fakeBackEnd from '@/api/fakeBackEnd'

export default {
    namespaced : true,
    
    state : {
        showGoButton: false,
        sessionNumber: 0, // includes breaks

        timeWork: 1500,
        timeShortPause: 300,
        timeLongPause: 900,
        pause: false,

        timeLeft: 0,

        stateOfSession: null,
        numberOfCurrentSession: null,
        
        timerInverval: false,
        timerBlinkAnimation: false,
        bell: new Audio("http://soundbible.com/mp3/Air Plane Ding-SoundBible.com-496729130.mp3"),
    },

    actions : {
        sessionCompleted({rootState, state}){
            // for completed tasks move things up one level
            
            //document.getElementById('sessionTitle').innerHTML = rootState.sessionTitleList.sessions[state.sessionNumber + 2].name

        },


        //Example for how to fetch things from the server 
        fetchTimeLeft({commit}){
            return new Promise((resolve,reject)=>{
                fakeBackEnd.getTimeLeft(()=>{
                    commit('setTimeLeft',time);
                    resolve();
                });
            });
        },

        // Set timer in the entry screen
        setTimer({commit, state, rootState, dispatch}, room){

            if(state.timerInterval){
            commit('clearTimer');
            }

            // If you are coming from the entry screen and you clicked on a room
            if (room.length > 0){
                commit({
                  type: 'setTimer',
                  work:  room[0],
                  shortPause: room[1],
                  longPause:  room[2],
                  timeLeft: room[3],
                  stateOfSession: room[4],
                  numberOfCurrentSession: room[5]
                })


            // If you created your own room (imperfect)
            } else if(document.getElementById("changeWorkTime").value.length > 0){
                commit({
                  type: 'setTimer',
                  work:  document.getElementById("changeWorkTime").value *60,
                  shortPause: document.getElementById("changeShortPauseTime").value *60,
                  longPause:  document.getElementById("changeLongPauseTime").value *60
                })
            }


             // If the room's time is running continue countdown, else show button so that you can click
             if (room[4] === 'work' && room[3] < room[0] || room[4] === 'shortPause' && room[3] < room[1] || room[4] === 'longPause' && room[3] < room[2]){
               dispatch('countdown')
             } else {
                commit('showGoButton')
             }


             setTimeout(function(){
             commit('sessionTitleList/highlightNextSession', state.sessionNumber, { root: true })  
            },0)

 
             
        },




        countdown({commit, state, dispatch, rootState}, timeLeft){
            // Hide button on pressing start
            if(state.showGoButton){
                commit('hideGoButton')
            };
            

            // If timer is not already running --> start timer
            if(!state.timerInterval){
            
            return state.timerInterval = setInterval(() => {
                if(state.timeLeft > 0){
                    //Counts down the seconds
                    commit('updateTimeLeft');
                  
                  //Show minutes left
                  if(state.timeLeft % 60 ===  59 && Math.floor(state.timeLeft / 60) > 1){
                    if(Math.floor(state.timeLeft / 60) < 10){
                      document.title = '0' + Math.floor(state.timeLeft / 60) + ' minutes left!';
                    } else {
                      document.title = Math.floor(state.timeLeft / 60) + ' minutes left!';
                    }
                  } else if (Math.floor(state.timeLeft / 60) < 1) {
                      document.title = state.timeLeft % 60 + ' seconds left!';
                  }

                } else if(rootState.sessionTitleList.pomodorosDone == rootState.sessionTitleList.pomodoroGoal){
                    //PomodorosDone have reached pomodorogoal
                    alert('You have reached your daily Goal! If you want to continue increase your Pomodoro Goal ;)')

                } else if (state.timeLeft === 0) {
                    
                    document.title = 'Finished!'
                    commit('clearTimer')
                    state.timerInterval = false //only necessary for condition

                    state.bell.play();

                    // ERROR: CLEARLY NOT HITTING CONDITIONS; BUT STILL WORKS? 0o
                    if (state.numberOfCurrentSession % 7 === 0 && state.numberOfCurrentSession !== 0){
                        // Work has passed and it's time for a pause
                        
                        //Call for break feedback
                        commit('feedback/pomodoroBreakFeedback', null, { root: true })

                        commit('switchToLongBreak')
                        

                        setTimeout(function() {
                            dispatch('countdown')

                             //highlight current session title 
                            commit('sessionTitleList/toneDownLastSession', state.sessionNumber, { root: true })
                            commit('sessionTitleList/highlightNextSession', state.sessionNumber, { root: true })
                        }, 3000)   
                    } else if(state.numberOfCurrentSession % 2 === 0){
                        // Work!
                        commit('switchToWork') 
    
                        setTimeout(function() {
                            //highlight current session title 
                            commit('sessionTitleList/toneDownLastSession', state.sessionNumber, { root: true })
                            commit('sessionTitleList/highlightNextSession', state.sessionNumber, { root: true })

                            //Increment the amount of pomodoros done
                            commit('sessionTitleList/incrementPomodorosDone', null, { root: true }) 

                            //Show button again
                            commit('showGoButton')
                        }, 3000)
                        } else {
                         // Work has passed and it's time for a pause

                        //Call for break feedback
                        commit('feedback/pomodoroBreakFeedback', null, { root: true })

                        commit('switchToShortBreak')  
                        
                        setTimeout(function() {
                            dispatch('countdown')

                             //highlight current session title 
                            commit('sessionTitleList/toneDownLastSession', state.sessionNumber, { root: true })
                            commit('sessionTitleList/highlightNextSession', state.sessionNumber, { root: true })
                        }, 3000)   
                    }
                     state.numberOfCurrentSession++
                    }
            },1000);
        }
        },  

    },
  

    mutations : {

       /**********************  countdown functions (in chronological order, badumm tss) *********************/
       setTimer(state, time){
            state.timeWork = time.work,
            state.timeShortPause = time.shortPause,
            state.timeLongPause = time.longPause,
            state.timeLeft = time.timeLeft,
            state.stateOfSession = time.stateOfSession,
            state.numberOfCurrentSession = time.numberOfCurrentSession
       },

       showGoButton(state){
            state.showGoButton = true
       },

       hideGoButton(state){
            state.showGoButton = false
       },

       updateTimeLeft(state){
            state.timeLeft--;
       },
       
       clearTimer(state){
            clearInterval(state.timerInterval)
        },

       switchToShortBreak(state){
            state.timerBlinkAnimation = true;

            //start new timer after 3 seconds 
            setTimeout(function() {
                state.stateOfSession = 'Break';
                state.timeLeft = state.timeShortPause; 
                state.timerBlinkAnimation = false;   
                state.sessionNumber++
            }, 3000)            
      },

       switchToWork(state){
            state.timerBlinkAnimation = true;

            setTimeout(function() { 
                state.timeLeft = state.timeWork;
                state.stateOfSession = 'work';     
                state.timerBlinkAnimation = false; 
                state.sessionNumber++
            }, 3000)   
       },

      switchToLongBreak(state){
            state.timerBlinkAnimation = true;

            //start new timer after 3 seconds 
            setTimeout(function() {
                state.stateOfSession = 'Long Break';
                state.timeLeft = state.timeLongPause; 
                state.timerBlinkAnimation = false;   
                state.sessionNumber++
            }, 3000)            
      },

     

        /**********************  other functions *********************/

        //Example for how to fetch things from the server 
       setTimeLeft(state,time){
            state.timeWork = time[0];
            state.timePause = time[1];
            state.pause = time[2];
       },
    }
}


