// add todo --> v-for coupled with array / on click push to array /  :check
// edit todo --> add input field --> enter input field --> action: update distractions --> component updates itself   :check
//delete todo's --> css on hover add symbol --> on click of symbol --> remove from list --> reduce ToDos by one --> update all the other ones (think of {{}} structure)
// each session it produces a session name, you can name it afterwards as well
// highlight current session :check


// Edit todos


// Add timestamp next to ToDO --> 

//features:
// feedback on your progress
// chart on how much you work in relation to everyone else 



export default {
	namespaced: true,
	state : {
		showDistractionList: false,
		distractions: [],
		canBeEdited: true,
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
   			  edit: false,
            });

			document.getElementById('addToDoTitle').value = '';

		} else {
			alert('The text you entered is too short to be a title :)')
		}
		},

		editTrueFunction({commit, state}, index){
			// if previous edit is closed open new one, else close it and then open new one
			if(!state.distractions[state.distractionEdited].edit){
				commit('editTrueFunction', index);
			} else if (state.distractions[state.distractionEdited].edit){
				commit('closeEdit');
				commit('editTrueFunction', index);
			}

			setTimeout(function(){
				document.querySelectorAll(".toDoListEdit")[0].focus();
				document.querySelectorAll(".toDoListEdit")[0].placeholder = state.distractions[index].name;
			},0);
		},

		editItem({commit, state}, item){
			if(item.target.value.length > 3 && state.canBeEdited){
				state.canBeEdited = false;
				commit({
	              type: 'editItem',
	              name: item.target.value,
	 			});
			} else if(state.canBeEdited){
			 	commit('closeEdit');
			}
		},

		deleteToDo({commit}, index){
			// Get value from parent (li)

			commit({
              type: 'deleteToDo',
   			  index: index,
            });
     
			for(let i=0;i<index;i++){
				
				commit({
					type: 'updateToDoNumbers',
					number: index,
					});

			}



		},



	},
	mutations: {
		addItem(state, e){
			state.distractions.push(
				{name: e.name,
				 edit: false,
				});
		},

		editTrueFunction(state, index){
			state.distractions[index].edit = true;
			state.distractionEdited = index;
		},

		closeEdit(state){
			state.distractions[state.distractionEdited].edit = false;
			setTimeout(function(){
				state.canBeEdited = true;
			},0);
		},

		editItem(state, item){
			state.distractions[state.distractionEdited].name = item.name;
			state.distractions[state.distractionEdited].edit = false;
			setTimeout(function(){
				state.canBeEdited = true;
			},0);
			
		},

		deleteToDo(state, item){
			//remove sessionTitle from array
			state.distractions.splice(item.number, 1);
		},
	}
}