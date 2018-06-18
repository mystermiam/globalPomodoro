// add todo --> v-for coupled with array / on click push to array /  :check
// edit todo --> add input field --> enter input field --> action: update distractions --> component updates itself   :check
//delete todo's --> css on hover add symbol --> on click of symbol --> remove from list --> reduce ToDos by one --> update all the other ones (think of {{}} structure)
// each session it produces a session name, you can name it afterwards as well




// highlight current session
// Add timestamp next to ToDO --> 

//features:
// feedback on your progress
// chart on how much you work in relation to everyone else 



export default {
	namespaced: true,
	state : {
		distractions: [{
			name: 'You go!',
			number: 1,
			edit: false
		}],
		toDos: 2, // change to 1 when removing sessiontitle example
		editTrue: false,
		distractionEdited: 0,
	},
	getters: {

	},
	actions: {

		addItem({state, rootState, commit}, e){
		
		if(e.target.value.length > 3){


			commit({
              type: 'addItem',
              name: e.target.value,
   			  number: state.toDos,
   			  edit: false,
            });

			commit('incrementToDos');

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

            commit('decrementToDos');
     
			for(let i=0;i<number;i++){
				
				commit({
					type: 'updateToDoNumbers',
					number: i,
					});

			}



		},



	},
	mutations: {
		addItem(state, e){
			state.distractions.push(
				{name: e.name,
				 number: e.number,
				 edit: false,
				});
		},

		incrementToDos(state){
			state.toDos++;
		},

		decrementToDos(state){
			state.toDos--;
		},

		editTrueFunction(state, number){
			state.distractions[number-1].edit = true;
			state.distractionEdited = number;
		},

		editItem(state, item){
			state.distractions[state.distractionEdited - 1].name = item.name;
			state.distractions[state.distractionEdited -1].edit = false;
		},

		deleteToDo(state, item){
			//remove sessionTitle from array
			state.distractions.splice(item.number, 1);
		},

		updateToDoNumbers(state, i){
			//update all numbers that are lower than the one deleted;
			alert(i)
		},
	}
}