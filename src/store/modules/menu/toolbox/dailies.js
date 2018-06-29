export default {
	namespaced: true,
	state : {
		dailies: [{
			name: 'Meditation',
			category: 'Awareness',
			timesCompleted: 5,
			doneToday: false,
		}],
		dailyParameters: [1,2], //first is current dailies, second is max dailies


		// Migrate values eventually, good for testing
		user: {
			experience: 0,
			gold: 0,
		}
	},

	actions: {
		addDaily({commit, state}){
			if(state.dailyParameters[0] < state.dailyParameters[1] && document.getElementById('dailyTitle').value > 4){

				let newDaily = {
					name: document.getElementById('dailyTitle').value,
					category: document.getElementById('categoryName').value
				}

				commit('addDaily', newDaily)

				document.getElementById('dailyTitle').value = '';
				document.getElementById('categoryName').value = '';


			} else {
				alert('You have already enough dailies for now :)')
			}
		},


		dailyDone({commit}, index){
			commit('dailyDone', index)

			//let Daily fade out and make it disabled
		},

		resetDay({state, commit}){
			for(let i=0;i<state.dailies.length;i++){
				if(state.dailies[i].doneToday){	
					commit('resetDay', i)
				}
			}
		}

	},
	mutations: {
		addDaily(state, newDaily){
			state.dailies.push({
				name: newDaily.name,
				category: newDaily.category,
				timesCompleted: 1,
				doneToday: false,
			})

			//Increase DailyCounter
			state.dailyParameters[0]++

		},

		dailyDone(state, index){
			state.dailies[index].timesCompleted++
			state.dailies[index].doneToday = true
			state.user.experience += 5
			state.user.gold += 3
		},

		resetDay(state, i){
			state.dailies[i].doneToday = false
		}
	}
}