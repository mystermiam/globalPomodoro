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
  avatarCoordinateX: 68, 
  avatarCoordinateY: 35,
},

getters: {

	},
	

actions: {

fetchAvatar({commit}){
	return new Promise((resolve,reject)=>{
		fakeBackEndGrow.fetchAvatar((avatar)=>{
			commit('setAvatar', avatar);
			resolve();
		});
	});
},



/****************************************************** BODY FUNCTIONS ***************************************************/

avatarBodyLoad({state,commit}){
// skin selected is avatar.body[0], replace all the variables  
// creating character out of several pieces 
let bodyPartCategory = ["skin", "hair", "beard", "shirt"];

for (let i=0; i< avatar.body.length; i++){
 if (avatar.body[i] !== 0) {

 document.getElementById("avatarContainer").appendChild(
      "<img src='" + body[avatar.body[0]].source +
        "' alt='" + body[avatar.body[i]].name + 
        "' value='" + bodyPartCategory[i] + "Equipped" +  "' style=' width:" + body[avatar.body[i]].size[0]  + "px; height:" + body[avatar.body[i]].size[1] +  
        "px; position:absolute;top:" + (body[avatar.body[i]].coordinates[1] + this.avatarCoordinateY) + "px;left:" + (body[avatar.body[i]].coordinates[0] + this.avatarCoordinateX) + "px; z-index:"+ body[avatar.body[i]].layer + "'>");
} else {
	alert('0')
}

};
},

},


mutations: {

setAvatar(state,payload){
	state.avatar = payload;
},


}

};