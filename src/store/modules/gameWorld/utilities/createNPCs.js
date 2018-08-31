// show picture of npc
// implement npc into game (only once) - disappear from window
// create with this.character
// customize character.js to create character with link


// Importing the game object? And then attaching the function to the game object!!!
import { Grow } from '../index'

import Character from './../phaserUtilities/character'


import Star from './../assets/star.png'

// Grow.scene.scenes[2].dialogue()
// Battle plan
// load images with v-for into object container :check
// Create css class to format images into uniform size :check
// click on image and add link :check
// be able to drag and drop the image / dblclick image, change cursor, click game screen get coordinates :check
// realize coordinates of the image :check
// load image --> add image into that position :check
// save to server 

export default {
	namespaced: true,
	state : {
		characterID: 2, // should be replaced by dynamic individual id
		showObjectContainer: true,
		objectsInInventory: ['star'],
		objects: {
			'npc': 
			{
			'name': 'npc',
			'image': '../assets/sprites/npc_bailey.png',
			'showURL': false,
			'link': '',
			},
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

		addIntoGame({commit, state}){

            // Click on place to get coordinates
            commit('getCoordinates')
        

            if(state.getCoordinates){
				// Change cursor (later copy of item should be attached to cursor)
			    document.getElementById("game-screen").style.cursor = "pointer";
			} else {
				document.getElementById("game-screen").style.cursor = "default";
			}
		},

		gameContainerClicked({state, commit}){
			console.log(state.objects.star)
			if(state.getCoordinates){
				let scene = Grow.scene.scenes[2];
				let map = Grow.scene.scenes[2].map;

				let pointer = scene.input.activePointer;
    			let worldPoint = pointer.positionToCamera(scene.cameras.main);
    			let pointerTileXY = map.worldToTileXY(worldPoint.x, worldPoint.y);
    			let snappedWorldPoint = map.tileToWorldXY(pointerTileXY.x, pointerTileXY.y);
    			console.log(snappedWorldPoint.x, snappedWorldPoint.y);

    			//Grow.scene.scenes[2].add.image(snappedWorldPoint.x, snappedWorldPoint.y, 'star');
    			Grow.scene.scenes[2][state.characterID] = new Character({
		            scene: Grow.scene.scenes[2],
		            key: 'star', // don't know yet how to do it
		            x: snappedWorldPoint.x,
		            y: snappedWorldPoint.y,
		            furtherVar: [
		              ['characterNumber', state.characterID],
		              ['name', state.characterID],
		              ['interaction', 'dialogue'],
		              ['size', [25,25]],
		              ['offSet', [0,0]],
		              ['createdCharacter', true],
		              ['link', state.objects.star.name],
		            ]
        		});

        	commit('individualCharacterID')

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
		},

		individualCharacterID(state){
			state.characterID++
		}

	}
}