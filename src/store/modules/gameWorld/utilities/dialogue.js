export default {
	namespaced: true,
	state : {
		showDialogueBox: false,
	},
	getters: {

	},
	actions: {
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