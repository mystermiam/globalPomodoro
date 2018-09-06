// Battle plan: 

// Empty dialogue on scene change and also in general ;)
// If link is incorrect, player is locked
// going from option to another option does not work 

import { Grow } from './../index'

export default {
	namespaced: true,
	state : {
        currentMessage: {
        	'kindOfMessage': 'normal',
        	'number': 0,
        	'person': '',
        	'message': '',
        	'options': [],
        	'optionSelected': 0,
        },
        dialogues: {},

	},
	getters: {

	},
	actions: {
		// Called in dialogue function of person / Object [SceneActive, Name, newStartingPoint]
		changeDialogueStartsAt({commit}, obj){ commit('changeDialogueStartsAt', obj)},

		// Called in character.js from this[characterName].dialogue
        addDialogue({commit}, obj){
        	commit('addDialogue', obj)
        },

        setCurrentMessageType({commit}, type){
        	commit('setCurrentMessageType', type)
        },

        // Called from createNPCs dialogue1
		addLinkToCharacter({commit, dispatch, rootState}){
			let link = document.getElementById('inputToAddLink').value;
			let scene = Grow.scene.scenes[rootState.player.sceneActive];
			let characterNumber = scene.player.characterInteraction[1]

			commit('addLinkToCharacter', [link, characterNumber])
			commit('changeMessageNumber', 1)
			commit('setCurrentMessageType', 'option')
			dispatch('loadDialogue')
		},

		loadDialogue({state,commit,dispatch,rootState}){
			let scene = Grow.scene.scenes[rootState.player.sceneActive];
			let player = scene.player;
			let nameOfCharacter = player.characterInteraction[1];
			let messageNumber = state.currentMessage.number;

            if(messageNumber >= state.dialogues[nameOfCharacter].length){
			// no option
			dispatch('endConversation')
          


			// If 'name' is option
			} else if(state.dialogues[nameOfCharacter][messageNumber][0] === 'option'){ 
            	commit('setCurrentMessageType', 'option')

            	return dispatch('loadOption', nameOfCharacter)
      



            // otherwise load a normal message
            } else {
			commit('setCurrentMessageType', 'normal')

			// If dialogue box is not yet loaded
			if(!rootState.loadInterface.showDialogueBox){

			// Hide object container
			if(rootState.loadInterface.showObjectContainer){
				commit('loadInterface/hideObjectContainer', '', {root:true})
			}



            // Make player unable to move 
            player.isAllowedToMove = false;

            //Stop movement animation (improve it with putting it into resting position)
            player.anims.stop();
            console.log(player.scene[nameOfCharacter])
            commit('changeMessageNumber', player.scene[nameOfCharacter].dialogueStartsAt)
            commit('setMessage', [messageNumber, nameOfCharacter])


            
			dispatch('loadInterface/getPosition', '', {root:true})

            setTimeout(function(){dispatch('loadInterface/toggleDialogueBox', '', {root:true}); player.inAction = false; commit('incrementMessageNumber')}, 100);
		

		} else {
			// Call function on spacebar click if player is in dialogue
           
            commit('setMessage', [messageNumber, nameOfCharacter]) 

            scene.player.characterInteraction[0] = 'dialogue';

       	    //Increase the currentMessage number by one
       	    commit('incrementMessageNumber')

		}

		}},

		endConversation({commit, dispatch, rootState}){
			let player = Grow.scene.scenes[rootState.player.sceneActive].player;
			// End conversation
			// Reset message if currentMessage is equal to message length
			commit('resetMessageNumber')
			// Make player move again 
            player.isAllowedToMove = true;

            player.characterInteraction = [];

			// Toggle dialoguebox
            setTimeout(function(){dispatch('loadInterface/toggleDialogueBox', '', {root:true}); player.inAction = false; }, 0);
		},

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





		// Called in updateOptions in Character.js
		takeOption({state, commit, dispatch, rootState}){
			let scene = Grow.scene.scenes[rootState.player.sceneActive];
			let optionSelected = state.currentMessage.options[state.currentMessage.optionSelected][1];
            let options = state.currentMessage.options;


            // go through optionSelected one by one and execute its functions
            for(let i=0;i<optionSelected.length;i++){

				// if optionSelected is a number set message type back to normal and set currentMessage.number to that number
				if(typeof optionSelected[i] === 'number'){
	                
                    let number = optionSelected[i];

                    state.currentMessage.options = [];
		            commit('resetOptionSelected') 

	                // Changes message to number in option [Number needs to be in first place!!]
					commit('changeMessageNumber', number)

					dispatch('loadDialogue')
					

			      // if optionSelected is a string call that action
				} else if (typeof optionSelected[i] === 'string') {
					// If it is music open new tab to play music 
					let musicReg = new RegExp("^(http|https)://", "i");
					let matchingLinks = optionSelected[i].match(musicReg);
			
					if (matchingLinks){
						window.open(optionSelected[i])
					} else {

						// Call function, etc. (Could be a huge security risk)
						eval(optionSelected[i])


					}
				} 

			} // End of for loop    		

		},

		



	},
	mutations: {
		// called in dialogue function of character / obj = sceneActive, name number
		changeDialogueStartsAt(state, obj){ Grow.scene.scenes[obj[0]][obj[1]].dialogueStartsAt = obj[2] }, 

		addDialogue(state, obj){
			state.dialogues[obj[0]] = obj[1]
		},

		addLinkToCharacter(state, obj){
			state.dialogues[obj[1]][1][1] = ['go to link', [10, obj[0]]]
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










// Graveyard: 

/*


			else if(Array.isArray(optionSelected[i])){

				let vueOrScene = optionSelected[i][0];
				let location = optionSelected[i][1];
				let nameOfFunction = optionSelected[i][2];
				let functionParameter = [];
                
                if(optionSelected[i].length > 3){
                	for (let j=0; j < optionSelected[i][3].length; j++){
						functionParameter.push(optionSelected[i][2][j])
					}
                }

				//Have some standard vue functions in the dialogue
                if(location === 'dialogue'){
                	dispatch(nameOfFunction, functionParameter)
                } else if (vueOrScene === 'vue'){
                	// Add function here

                } else if (vueOrScene === 'scene'){
				//Have custom functions within the scene! (well organized)
	
                	// Add function in scene here
                }

			}

*/