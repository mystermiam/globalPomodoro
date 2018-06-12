// add todo --> v-for coupled with array / on click push to array /  :check
// edit todo --> add input field --> enter input field --> action: update sessionTitles --> component updates itself   :check
//delete todo's --> css on hover add symbol --> on click of symbol --> remove from list --> reduce sessionsPlanned by one --> update all the other ones (think of {{}} structure)
// each session it produces a session name, you can name it afterwards as well




// highlight current session
// Add timestamp next to ToDO --> 

//features:
// feedback on your progress
// chart on how much you work in relation to everyone else 



export default {
	namespaced: true,
	state : {
		sessionTitles: [{
			name: 'You go!',
			number: 1,
			edit: false
		}],
		sessionsPlanned: 2, // change to 1 when removing sessiontitle example
		editTrue: false,
		sessionTitleEdited: 0,
	},
	getters: {

	},
	actions: {

		addItem({state, rootState, commit}, e){
		
		//If there is no text add session called working session	
		if(e.target.value.length == 0){

		}
		if(e.target.value.length > 3){

			let currentSessionNumber = (rootState.timer.pomodorosDone + state.sessionsPlanned)

			commit({
              type: 'addItem',
              name: e.target.value,
   			  number: currentSessionNumber,
   			  edit: false,
            });

			commit('incrementSessionsPlanned');

			document.getElementById('addToDoTitle').value = '';

		} else {
			alert('The text you entered is too short to be a title :)')
		}

		},

		editTrueFunction({commit}, number){
			commit('editTrueFunction', number);
		},

		editItem({commit}, item){
			commit({
              type: 'editItem',
              name: item.target.value,
 			});
		},

		deleteToDo({commit}, item){
			// Get value from parent (li)
			let number = item.target.parentElement.value;
			commit({
              type: 'deleteToDo',
   			  number: number,
            });

            commit('decrementSessionsPlanned');
		},



	},
	mutations: {
		addItem(state, e){
			state.sessionTitles.push(
				{name: e.name,
				 number: e.number,
				 edit: false,
				});
		},

		incrementSessionsPlanned(state){
			state.sessionsPlanned++;
		},

		decrementSessionsPlanned(state){
			state.sessionsPlanned--;
		},

		editTrueFunction(state, number){
			state.sessionTitles[number-1].edit = true;
			state.sessionTitleEdited = number;
		},

		editItem(state, item){
			state.sessionTitles[state.sessionTitleEdited - 1].name = item.name;
			state.sessionTitles[state.sessionTitleEdited -1].edit = false;
		},

		deleteToDo(state, item){
			//remove sessionTitle from array
			state.sessionTitles.splice(item.number, 1);
		}
	}
}