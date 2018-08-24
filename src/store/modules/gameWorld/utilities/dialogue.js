export default {
	namespaced: true,
	state : {
		positionOfContainer: [0,0],
		showDialogueBox: true,
        currentMessage: {
        	'person': 'Tom',
        	'message': 'Boom'
        },
	},
	getters: {

	},
	actions: {
		getPosition({commit}){
			let position = document.getElementById('game-screen').getBoundingClientRect();

			alert(position.bottom)
		},

		toggleDialogueBox({commit}){
		   commit('toggleDialogueBox')
		}

	},
	mutations: {
		toggleDialogueBox(state){
			state.showDialogueBox = !state.showDialogueBox
		},
	}
}