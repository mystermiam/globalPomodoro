import timer from '@/store/modules/pomodoro/timer'

export default {
	namespaced: true,
	state : {
		room1: [1500,300, false],
		room2: [1500,300, false],
		room3: [2400, 420, false],
	},
	getters: {

	},
	actions: {
		flipCard() {
			this.classList.toggle('flip');
		},

		
	},
	mutations: {
		
	}
}