export default {
	namespaced: true,
	state : {
		sessionTitles: [],
		sessionTitleEdited: 0, 
		pomodorosDone: 2,
        pomodoroGoal: 4,
        toDoListExamples: ['Writing an Email to Tom', 'Filling in Latitudes Application', 'Searching for Housing'], 
        editListHappened: false,
        CanBeEdited: true,
	},
	getters: {

	},
	actions: {
		createSessionList({state, commit}){
			let numberOfSessions = state.pomodoroGoal;
			
			//If list is empty populate it with default working sessions
			if(state.sessionTitles.length === 0){
				for(var i=1;i<numberOfSessions+1 ;i++){
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
				document.querySelectorAll(".sessionListEdit")[0].placeholder = state.sessionTitles[number-1].name;
			},0);

			// if previous edit is closed open new one, else close it and then open new one
			if(!state.sessionTitles[state.sessionTitleEdited].edit){
				commit('editTrueFunction', number);
			} else if (state.sessionTitles[state.sessionTitleEdited].edit){
				commit('closeEdit');
				commit('editTrueFunction', number);
			}
			
		},

		editTitle({commit, state}, item){
			// edit if item.target
			if(item.target.value.length > 3 && state.CanBeEdited){
				state.CanBeEdited = false;
				commit({
	              type: 'editTitle',
	              name: item.target.value,
	 			});
			} else {
			 	commit('editFalseFunction');
			}
		},
        
        // Set new pomodoro goal (can't decrease beyond pomodorosDone) --> change sessionlist accordingly 
        changePomodoroGoal({commit, state}){
          let newNumber = document.getElementById("pomodoroGoal").value;
            if( newNumber >= state.pomodorosDone && newNumber <= 16 && newNumber !== state.pomodoroGoal){
                // if more add new working sessions with push
                let pomodoroGoalPlus = eval(state.pomodoroGoal) + 1,
                	newNumberPlus = eval(newNumber) + 1;

                if(newNumber > state.pomodoroGoal){ 
                	for(let i = pomodoroGoalPlus; i < newNumberPlus; i++){
                   	commit('createSession', i);
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
		createSession(state, number){
			state.sessionTitles.push({
						number: number,
						id: 'sessionTitle' + number,
						inputId: 'inputSession' + number,
						name: 'Working Session',
						edit: false,
						active: false,
					})
		},

		editTrueFunction(state, number){
			state.sessionTitles[number-1].edit = true;
			state.sessionTitleEdited = number - 1;
		},

		editFalseFunction(state){
			state.sessionTitles[state.sessionTitleEdited].edit = false;
		},

		editTitle(state, item){
			state.sessionTitles[state.sessionTitleEdited].name = item.name;
			state.sessionTitles[state.sessionTitleEdited].edit = false;
			state.CanBeEdited = true;
		},

		closeEdit(state){
			state.sessionTitles[state.sessionTitleEdited].edit = false;
		},

		removeSession(state, newNumber){
			state.sessionTitles.splice(newNumber);
		},

		updatePomodoroGoal(state){
            state.pomodoroGoal = document.getElementById("pomodoroGoal").value;
       },

        highlightNextSessionTitle(state){
           state.sessionTitles[state.pomodorosDone - 1].active = true;
       },

      	toneDownLastSessionTitle(state){
            state.sessionTitles[state.pomodorosDone - 2].active = false;
       },

       incrementPomodorosDone(state){
       		state.pomodorosDone++;
       }
	}
}