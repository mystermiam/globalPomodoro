import moment from 'moment'

export default {
	namespaced: true,
	state : {
		toggleLists: false,
		sessions: [],
		sessionTitleEdited: 0, 
		pomodorosDone: 1,
        pomodoroGoal: 10,
        toDoListExamples: ['Writing an Email to Tom', 'Filling in Latitudes Application', 'Searching for Housing'], 
        canBeEdited: true,
        winState: 'Enter your daily goal',
        currentTimeInterval: false,
        currentTime : [12,0]
        },


	getters: {
		sessionCategory(state,getter,rootState){
			return state.sessions[rootState.sessionTitleList.sessionNumber] ? state.sessions[rootState.sessionTitleList.sessionNumber].category : rootState.timer.stateOfSession	
		}
	},

	actions:{


		sessionTime({state, rootState}){
		
		let timeWork = rootState.timer.timeWork,
			timeShort = rootState.timer.timeShortBreak,
			timeLong = rootState.timer.timeLongBreak,
			sessionNumber = rootState.timer.sessionNumber,
			sessionMax = (state.pomodoroGoal *2) - 1; //?
				

			for(let i=sessionNumber;i<sessionMax;i++){
				if (i===sessionNumber){
					//add time according to category
					switch(state.sessions[i].category) {
					    case 'Work':
					        state.sessions[i].time[0] = state.currentTime[0] + Math.floor(timeWork / 60 )
					        break;
					    case 'Break':
					        state.sessions[i].time[0] = state.currentTime[0] + timeShort
					        break;
					    case 'Long Break':
					        state.sessions[i].time[0] = state.currentTime[0] + timeLong
					        break; 
					}
				} else {
					//state.sessions[i].time[0] = state.sessions[i-1].time[0] 
				}
				

			}

			// add current time + number of long, short and work breaks in between

		},

		updateTime({commit, state}){
			//Get current time --> get current session --> add times of next sessions onto the timer (for --> if next timer is break add timeBreak, etc.)--> put timestamp on session once it is finished
			


			    let date = moment(new Date()),
				    currentTime = {
					hour: date.hour(),
					minute: date.minute(),
				};


			if(!state.currentTimeInterval || state.currentTime[0] !== currentTime.hour || state.currentTime[1] !== currentTime.minute){
				//Initial commit
				commit('updateTime', currentTime)

				//commit every minute new time
				return state.currentTimeInterval = setInterval(() => {
					commit('updateTime', currentTime)
				}, 60000);
			}	
		},


		showDistractionList({state, commit}){
			// state.toggleLists = true => show sessionTitleList
			if (state.toggleLists){
				commit('showDistractionList')
			}
		},

		showSessionList({state, commit}){
			// state.toggleLists = true => show sessionTitleList
			if (!state.toggleLists){
				commit('showSessionList')
			}
		},

		createSessionList({state, rootState, commit}){

			let numberOfSession = rootState.timer.numberOfCurrentSession,
			// If you start into a break is it state.pomodoroGoal + 1? 
				numberOfSessionsWanted = 0,
				numberOfWorkingSessionsCreated = 1;

				
			if (rootState.timer.stateOfSession === 'shortPause' || rootState.timer.stateOfSession === 'longPause'){
				
				numberOfSessionsWanted = state.pomodoroGoal * 2 + 1;
			
			} else {

				numberOfSessionsWanted = state.pomodoroGoal * 2;

			}

			//If list is empty populate it with default working sessions
			if(state.sessions.length === 0){

				//needs to start populating the list starting from the initial numberOfFirstSession by the group
				//if numberOfFirstSession % 2 == 0 then start with a working sessions, otherwise with a break
				//If numberOfFirstSession is divisible by 7 start with a long break
				//else start with a short break

				for(let i=0; i<numberOfSessionsWanted; i++){
					if(numberOfSession % 2 === 1){
						commit('createWorkSession', numberOfWorkingSessionsCreated)
						numberOfWorkingSessionsCreated++
					} else if (numberOfSession % 8 === 0){
						commit('createLongPause')
					} else {
						commit('createShortPause')
					}


					numberOfSession++
				}

		    } else {
		    	// Load existing list
		    };


		    commit('highlightNextSession', rootState.timer.sessionNumber);

		},

		editTrueFunction({commit, state}, index){
			// focus textfield (setTimeOut used to not block the user interface, to give it enough time to load into the dom)
			setTimeout(function(){
				document.querySelectorAll(".sessionListEdit")[0].focus();
				document.querySelectorAll(".sessionListEdit")[0].placeholder = state.sessions[index].name;
			},0);

			// if previous edit is closed open new one, else close it and then open new one
			if(!state.sessions[state.sessionTitleEdited].edit){

				commit('editTrueFunction', index);
			} else if (state.sessions[state.sessionTitleEdited].edit){
				commit('closeEdit');
				commit('editTrueFunction', index);

			}
			
		},

		editTitle({commit, state}, item){
			// edit if item.target
			if(item.target.value.length > 3 && state.canBeEdited){
				state.canBeEdited = false;
				commit({
	              type: 'editTitle',
	              name: item.target.value,
	 			});
			} else if(state.canBeEdited){
			 	commit('closeEdit');
			}
		},
        
        // Set new pomodoro goal (can't decrease beyond pomodorosDone) --> change sessionlist accordingly 
        changePomodoroGoal({commit, state, rootState}){
          let newNumber = eval(document.getElementById("pomodoroGoal").value),
          	  numberOfSession = state.sessions.length + rootState.timer.numberOfCurrentSession - 2,
          	  numberOfSessionsWanted = numberOfSession + (newNumber - state.pomodoroGoal) * 2,
          	  numberOfWorkingSessionsCreated = state.pomodoroGoal + 1;

            if( newNumber >= state.pomodorosDone && newNumber <= 16 && newNumber !== state.pomodoroGoal){
                // if more add new working sessions with push
          
              	let pomodoroGoalPlus = state.pomodoroGoal + 1,
                	newNumberPlus = newNumber + 1;

                if(newNumber > state.pomodoroGoal){ 

                	for(let i = numberOfSession; i< numberOfSessionsWanted; i++){
					if(numberOfSession % 2 === 1){
						commit('createWorkSession', numberOfWorkingSessionsCreated)
						numberOfWorkingSessionsCreated++
					} else if (numberOfSession % 8 === 0){
						commit('createLongPause')
					} else {
						commit('createShortPause')
					}

					numberOfSession++
					}
				}

				/*
                	// add two things decide dynamically what to add like in create
                	for(let i = pomodoroGoalPlus; i < newNumberPlus; i++){
                   	

						numberOfSession++
						commit('createWorkSession', numberOfWorkingSessionsCreated)
						numberOfWorkingSessionsCreated++


						numberOfSession++
						if (numberOfSession % 8 === 0){
							commit('createLongPause')
						} else {
							commit('createShortPause')
						}
						
                 */
                    
                else {
                // remove sessions from array with splice
                // If session[0].category === shortPause or LongPause --> newNumber - 1?
	                
	                //if(state.sessions[0].category == 'Break' || state.sessions[0].category == 'Long Break') {
	               
	                //  	commit('removeSession', newNumber + 1)
	                //} else {
	                	commit('removeSession', newNumber)
	                //}
            	
               
                   
                }

                 commit('updatePomodoroGoal')

            } else {
                document.getElementById("pomodoroGoal").value = ''+ state.pomodoroGoal +'';
            }

        },

        winStateInput({commit, state}){
        	let input = document.getElementById("winStateInput").value;

        	if (input !== state.winState && input.length > 0){		
        		commit('winStateInput', input)	
        	}
        },




	},
	mutations: {

		/********************** Add/ Remove Session functions *********************/
		createWorkSession(state, sessionNumber){
			state.sessions.push({
						name: 'Working Session',
						category: 'work',
						edit: false,
						active: false,
						time: [0,0,0],
						sessionNumber: sessionNumber,
					})
		},

		createShortPause(state){
			state.sessions.push({
						name: '-----------',
						category: 'Break',
						active: false,
						time: [0,0,0]
					})
		},

		createLongPause(state){
			state.sessions.push({
						name: '----------------',
						category: 'Long Break',
						active: false,
						time: [0,0,0]
					})
		},

		removeSession(state, newNumber){
			state.sessions.splice(newNumber * 2)	
		},


		/********************** Edit functions *********************/
		editTrueFunction(state, index){
			state.sessions[index].edit = true;
			state.sessionTitleEdited = index
		},

		editTitle(state, item){
			state.sessions[state.sessionTitleEdited].name = item.name;
			state.sessions[state.sessionTitleEdited].edit = false;
			setTimeout(function(){
				state.canBeEdited = true
			},0);
		},

		closeEdit(state){
			state.sessions[state.sessionTitleEdited].edit = false;
			setTimeout(function(){
				state.canBeEdited = true
			},0);
		},


		/**********************  highlight functions *********************/

        highlightNextSession(state, sessionNumber){
           state.sessions[sessionNumber].active = true
       },

      	toneDownLastSession(state, sessionNumber){
            state.sessions[sessionNumber - 1].active = false
       },


       /*********************  other functions *********************/


       incrementPomodorosDone(state){
       		state.pomodorosDone++
       },

		updatePomodoroGoal(state){
            state.pomodoroGoal = eval(document.getElementById("pomodoroGoal").value);
       },

       showDistractionList(state){
			state.toggleLists = false
		},

	    showSessionList(state){
			state.toggleLists = true
		},

		winStateInput(state, input){
			state.winState = input
		},

		updateTime(state, currentTime){
			state.currentTime[0] = currentTime.hour
			state.currentTime[1] = currentTime.minute
		},


	}
}