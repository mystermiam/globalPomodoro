export default {
	namespaced: true,
	state : {
		sessionTitles: [],
		sessionTitleEdited: 0, 
	},
	getters: {

	},
	actions: {
		createSessionList({state, rootState, commit}){
			let numberOfSessions = rootState.timer.pomodoroGoal;

			//If list is empty populate it with default working sessions
			if(state.sessionTitles.length === 0){
				for(var i=0;i<numberOfSessions;i++){
					state.sessionTitles.push({
						number: i+1,
						name: 'Working Session',
						edit: false,
						active: false,
					})
				}
		    } else {
		    	// List creates itself
		    };
		},

		editTrueFunction({commit, state}, number){
			// change placeholder to variable

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
				alert("The title that you entered is too short!")
			}
		},


	},
	mutations: {
		editTrueFunction(state, number){
			state.sessionTitles[number-1].edit = true;
			state.sessionTitleEdited = number - 1;
		},

		editTitle(state, item){
			state.sessionTitles[state.sessionTitleEdited].name = item.name;
			state.sessionTitles[state.sessionTitleEdited].edit = false;
		},

		closeEdit(state){
			state.sessionTitles[state.sessionTitleEdited].edit = false;
		}
	}
}