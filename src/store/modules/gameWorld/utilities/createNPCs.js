import { Grow } from '../index'

import Character from './../phaserUtilities/character'


import Star from './../assets/star.png'

// Battle plan
// save to server 
// let image follow mouse  update() {  sprite.position.set(game.input.mousePointer.worldX, game.input.mousePointer.worldY);}
// create edit function and pick character up function
// move objectcontainer into right position
// make it open on keypress


// added in character.js 
let dialogue1 = [
['Your NPC', 'Hey there my friend!'],
['option',
	['You can add a link here', ["commit('setCurrentMessageType', 'addLink')"]],
	['further options', [2, "commit('setCurrentMessageType', 'option')"]],
	['go away', [10]],
],
['option',
	['pick Item up', [10, 'console.log("pick item up function should be called here")']],
	['follow me', [10, 'console.log("follow function should be called here")']],
	['go back', [1]]
]
];


export default {
	namespaced: true,
	state : {
		characterID: 4, // should be replaced by dynamic individual id
		objectsInInventory: ['star'],
		objects: {
			'npc': 
			{
			'name': 'npc',
			'image': '../assets/sprites/npc_bailey.png',
			'showURL': false,
			'dialogue': dialogue1,
			'link': '',
			'quantity': 0,
			},
			'star':
			{
			'name': 'star',
			'image': '../assets/star.png',
			'dialogue': dialogue1,
			'showURL': false,
			'link': '',
			'quantity': 1,
            },
            'bomb':
			{
			'name': 'bomb',
			'image': '../assets/bomb.png',	
			'dialogue': dialogue1,
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
		findItem({commit}, name){
			commit('findItem', name)
		},

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

		gameContainerClicked({state, commit, dispatch, rootState}){
			 if(state.itemCurrentlySelected){
				let scene = Grow.scene.scenes[rootState.player.sceneActive];
				let map = scene.map;
				let pointer = scene.input.activePointer;
    			let worldPoint = pointer.positionToCamera(scene.cameras.main);
    			let pointerTileXY = map.worldToTileXY(worldPoint.x, worldPoint.y);
    			let snappedWorldPoint = map.tileToWorldXY(pointerTileXY.x, pointerTileXY.y);

    			scene[state.characterID] = new Character({
		            scene: scene,
		            key: state.itemCurrentlySelected, 
		            x: snappedWorldPoint.x,
		            y: snappedWorldPoint.y,
		            furtherVar: [
		              ['characterNumber', state.itemCurrentlySelected],
		              ['name', state.characterID],
		              ['interaction', 'dialogue'],
		              ['dialogue', state.objects[state.itemCurrentlySelected].dialogue],
		              ['size', [25,25]],
		              ['offSet', [0,0]],
		              ['createdCharacter', true],
		              ['link', state.objects[state.itemCurrentlySelected].name],
		            ]
        		});
        	//Push dialogue to dialogue box on dropping
        	//dispatch('dialogue/addDialogue', [''+ state.characterID +'',state.objects[state.itemCurrentlySelected].dialogue], {root:true})
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
		findItem(state, name){
			state.objectsInInventory.push(name)
		},

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