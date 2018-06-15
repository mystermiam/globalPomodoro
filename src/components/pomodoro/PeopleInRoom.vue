<template>
  <div>
 	<div id='peopleContainer'>PeopleInRoom</div>
  </div>

</template>

<script>
import {mapState, mapGetters, mapActions} from 'vuex'

export default {
  name: 'PeopleInRoom',
   
  computed : {
  
  },

  methods: {
  
  },


  
};
</script>


<style scoped>
	#peopleContainer {
	display: inline-block;
	width: 25%;
	height: 25%;
	font-size: 48px;
    margin-top: 20px;
	float: left;
	box-sizing: border-box;
    border: 1px solid black;
	}
</style>
