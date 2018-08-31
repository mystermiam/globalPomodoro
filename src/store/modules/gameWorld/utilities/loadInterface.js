import { Grow } from './../index'

// Battle plan:
// Toggle itembox on keypress

export default {
	namespaced: true,
	state : {
		positionOfGameContainer: [0,0],
	},
	getters: {

	},
	actions: {
		getPosition({state, commit}){
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

            // Arrange interface

            // 1 Itembox
            let objectContainerHeight = document.getElementById('objectContainer').offsetHeight;
            let objectContainerWidth = document.getElementById('objectContainer').offsetWidth;
			// I don't know where the 16px come from, but shalalala, the calculation must go wrong somewhere
			document.getElementById('objectContainer').style.top = (state.positionOfGameContainer[1] + Grow.config.height - objectContainerHeight + 34) + 'px' ;
			document.getElementById('objectContainer').style.left = (state.positionOfGameContainer[0] + Grow.config.width - objectContainerWidth - 1) + 'px';

		},
	},
	mutations: {
		getPosition(state, coordinates){
			state.positionOfGameContainer = [coordinates[0], coordinates[1]]
			console.log(state.positionOfGameContainer)
		},
	}
}
