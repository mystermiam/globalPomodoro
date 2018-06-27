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
        
        timerInverval: false,
        timerBlinkAnimation: false,
        bell: new Audio("http://soundbible.com/mp3/Air Plane Ding-SoundBible.com-496729130.mp3"),
    },

    actions : {
        sessionCompleted({rootState, state}){
            // Doesn't work yet
            alert(document.getElementById('sessionTitle').textContent)
            document.getElementById('sessionTitle').innerHTML = rootState.sessionTitleList.sessions[state.sessionNumber + 2].name
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
        setTimer({commit, state, rootState}, room){

            if(state.timerInterval){
            commit('clearTimer');
            }

            // If you are coming from the entry screen and you clicked on a room
            if (room.length > 0){
                commit({
                  type: 'setTimer',
                  work:  room[0],
                  shortPause: room[1],
                  longPause:  room[2]
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


             setTimeout(function(){
             commit('sessionTitleList/highlightNextSession', state.sessionNumber, { root: true })  
            },0)

             commit('showGoButton')
             
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

                } else if(rootState.sessionTitleList.pomodorosDone == rootState.sessionTitleList.pomodoroGoal){
                    //PomodorosDone have reached pomodorogoal
                    commit('clearTimer')
                    alert('You have reached your daily Goal! If you want to continue increase your Pomodoro Goal ;)')

                } else if (state.timeLeft === 0 && !state.pause) {
                    // Work has passed and it's time for a pause

                    state.bell.play();

                    let nextSessionNumber = state.sessionNumber + 1;
                    //If current session is a long break switch to long break, otherwise switch to short one
                    if(rootState.sessionTitleList.sessions[nextSessionNumber].category === 'Break'){
                    commit('switchToShortBreak')  
                    } else {
                    commit('switchToLongBreak')
                    }   


                    commit('clearTimer')
                    state.timerInterval = false
                    setTimeout(function() {
                    dispatch('countdown')

                     //highlight current session title 
                    commit('sessionTitleList/toneDownLastSession', state.sessionNumber, { root: true })
                    commit('sessionTitleList/highlightNextSession', state.sessionNumber, { root: true })
                    }, 3000)         
                } else if (state.timeLeft === 0 && state.pause) {
                    // Pause has passed and it's time for work
                    
                    state.bell.play();

                    commit('switchToWork') 
                    

                    commit('clearTimer')
                    state.timerInterval = false
                    
                    setTimeout(function() {
                    //highlight current session title 
                    commit('sessionTitleList/toneDownLastSession', state.sessionNumber, { root: true })
                    commit('sessionTitleList/highlightNextSession', state.sessionNumber, { root: true })

                    //Increment the amount of pomodoros done
                    commit('sessionTitleList/incrementPomodorosDone', null, { root: true }) 

                    //Show button again
                    commit('showGoButton')
                    }, 3000)
                    } 
            },1000);
        }
        },  

    },
  

    mutations : {

       /**********************  countdown functions (in chronological order, badumm tss) *********************/
       setTimer(state, time){
            state.timeWork = time.work,
            state.timeLeft = time.work,

            state.timeShortPause = time.shortPause,
            state.timeLongPause = time.longPause
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
                state.pause = true;
                state.timeLeft = state.timeShortPause; 
                state.timerBlinkAnimation = false;   
                state.sessionNumber++
            }, 3000)            
      },

       switchToWork(state){
            state.timerBlinkAnimation = true;

            setTimeout(function() { 
                state.timeLeft = state.timeWork;
                state.pause = false;     
                state.timerBlinkAnimation = false; 
                state.sessionNumber++
            }, 3000)   
       },

      switchToLongBreak(state){
            state.timerBlinkAnimation = true;

            //start new timer after 3 seconds 
            setTimeout(function() {
                state.pause = true;
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


