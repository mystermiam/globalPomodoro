// import townscene to get access to TownScene variable to call TownScene.playMusic (use game element)
import TownScene from '../scenes/TownScene'

// Battle plan

// load images with v-for into object container :check
// Create css class to format images into uniform size
// click on image and add link :check
// be able to drag and drop the image / dblclick image, change cursor, click game screen get coordinates
// realize coordinates of the image
// load image --> add image into that position
// save to server 

export default {
	namespaced: true,
	state : {
		showObjectContainer: true,
		objectsInInventory: ['star', 'bomb'],
		objects: {
			'star':
			{
			'name': 'star',
			'image': '../assets/star.png',
			'showURL': false,
			'link': '',
            },
            'bomb':
			{
			'name': 'bomb',
			'image': '../assets/bomb.png',
			'showURL': false,
			'link': '',
            },
		},
		getCoordinates: false,
	},
	getters: {

	},
	actions: {
		showUrlInputField({commit}, name){
       
			//commit('showUrlInputField', name)
            console.log(TownScene)
			TownScene.dialogue()
		},

		saveInput({commit, state}, index){
			// Get text of input
			let newInput = event.target.previousElementSibling.value;
			// save it to variable
			commit('saveInput', [newInput, index]);

			// close input field
			commit('showUrlInputField', state.objectsInInventory[index]);
		},

		addIntoGame({commit, state}){

            // Click on place to get coordinates
            commit('getCoordinates')

            if(state.getCoordinates){
				// Change cursor (later copy of item should be attached to cursor)
			    document.getElementById("game-screen").style.cursor = "pointer";
			} else {
				document.getElementById("game-screen").style.cursor = "default";
			}

            // If possible to place something there 
			
		},

		gameContainerClicked({state}){
			console.log(Phaser)
			if(state.getCoordinates){

			}
		}

	},
	mutations: {
		showUrlInputField(state, name){
			state.objects[name].showURL = !state.objects[name].showURL
		},

		saveInput(state, obj){
			state.objects[state.objectsInInventory[obj[1]]].link = obj[0]
		},

		getCoordinates(state){
			state.getCoordinates = !state.getCoordinates
		}

	}
}