export default {
	namespaced: true,
	state : {
		escapePressed: false,
	},
	getters: {

	},
	actions: {
		keymonitor({commit}, event){
		   //console.log(event.key)
		   
		   commit('keymonitor')

		}
	},
	mutations: {
		keymonitor(state){
			state.escapePressed = !state.escapePressed
		}
	}
}