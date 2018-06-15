export default {
	namespaced: true,
	state : {
		sessionTitles: [],
		sessionTitleEdited: 0, 
		pomodorosDone: 1,
        pomodoroGoal: 4,
	},
	getters: {

	},
	actions: {
		createSessionList({state, commit}){
			let numberOfSessions = state.pomodoroGoal;
			
			//If list is empty populate it with default working sessions
			if(state.sessionTitles.length === 0){
				for(var i=1;i<numberOfSessions+1 ;i++){
					state.sessionTitles.push({
						number: i,
						id: 'sessionTitle' + i,
						inputId: 'inputSession' + i,
						name: 'Working Session',
						edit: false,
						active: false,
					})
				}
		    } else {
		    	// Load existing list
		    };
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

		editTitle({commit}, item){
			if(item.target.value.length > 3){
				commit({
	              type: 'editTitle',
	              name: item.target.value,
	 			});
			} else {
			 	commit('editFalseFunction');
				alert("The title that you entered is too short!")
			}
		},


		      // SHOULD BE DONE WITH COMMIT! (work on this)

        // Set new pomodoro goal (can't decrease beyond pomodorosDone) --> change sessionlist accordingly 
        changePomodoroGoal({commit, state}){
          let newNumber = document.getElementById("pomodoroGoal").value;
            if( newNumber >= state.pomodorosDone && newNumber <= 16 && newNumber !== state.pomodoroGoal){
                // if more add new working sessions with push
                let pomodoroGoalPlus = eval(state.pomodoroGoal) + 1,
                	newNumberPlus = eval(newNumber) + 1;

                if(newNumber > state.pomodoroGoal){ 
                	for(let i = pomodoroGoalPlus; i < newNumberPlus; i++){
                   	commit('addSession', i);
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
		},

		closeEdit(state){
			state.sessionTitles[state.sessionTitleEdited].edit = false;
		},

		addSession(state, number){
			 state.sessionTitles.push({
                      number: number,
                      id: 'sessionTitle' + number,
                      inputId: 'inputSession' + number,
                      name: 'Working Session',
                      edit: false,
                      active: false,
                    });
		},

		removeSession(state, newNumber){
			state.sessionTitles.splice(newNumber);
		},

		 updatePomodoroGoal(state){
            state.pomodoroGoal = document.getElementById("pomodoroGoal").value;
       },

         highlightNextSessionTitle(state, session){
           session.sessionTitleNumber.active = true;
       },

      	 toneDownLastSessionTitle(state, session){
            session.previousSessionNumber.active = false;
       },
	}
}