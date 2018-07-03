export default {
	namespaced: true,
	state : {
	
	},
	getters: {

	},
	actions: {
		createModal({commit}, specs){

			/*Vue.notify({
			  group: 'foo',
			  title: 'Important message',
			  text: 'Hello user! This is a notification!'
			}); */


			if(specs[0] === 'small'){

				//settimeout to specs[4] - 

				$('#modalList').append(`<div id="theModal" style='color:${specs[1]}'>${specs[2]}</div>`)
			}
			

		}
	},
	mutations: {

	}
}