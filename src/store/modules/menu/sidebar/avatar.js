import fakeBackEndGrow from '@/api/fakeBackEndGrow'

export default {
	namespaced: true,
	
state : {
  avatar: [],
  body: [],
  skinSelected: 0,
  hairSelected: 0,
  beardSelected: 0,
  shirtSelected: 0,
  avatarCoordinateX: 55, 
  avatarCoordinateY: 80,
},

getters: {

	},
	

actions: {

fetchState({commit}){
	return new Promise((resolve,reject)=>{
		fakeBackEndGrow.fetchState((payload)=>{
			commit('setState', payload);
			resolve();
		});
	});
},



/****************************************************** BODY FUNCTIONS ***************************************************/

avatarBodyLoad({state, commit}){
// skin selected is avatar.body[0], replace all the variables  
// creating character out of several pieces 
let bodyPartCategory = ["skin", "hair", "beard", "shirt"],
	bodyPartCurrent = state.avatar.body,
	bodyParts = state.body;


for (let i=0; i< bodyPartCurrent.length; i++){
 if (bodyPartCurrent[i] !== 0) {

 $('#avatarContainer').append(`<img src="${bodyParts[bodyPartCurrent[i]].source}" alt="${bodyParts[bodyPartCurrent[i]].name}" value="${bodyPartCategory[i]}Equipped" style='width:${bodyParts[bodyPartCurrent[i]].size[0]}px; height:${bodyParts[bodyPartCurrent[i]].size[1]}px; position:absolute; top:${(bodyParts[bodyPartCurrent[i]].coordinates[1] + state.avatarCoordinateY)}px; left:${(bodyParts[bodyPartCurrent[i]].coordinates[0] + state.avatarCoordinateX)}px; z-index:${bodyParts[bodyPartCurrent[i]].layer};'>`);
 };
}

},
},


mutations: {
setState(state, payload){
	state.avatar = payload.avatar;
	state.body = payload.body;
},
},

}