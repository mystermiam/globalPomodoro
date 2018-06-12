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
		    	// List creates itself
		    };
		},

		editTrueFunction({commit, state}, number){
			// focus textfield 


			//alert(document.getElementById('sessionTitleList').childNodes[0].childNodes[number-1].childNodes[0].tagName)
			//document.getElementById('sessionTitleList').childNodes[number-1].focus();


			// change text inside to variable


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