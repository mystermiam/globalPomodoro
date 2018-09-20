// Battle plan: 
// Create a basic example of a quest
// quest setup in conversation? 
// accept quest - quest should be added to a questlog
// conversation starts at a different point - ask if the person has finished the quest
// if yes - ask the user two questions 
// if he has answered give a thank you response of the questgiver - maybe teach the user something new about the video just watched
// give rewards to the player in the form of gold, experience
// play a success sound 
// Change conversation to different point again

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
			},
			exercise: {
				title: 'Do 5 push ups',
				description: 'Exercise is great for increasing your energy levels during the day!',
				stepsToDo: ['Get on the floor', 'Do 5 push ups', 'Celebrate that you did 5 push ups'],
				reward: {
					experience: 5,
				},
				active:false,
			}
		},
		activeQuests: [],
	},
	getters: {

	},
	actions: {
		// Called from 
		removeActiveQuest({commit, state}, questName){ 
			for(let i=0;i<state.activeQuests.length;i++){
				if(state.activeQuests[i] == questName){
					return commit('removeActiveQuest', i) 
				} 
			}
			
			console.log("Error: couldn't find name of active quest in Array!")
		},

		openActiveQuest({commit, rootState}, questName){
			commit('loadInterface/changeQuestContainerDisplay', 'activeQuest', {root:true})
		},

		acceptQuest({commit, rootState}){ 
			commit('acceptQuest') 
			commit('loadInterface/closeQuestContainer', '' , {root:true})
		},

	},
	mutations: {
		removeActiveQuest(state, index){ state.activeQuests.splice(index, 1) },

		acceptQuest(state){ state.activeQuests.push(state.questShown) },
	}
}