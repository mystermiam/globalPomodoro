import { Grow } from '../index'

import Character from './../phaserUtilities/character'


import Star from './../assets/star.png'

// Battle plan
// save to server 
// let image follow mouse  update() {  sprite.position.set(game.input.mousePointer.worldX, game.input.mousePointer.worldY);}
// create edit function and pick character up function
// move objectcontainer into right position
// make it open on keypress

export default {
	namespaced: true,
	state : {
		characterID: 4, // should be replaced by dynamic individual id
		showObjectContainer: true,
		objectsInInventory: ['star'],
		objects: {
			'npc': 
			{
			'name': 'npc',
			'image': '../assets/sprites/npc_bailey.png',
			'showURL': false,
			'link': '',
			'quantity': 0,
			},
			'star':
			{
			'name': 'star',
			'image': '../assets/star.png',
			'showURL': false,
			'link': '',
			'quantity': 1,
            },
            'bomb':
			{
			'name': 'bomb',
			'image': '../assets/bomb.png',
			'showURL': false,
			'link': '',
			'quantity': 0,
            },
		},
		itemCurrentlySelected: false,
		getCoordinates: false,
	},
	getters: {

	},
	actions: {
		showUrlInputField({state, commit}, name){
       
			commit('showUrlInputField', name)

			if(!state.itemCurrentlySelected){
				commit('itemCurrentlySelected', name)
			} else {
				commit('unselectItem')
			}
            
		},
    	addIntoGame({state, commit}){

            // Click on place to get coordinates
            commit('getCoordinates')
        

            if(state.getCoordinates){
				// Change cursor (later copy of item should be attached to cursor)
			    document.getElementById("game-screen").style.cursor = "pointer";
			} else {
				document.getElementById("game-screen").style.cursor = "default";
			}
		},

		gameContainerClicked({state, commit, dispatch}){
			 if(state.itemCurrentlySelected){
				let scene = Grow.scene.scenes[2];
				let map = Grow.scene.scenes[2].map;

				let pointer = scene.input.activePointer;
    			let worldPoint = pointer.positionToCamera(scene.cameras.main);
    			let pointerTileXY = map.worldToTileXY(worldPoint.x, worldPoint.y);
    			let snappedWorldPoint = map.tileToWorldXY(pointerTileXY.x, pointerTileXY.y);

    			Grow.scene.scenes[2][state.characterID] = new Character({
		            scene: Grow.scene.scenes[2],
		            key: state.itemCurrentlySelected, 
		            x: snappedWorldPoint.x,
		            y: snappedWorldPoint.y,
		            furtherVar: [
		              ['characterNumber', state.characterID],
		              ['name', state.characterID],
		              ['interaction', 'dialogue'],
		              ['size', [25,25]],
		              ['offSet', [0,0]],
		              ['createdCharacter', true],
		              ['link', state.objects[state.itemCurrentlySelected].name],
		            ]
        		});
    		//UNFINISHED: Increment character Number to give each character an individual id / would not work with multiple characters
        	commit('individualCharacterID')
        	
        	// Remove item from itemlist 
        	let positionOfItem = state.objectsInInventory.indexOf(state.itemCurrentlySelected);
        	commit('removeItemFromItemList', positionOfItem)
        	
        	//UNFINISHED: Close url input field, use when working with quantities
        	//dispatch('showUrlInputField', state.itemCurrentlySelected)
        	
        	// Unselect items
        	commit('unselectItem')
        	}}

	},
	mutations: {
		showUrlInputField(state, name){
			state.objects[name].showURL = !state.objects[name].showURL
		},

		getCoordinates(state){
			state.getCoordinates = !state.getCoordinates
		},

		individualCharacterID(state){
			state.characterID++
		},

		itemCurrentlySelected(state, name){
			state.itemCurrentlySelected = name;
		},

		unselectItem(state){
			state.itemCurrentlySelected = false;
		},

		removeItemFromItemList(state, positionOfItem){
			//UNFINISHED: Should work with quantity later on
			state.objectsInInventory.splice(positionOfItem, 1);
		}


	}

}


























/*

Actions 

	saveInput({commit, state}, index){
			// Get text of input
			let newInput = event.target.previousElementSibling.value;
			// save it to variable
			commit('saveInput', [newInput, index]);

			// close input field
			commit('showUrlInputField', state.objectsInInventory[index]);
	},

Mutations

	saveInput(state, obj){
			state.objects[state.objectsInInventory[obj[1]]].link = obj[0]
		},


*/