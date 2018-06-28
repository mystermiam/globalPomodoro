<template>
  <div id='peopleContainer'>
   
    <ul id='listOfUsers'>
      <li v-for='user in users'>{{user.name}}</li>
    </ul>

  </div>
</template>

<script>
import {mapState, mapGetters, mapActions} from 'vuex'

export default {
  name: 'PeopleInRoom',
   
  computed : {
     ...mapState('chat',{
      users:'users',    
    })
  },

  methods: {
  
  },


  
};
</script>


<style scoped>
	#peopleContainer {
	display: block;
	font-size: 48px;
  margin-top: 20px;
	box-sizing: border-box;

	}

  #listOfUsers {
   /*font-size: 0.3em;*/
  }
</style>
