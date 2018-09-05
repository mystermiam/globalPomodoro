import { Grow } from './../index'

// Battle plan:
// Toggle itembox on keypress

export default {
	namespaced: true,
	state : {
		positionOfGameContainer: [0,0],
		showDialogueBox: false,
		showObjectContainer: false,
		showQuestContainer: true,
		showChat: false,
	},
	getters: {

	},
	actions: {
		closeQuestContainer({commit}){ commit('closeQuestContainer') },

		alignInterfaceContainer({state}){
			// Eventually make every other elements relative to this one
			document.getElementById('vueInterfaceContainer').style.width = Grow.config.width + 'px';
			document.getElementById('vueInterfaceContainer').style.height = Grow.config.height + 'px';
			document.getElementById('vueInterfaceContainer').style.top = state.positionOfGameContainer[1] + 'px' ;
			document.getElementById('vueInterfaceContainer').style.left = state.positionOfGameContainer[0] + 'px';
			
		},

		toggleDialogueBox({state, commit, dispatch}){
		 if(!state.showDialogueBox){
		 	 commit('showDialogueBox')
		 } else {
		 	 commit('hideDialogueBox')
		 }

		   // Load after the box is shown, so that one can get the width of the box
		   setTimeout(function(){ dispatch('alignDialogueContainer'); }, 0);
		},

		alignDialogueContainer({rootState}){
			let elementHeight = document.getElementById('dialogueContainer').offsetHeight;
			// I don't know where the 16px come from, but shalalala, the calculation must go wrong somewhere
			document.getElementById('dialogueContainer').style.top = (rootState.loadInterface.positionOfGameContainer[1] + Grow.config.height - elementHeight) + 'px' ;
			document.getElementById('dialogueContainer').style.left = rootState.loadInterface.positionOfGameContainer[0] + 'px';
		},

		alignObjectContainer({rootState}){
			let elementHeight = document.getElementById('objectContainer').offsetHeight;
			let elementWidth = document.getElementById('objectContainer').offsetWidth;

			// I don't know where the 16px come from, but shalalala, the calculation must go wrong somewhere
			document.getElementById('objectContainer').style.top = (rootState.loadInterface.positionOfGameContainer[1] + Grow.config.height - elementHeight) + 'px';
			document.getElementById('objectContainer').style.left = (rootState.loadInterface.positionOfGameContainer[0] + Grow.config.width - elementWidth)  + 'px';
		},

		getPosition({state, commit, dispatch}){
			//Get position
            // Calculate width
            let windowWidth = window.innerWidth;
            let gameWidth = Grow.config.width;

            //Get offset of game Container
            let positionUpperLeftCornerX = (windowWidth-gameWidth) / 2;

            // Find out why I need the 16 pixels? (border or margin or something)
            let positionUpperLeftCornerY = document.getElementById('game-container').offsetTop + 16;  

            if (positionUpperLeftCornerX < 0){
            	positionUpperLeftCornerX = 0;
            } 

            commit('getPosition', [positionUpperLeftCornerX,positionUpperLeftCornerY])

            // Arrange interface

            // Interface container 
            dispatch('alignInterfaceContainer');  

            // 1 Itembox
            let objectContainerHeight = document.getElementById('objectContainer').offsetHeight;
            let objectContainerWidth = document.getElementById('objectContainer').offsetWidth;
			// I don't know where the 16px come from, but shalalala, the calculation must go wrong somewhere
			document.getElementById('objectContainer').style.top = (state.positionOfGameContainer[1] + Grow.config.height - objectContainerHeight + 34) + 'px' ;
			document.getElementById('objectContainer').style.left = (state.positionOfGameContainer[0] + Grow.config.width - objectContainerWidth - 1) + 'px';
            setTimeout(function(){ dispatch('alignObjectContainer'); }, 0);
		},

		keymonitor({state, commit, dispatch}, e){
		    if(e.key == 'i' ){
		    	if(!state.showObjectContainer){
		    	commit('showObjectContainer')
		    	dispatch('getPosition')
		    	} else {
		    	commit('hideObjectContainer')
		    	}
		    } else if(e.key == 'c'){
		    	if(!state.showChat){
		    		commit('showChat')
		    	} else {
		    		commit('hideChat')
		    	}
		    }
		},
	},
	mutations: {
		toggleDialogueBox(state){
			state.showDialogueBox = !state.showDialogueBox;
		},

		getPosition(state, coordinates){
			state.positionOfGameContainer = [coordinates[0], coordinates[1]]
		},

		showObjectContainer(state){
			state.showObjectContainer = true;
		},

		hideObjectContainer(state){
			state.showObjectContainer = false;
		},

		showChat(state){
			state.showChat = true;
		},

		hideChat(state){
			state.showChat = false;
		},

		showDialogueBox(state){
			state.showDialogueBox = true;
		},

		hideDialogueBox(state){
			state.showDialogueBox = false;
		},

		closeQuestContainer(state){
			state.showQuestContainer = false;
		}




	}
}
