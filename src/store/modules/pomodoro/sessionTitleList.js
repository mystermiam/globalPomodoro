export default {
	namespaced: true,
	state : {
		toggleLists: true,
		sessions: [],
		sessionTitleEdited: 0, 
		pomodorosDone: 1,
        pomodoroGoal: 4,
        toDoListExamples: ['Writing an Email to Tom', 'Filling in Latitudes Application', 'Searching for Housing'], 
        canBeEdited: true,
	},


	actions: {
		toggleList({commit}){
			commit('toggleList')
		},

		createSessionList({state, rootState, commit}){

			let numberOfSessions = state.pomodoroGoal + 1;

			//If list is empty populate it with default working sessions
			if(state.sessions.length === 0){

				let numberOfPauses = 0;
				for(var i=1; i< numberOfSessions; i++){

						commit('createWorkSession')
						if(numberOfPauses == 3){
						commit('createLongPause')
						numberOfPauses = 0;
					    } else {
					    commit('createShortPause')
					    numberOfPauses++
					    }

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
        changePomodoroGoal({commit, state}){
          let newNumber = eval(document.getElementById("pomodoroGoal").value);
            if( newNumber >= state.pomodorosDone && newNumber <= 16 && newNumber !== state.pomodoroGoal){
                // if more add new working sessions with push
                let pomodoroGoalPlus = state.pomodoroGoal + 1,
                	newNumberPlus = newNumber + 1;

                if(newNumber > state.pomodoroGoal){ 

                	// CHANGE EVERYTHING!!!
                	for(let i = pomodoroGoalPlus; i < newNumberPlus; i++){
                   		commit('createWorkSession')
						if(numberOfPauses == 3){
						commit('createLongPause')
						numberOfPauses = 0;
					    } else {
					    commit('createShortPause')
					    numberOfPauses++
					    }
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

		createWorkSession(state){
			state.sessions.push({
						name: 'Working Session',
						category: 'Work',

						edit: false,
						active: false,
					})
		},

		createShortPause(state){
			state.sessions.push({
						name: '-----------',
						category: 'Break',
						active: false,
					})
		},

		createLongPause(state){
			state.sessions.push({
						name: '----------------',
						category: 'Long Break',
						active: false,
					})
		},



		editTrueFunction(state, index){
			state.sessions[index].edit = true;
			state.sessionTitleEdited = index;
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

        highlightNextSession(state, sessionNumber){
           state.sessions[sessionNumber].active = true;
       },

      	toneDownLastSession(state, sessionNumber){
            state.sessions[sessionNumber - 1].active = false;

       },

       incrementPomodorosDone(state){
       		state.pomodorosDone++;
       }
	}
}