export default {
	namespaced: true,
	state : {
		questShown: 'test',
		quests: {
			test: {
				title: 'test quest to test the quest',
				description: 'This is the description of the quest',
				stepsToDo: ['Step 1 goes here', 'Step 2 goes here', 'Step 3 goes here'],
				reward: {
					gold: 10,
					experience: 15,
				},
				active: false,
			}
		},
		activeQuests: [],
	},
	getters: {

	},
	actions: {
		acceptQuest({commit, rootState}){ 
			commit('acceptQuest') 
			commit('loadInterface/closeQuestContainer', '' , {root:true})
		},

	},
	mutations: {
		acceptQuest(state){ state.activeQuests.push(state.questShown) },

	}
}