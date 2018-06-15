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
let bodyPartCategory = ["skin", "hair", "beard", "shirt"];

for (let i=0; i< state.avatar.body.length; i++){
 if (state.avatar.body[i] !== 0) {


 $('#avatarContainer').append(`<img src="${state.body[state.avatar.body[i]].source}" alt="${state.body[state.avatar.body[i]].name}" value="${bodyPartCategory[i]}Equipped" style='width:${state.body[state.avatar.body[i]].size[0]}px; height:${state.body[state.avatar.body[i]].size[1]}px; position:absolute; top:${(state.body[state.avatar.body[i]].coordinates[1] + state.avatarCoordinateY)}px; left:${(state.body[state.avatar.body[i]].coordinates[0] + state.avatarCoordinateX)}px; z-index:${state.body[state.avatar.body[i]].layer};'>`);


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