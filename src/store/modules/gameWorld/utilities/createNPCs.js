// Battle plan

// load images with v-for into object container 
// Create css class to format images into uniform size
// click on image and add link
// be able to drag and drop the image / dblclick image, change cursor, click game screen get coordinates
// realize coordinates of the image
// load image --> add image into that position
// save to server 

import TownScene from './../scenes/TownScene'  //should be a specialized unit

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
       
			commit('showUrlInputField', name)
		},

		saveInput({commit, state}, index){
			// Get text of input
			let newInput = event.target.previousElementSibling.value;
			// save it to variable
			commit('saveInput', [newInput, index]);

			// close input field
			commit('showUrlInputField', state.objectsInInventory[index]);
		},

		addIntoGame({commit}){
			// Change cursor (later copy of item should be attached to cursor)
			document.getElementById("game-screen").style.cursor = "pointer";

            // Click on place to get coordinates
            commit('getCoordinates')

            // If possible to place something there 
			
		},

		gameContainerClicked({state}){
			if(state.getCoordinates){
				alert("!")
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