export default {
	namespaced: true,
	state : {
		toggleLists: true,
		sessions: [],
		sessionTitleEdited: 0, 
		pomodorosDoneSinceBreak: 0, // used to count until 4 then big break
		pomodorosDone: 1,
        pomodoroGoal: 4,
        toDoListExamples: ['Writing an Email to Tom', 'Filling in Latitudes Application', 'Searching for Housing'], 
        canBeEdited: true,
	},
	getters: {
		sessionTitleDisplay(state){
			// Still brings up two errors in the beginning? how to load later on--> maybe fetch? 
			//return state.sessions[state.pomodorosDone - 1].name;	
		},
	},
	actions: {
		toggleList({commit}){
			commit('toggleList')
		},

		createSessionList({state, commit}){
			let numberOfSessions = state.pomodoroGoal + 1;

			//If list is empty populate it with default working sessions
			if(state.sessions.length === 0){
				for(var i=1; i<numberOfSessions; i++){
						commit('createSession', i);
				}
		    } else {
		    	// Load existing list
		    };

		    commit('highlightNextSessionTitle');

		},

		editTrueFunction({commit, state}, number){
			// focus textfield (setTimeOut used to not block the user interface, to give it enough time to load into the dom)
			setTimeout(function(){
				document.querySelectorAll(".sessionListEdit")[0].focus();
				document.querySelectorAll(".sessionListEdit")[0].placeholder = state.sessions[number-1].name;
			},0);

			// if previous edit is closed open new one, else close it and then open new one
			if(!state.sessions[state.sessionTitleEdited].edit){
				commit('editTrueFunction', number);
			} else if (state.sessions[state.sessionTitleEdited].edit){
				commit('closeEdit');
				commit('editTrueFunction', number);
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
        changePomodoroGoal({commit, state}){
          let newNumber = eval(document.getElementById("pomodoroGoal").value);
            if( newNumber >= state.pomodorosDone && newNumber <= 16 && newNumber !== state.pomodoroGoal){
                // if more add new working sessions with push
                let pomodoroGoalPlus = state.pomodoroGoal + 1,
                	newNumberPlus = newNumber + 1;

                if(newNumber > state.pomodoroGoal){ 
                	for(let i = pomodoroGoalPlus; i < newNumberPlus; i++){
                   	commit('createSession', i)
                    }
                } else {
                // remove sessions from array with splice
                  	commit('removeSession', newNumber);
                }
                   commit('updatePomodoroGoal')
          
            } else {
                document.getElementById("pomodoroGoal").value = ''+ state.pomodoroGoal +'';
            }

        },




	},
	mutations: {
		toggleList(state){
			state.toggleLists = !state.toggleLists
		},

		createSession(state, number){
			state.sessions.push({
						number: number,
						id: 'sessionTitle' + number,
						inputId: 'inputSession' + number,
						name: 'Working Session',
						edit: false,
						active: false,
					})
		},

		editTrueFunction(state, number){
			state.sessions[number-1].edit = true;
			state.sessionTitleEdited = number - 1;
		},

		editTitle(state, item){
			state.sessions[state.sessionTitleEdited].name = item.name;
			state.sessions[state.sessionTitleEdited].edit = false;
			setTimeout(function(){
				state.canBeEdited = true;
			},0);
		},

		closeEdit(state){
			state.sessions[state.sessionTitleEdited].edit = false;
			setTimeout(function(){
				state.canBeEdited = true;
			},0);
		},

		removeSession(state, newNumber){
			state.sessions.splice(newNumber);
		},

		updatePomodoroGoal(state){
            state.pomodoroGoal = eval(document.getElementById("pomodoroGoal").value);
       },

        highlightNextSessionTitle(state){
           state.sessions[state.pomodorosDone - 1].active = true;
       },

      	toneDownLastSessionTitle(state){
            state.sessions[state.pomodorosDone - 2].active = false;
       },

       incrementPomodorosDone(state){
       		state.pomodorosDone++;
       }
	}
}