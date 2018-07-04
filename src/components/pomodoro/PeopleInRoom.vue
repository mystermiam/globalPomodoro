<template>
  <div id='peopleContainer'>
    Users currently online: 
    <ul id='listOfUsers'>
      <li v-for='user in users'><span class='green-dot'></span>{{user.name}}</li>
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
  line-height: 1.5em;
	display: block;
	font-size: 48px;
  margin-top: 20px;
	box-sizing: border-box;
	}

  #listOfUsers {
  margin-top: auto;
   /*font-size: 0.3em;*/
  }

  .green-dot {
    height: 0.65em;
    width: 0.65em;
    margin-right: 0.5em;
    background-color: green;
    border-radius: 50%;
    display: inline-block;
  }
</style>
