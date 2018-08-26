// https://gamedevacademy.org/create-a-dialog-modal-plugin-in-phaser-3-part-1/

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
			let windowHeight = window.innerWidth;
            let windowWidth = window.innerHeight;
/*       
            // Call to gamescene here 
            const gameHeight = this.scene.sys.game.config.height;
            const gameWidth = this.scene.sys.game.config.width;

/*
            // Put these into scene container, which one?! must have a general approach, maybe the index?
			  // Gets the width of the game (based on the scene)
			  _getGameWidth: function () {
			    return this.scene.sys.game.config.width;
			  },

			  // Gets the height of the game (based on the scene)
			  _getGameHeight: function () {
			    return this.scene.sys.game.config.height;
			  },
*/        
            console.log(windowHeight, gameHeight, windowWidth, gameWidth)
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