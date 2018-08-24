export default {
	namespaced: true,
	state : {
		positionOfContainer: [0,0],
		showDialogueBox: false,
        currentMessage: {
        	'person': 'Discutor',
        	'message': 'Boom'
        },
        dialogues: {
        	'Discutor': [['Discutor', "I'm the mightiest man in the whole universe!"],['Player', 'Sure, sure :p']]  
        }
	},
	getters: {

	},
	actions: {
		getPosition({commit}){
			let positionWindow = document.body.getBoundingClientRect();
            let positionGameScreen = document.getElementById('game-container').getBoundingClientRect();
			console.log( positionWindow.top - positionGameScreen.top ); 

			document.getElementById('dialogueContainer').style.left = ''+ (positionWindow.left - positionGameScreen.left) +'px';
		},

		toggleDialogueBox({commit}){
		   commit('toggleDialogueBox')
		},

		dialogueExample({commit}){
			alert('Hello')
		}



	},
	mutations: {
		toggleDialogueBox(state){
			state.showDialogueBox = !state.showDialogueBox
		},
	}
}