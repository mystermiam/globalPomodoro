// https://gamedevacademy.org/create-a-dialog-modal-plugin-in-phaser-3-part-1/
import { Grow } from '../index'

export default {
	namespaced: true,
	state : {
		positionOfGameContainer: [0,0],
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
		startDialogue({commit,dispatch}){
			//Get position
            // Calculate width
            let windowWidth = window.innerWidth;
            let gameWidth = Grow.config.width;

            //Get offset of game Container

            
            let positionUpperLeftCornerX = (windowWidth-gameWidth) / 2;
            let positionUpperLeftCornerY = document.getElementById('game-container').offsetTop;  

            if (positionUpperLeftCornerX < 0){
            	positionUpperLeftCornerX = 0;
            } 

            commit('getPosition', [positionUpperLeftCornerX,positionUpperLeftCornerY])
            
            dispatch('toggleDialogueBox');
		},

		setPosition({state, dispatch}){
			let elementHeight = document.getElementById('dialogueContainer').offsetHeight;
			// I don't know where the 16px come from, but shalalala
			document.getElementById('dialogueContainer').style.top = (state.positionOfGameContainer[1] + Grow.config.height - elementHeight + 16) + 'px' ;
			document.getElementById('dialogueContainer').style.left = state.positionOfGameContainer[0] + 'px';
		},

		toggleDialogueBox({commit, dispatch}){
		   commit('toggleDialogueBox')

		   // Load after the box is shown, so that one can get the width of the box
		   setTimeout(function(){ dispatch('setPosition'); }, 0);
		},



	},
	mutations: {
		toggleDialogueBox(state){
			state.showDialogueBox = !state.showDialogueBox;
		},

		getPosition(state, coordinates){
			state.positionOfGameContainer = [coordinates[0], coordinates[1]]
		}
	}
}