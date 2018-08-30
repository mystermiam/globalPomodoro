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
        	'kindOfMessage': 'normal',
        	'number': 0,
        	'person': '',
        	'message': '',
        	'optionOne': '',
        	'optionTwo': '',
        	'optionSelected': 1,
        },
        dialogues: {
        	'Discutor': [['Discutor', "I'm the mightiest man in the whole universe!"],['Player', 'Sure, sure :p'],['option', ['Jump on his head', '1'], ['Leave him behind', 'endConversation']]],
        }
	},
	getters: {

	},
	actions: {
		loadDialogue({state,commit,dispatch}){
			let player = Grow.scene.scenes[2].player;

			console.log('dialogue with ' + player.characterInteraction[1] + ' [' + state.currentMessage.number + ']')

            if(state.dialogues[player.characterInteraction[1]][state.currentMessage.number][0] === 'option'){ 
            	commit('setCurrentMessageType', 'option')
            	dispatch('loadOption', player.characterInteraction[1])
            
            } else {
			// START MESSAGE
			commit('setCurrentMessageType', 'normal')

			if(state.currentMessage.number === 0){
            // Make player unable to move 
            player.isAllowedToMove = false;

            //Stop movement animation (improve it with putting it into resting position)
            player.anims.stop();

            // Set initial message if player.characterInteraction[1] is unequal to 'option'
            commit('setMessage', [state.currentMessage.number, player.characterInteraction[1]])
            
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

            setTimeout(function(){dispatch('toggleDialogueBox'); player.inAction = false; commit('incrementMessageNumber')}, 100);
		

		} else if (state.currentMessage.number >= 1){
			// Call function on spacebar click if player is in dialogue
			
			//If message is smaller than the length of the dialogue of the person, display next message
			
            if(state.currentMessage.number < state.dialogues[player.characterInteraction[1]].length){

            //if the title of the person speaking is 'option' create option method
            if(state.dialogues[player.characterInteraction[1]][state.currentMessage.number][0] === 'option'){
			
			commit('createOption', [state.currentMessage.number, player.characterInteraction[1]])

            // else commit normal message
            } else { 

            commit('setMessage', [state.currentMessage.number, player.characterInteraction[1]]) 

        	}

       	    //Increase the currentMessage number by one
       	    commit('incrementMessageNumber')

        	} else {
			// Reset message if currentMessage is equal to message length
			 commit('resetMessageNumber')
			// Make player move again 
            player.isAllowedToMove = true;

            player.characterInteraction = [];
			// Toggle dialoguebox
            setTimeout(function(){dispatch('toggleDialogueBox'); player.inAction = false; }, 0);
        	}
		}

		}},



		loadOption({commit}, characterName){
			// Load available options
			commit('setOptions', characterName)


			//if people are pressing down key and option is 1 choose option 2  (more dynamic?)

			// if upkey is pressed and option 2 is chosen highlight option 1 
            
			
		},	

		setPosition({state, dispatch}){
			let elementHeight = document.getElementById('dialogueContainer').offsetHeight;
			// I don't know where the 16px come from, but shalalala, the calculation must go wrong somewhere
			document.getElementById('dialogueContainer').style.top = (state.positionOfGameContainer[1] + Grow.config.height - elementHeight + 45) + 'px' ;
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

		setCurrentMessageType(state, type){
        	state.currentMessage.kindOfMessage = type
        },

		setMessage(state, obj){ 
         state.currentMessage.person = state.dialogues[obj[1]][state.currentMessage.number][0];
         state.currentMessage.message = state.dialogues[obj[1]][state.currentMessage.number][1];
		},

		setOptions(state, characterName){ 
         state.currentMessage.optionOne = state.dialogues[characterName][state.currentMessage.number][1][0];
         state.currentMessage.optionTwo = state.dialogues[characterName][state.currentMessage.number][2][0];
		},

		incrementMessageNumber(state){
			state.currentMessage.number++;
		},

		resetMessageNumber(state){
			state.currentMessage.number = 0;
		},


	}
}