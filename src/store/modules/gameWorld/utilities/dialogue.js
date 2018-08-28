// Battle plan: 
// Load first message with the name of the person -- dialogues --> currentMessage
// When player is in dialogue & space is pressed 
// Move to next point in conversation
// If conversation is over toggle box & make player move

import { Grow } from './../index'

export default {
	namespaced: true,
	state : {
		positionOfGameContainer: [0,0],
		showDialogueBox: false,
        currentMessage: {
        	'number': 0,
        	'person': '',
        	'message': ''
        },
        dialogues: {
        	'Discutor': [['Discutor', "I'm the mightiest man in the whole universe!"],['Player', 'Sure, sure :p']]  
        }
	},
	getters: {

	},
	actions: {
		startDialogue({state,commit,dispatch}, person){
			
			let player = Grow.scene.scenes[2].player;

            // Make player unable to move 
            player.isAllowedToMove = false;
            player.inDialogue = true;

            // Set initial message
            commit('setMessage', [state.currentMessage.number, person])

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

		continueDialogue(){
			alert("!")
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
		},

		setMessage(state, obj){ 
         state.currentMessage.person = state.dialogues[obj[1]][state.currentMessage.number][0];
         state.currentMessage.message = state.dialogues[obj[1]][state.currentMessage.number][1];
		}


	}
}