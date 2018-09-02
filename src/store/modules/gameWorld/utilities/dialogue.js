// Battle plan: 
// If link is incorrect, player is locked
// going from option to another option does not work 

import { Grow } from './../index'

export default {
	namespaced: true,
	state : {
		showDialogueBox: false,
        currentMessage: {
        	'kindOfMessage': 'normal',
        	'number': 0,
        	'person': '',
        	'message': '',
        	'options': [],
        	'optionSelected': 0,
        },
        dialogues: {
        	'ItemFound':[['Rare artifact', 'You found a super rare artifact that nobody has ever found before you! Use i to open up itembox and use it']],
        	'Discutor': [['Discutor', "I'm the mightiest man in the whole universe!"],['Player', 'Sure, sure :p'],['option', ['Jump on his head', 1], ['Leave him behind', 'endConversation']]],
        	'Thorsten': [['Thorsten', 'Hey there new one! Would you like to listen to some French Rap?'],['option', ['Yeah, I would love to listen to some music', 'https://music.youtube.com/watch?v=U_OFNlaeTP0&list=RDEMrVtQ-lZ7fMpTG2noSdOlEA'], ["I'm searching for something else ;) ", 'endConversation']]]
        }
	},
	getters: {

	},
	actions: {
		getPosition({commit}){
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

		},

		addLinkToCharacter({commit, dispatch, rootState}){
			let link = document.getElementById('inputToAddLink').value;
			let scene = Grow.scene.scenes[rootState.player.sceneActive];
			let characterNumber = scene.player.characterInteraction[1]
			commit('addLinkToCharacter', [link, characterNumber])
			commit('changeMessageNumber', 1)
			commit('setCurrentMessageType', 'option')
			dispatch('loadDialogue')
		},

		addNPC({commit}, characterNumber){
			commit('addNPC', characterNumber)
		},

		loadDialogue({state,commit,dispatch, rootState}){
			let scene = Grow.scene.scenes[rootState.player.sceneActive];
			let player = scene.player;

			//console.log('dialogue with ' + player.characterInteraction[1] + ' [' + state.currentMessage.number + ']')

            if(state.dialogues[player.characterInteraction[1]][state.currentMessage.number][0] === 'option'){ 
            	commit('setCurrentMessageType', 'option')
            	dispatch('loadOption', player.characterInteraction[1])
            
            } else {
			// START MESSAGE
			commit('setCurrentMessageType', 'normal')

			if(state.currentMessage.number === 0){

			// Hide object container
			if(rootState.loadInterface.showObjectContainer){
				commit('loadInterface/hideObjectContainer', '', {root:true})
			}

            // Make player unable to move 
            player.isAllowedToMove = false;

            //Stop movement animation (improve it with putting it into resting position)
            player.anims.stop();

            commit('setMessage', [state.currentMessage.number, player.characterInteraction[1]])
            
			dispatch('loadInterface/getPosition', '', {root:true})

            setTimeout(function(){dispatch('toggleDialogueBox'); player.inAction = false; commit('incrementMessageNumber')}, 100);
		

		} else if (state.currentMessage.number >= 1){
			// Call function on spacebar click if player is in dialogue
			
			//If message is smaller than the length of the dialogue of the person, display next message
            if(state.currentMessage.number < state.dialogues[player.characterInteraction[1]].length){
           
            commit('setMessage', [state.currentMessage.number, player.characterInteraction[1]]) 

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



		loadOption({state, commit, rootState}, characterName){
			// Load available options
			for (let i=1; i<state.dialogues[characterName][state.currentMessage.number].length; i++){
				commit('setOption', [characterName, i])
			}
			let scene = Grow.scene.scenes[rootState.player.sceneActive];
			scene.player.characterInteraction[0] = 'option'	
		},	

		selectDifferentOption({commit}, number){
			if(number === 0){
				commit('selectFirstOption')
			} else if (number === 1){
				commit('selectDifferentOption', 1)
			} else if (number === -1){
				commit('selectDifferentOption', -1)
			} else {
				commit('selectLastOption', number)
			}
		},

		takeOption({state, commit, dispatch, rootState}, option){
			let scene = Grow.scene.scenes[rootState.player.sceneActive];
			// if options[optionSelected] is a number set message type back to normal and set currentMessage.number to that number
			if(typeof state.currentMessage.options[state.currentMessage.optionSelected][1] === 'number'){
                
                // This one causes lots of mistakes
				commit('changeMessageNumber', state.currentMessage.options[state.currentMessage.optionSelected][1])
                
                scene.player.characterInteraction[0] = 'dialogue'	

				dispatch('loadDialogue')
				
				// if options[optionSelected] is a string call that action
			} else if (typeof state.currentMessage.options[state.currentMessage.optionSelected][1] === 'string'){
				// If it is music open new tab to play music 
				let musicReg = new RegExp("^(http|https)://", "i");
				let matchingLinks = state.currentMessage.options[state.currentMessage.optionSelected][1].match(musicReg);
		
				if (matchingLinks){
					window.open(state.currentMessage.options[state.currentMessage.optionSelected][1]);
					
					// Reset message if currentMessage is equal to message length
			 		commit('resetMessageNumber')
				// Make player move again 
            		scene.player.isAllowedToMove = true;

            		scene.player.characterInteraction = [];
				// Toggle dialoguebox
            		setTimeout(function(){dispatch('toggleDialogueBox'); scene.player.inAction = false; }, 0);

				} 

				// Add Link
				if(state.currentMessage.options[state.currentMessage.optionSelected][1] === 'addLink'){
					commit('setCurrentMessageType', 'addLink')
				}


			    // End conversation
			    if (state.currentMessage.options[state.currentMessage.optionSelected][1] === 'endConversation'){
                 // Reset message if currentMessage is equal to message length
			 		commit('resetMessageNumber')
				// Make player move again 
            		scene.player.isAllowedToMove = true;

            		scene.player.characterInteraction = [];
				// Toggle dialoguebox
            		setTimeout(function(){dispatch('toggleDialogueBox'); scene.player.inAction = false; }, 0);

            	
			    }
			   
			}
	
            
			// clear out options array for further use
			state.currentMessage.options = [];
			commit('resetOptionSelected')

		},

		setPosition({rootState}){
			let elementHeight = document.getElementById('dialogueContainer').offsetHeight;
			// I don't know where the 16px come from, but shalalala, the calculation must go wrong somewhere
			document.getElementById('dialogueContainer').style.top = (rootState.loadInterface.positionOfGameContainer[1] + Grow.config.height - elementHeight + 45) + 'px' ;
			document.getElementById('dialogueContainer').style.left = rootState.loadInterface.positionOfGameContainer[0] + 'px';
		},

		toggleDialogueBox({commit, dispatch}){
		   commit('toggleDialogueBox')

		   // Load after the box is shown, so that one can get the width of the box
		   setTimeout(function(){ dispatch('setPosition'); }, 0);
		},


	},
	mutations: {
		addLinkToCharacter(state, obj){
			state.dialogues[obj[1]][1][1] = ['go to link', obj[0]]
		},

		addNPC(state, characterNumber){
			state.dialogues[characterNumber] = [['Your NPC', 'Hey there my friend!'],['option',['You can add a link here', 'addLink'],['further options', 2],['go away', 'endConversation']],['option',['pick Item up', 'pickUp'],['follow me', 'follow'],['go back', 1]]]
		},

		toggleDialogueBox(state){
			state.showDialogueBox = !state.showDialogueBox;
		},

		setCurrentMessageType(state, type){
        	state.currentMessage.kindOfMessage = type
        },

		setMessage(state, obj){ 
         state.currentMessage.person = state.dialogues[obj[1]][state.currentMessage.number][0];
         state.currentMessage.message = state.dialogues[obj[1]][state.currentMessage.number][1];
		},

		incrementMessageNumber(state){
			state.currentMessage.number++;
		},

		resetMessageNumber(state){
			state.currentMessage.number = 0;
		},

		setOption(state, obj){ 
            state.currentMessage.options.push(state.dialogues[obj[0]][state.currentMessage.number][obj[1]])
		},

		selectDifferentOption(state, number){
            state.currentMessage.optionSelected += number
		},

		selectFirstOption(state){
			state.currentMessage.optionSelected = 0
		},

		selectLastOption(state, number){
			state.currentMessage.optionSelected = number
		},

		resetOptionSelected(state){
			state.currentMessage.optionSelected = 0
		},

		changeMessageNumber(state, number){
			state.currentMessage.number = number
		},
	}
}