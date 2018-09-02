// Try to put movement keys here

export default {
	namespaced: true,
	state : {
		sceneActive: 0,
	},
	getters: {

	},
	actions: {
		changeActiveScene({commit}, number){
			commit('changeActiveScene', number)
		}
	},
	mutations: {
		changeActiveScene(state, number){
			state.sceneActive = number
		}
	}
}