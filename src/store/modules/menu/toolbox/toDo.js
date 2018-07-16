export default {
	namespaced: true,
	state : {
		toDos: [
		{
			name: 'First To Do',
			category: 'not distributed',
			displayed: false,
		},
		{
			name: 'Second To Do',
			category: 'IU',
			displayed: false,
		},
		{
			name: 'Third To Do',
			category: 'I',
			displayed: false,
		},
		{
			name: 'Fourth To Do',
			category: 'U',
			displayed: false,
		},
		{
			name: 'Fifth To Do',
			category: 'NINU',
			displayed: true,
		},
		]
	},
	getters: {

	},
	actions: {

		addToDo({commit}){
			commit('addToDo', document.getElementById('toDoInput').value);

			document.getElementById('toDoInput').value = '';
		}

	},
	mutations: {
		addToDo(state, input){
			state.toDos.push({
				name: input,
				category: 'not distributed'
			})
		}
	}
}