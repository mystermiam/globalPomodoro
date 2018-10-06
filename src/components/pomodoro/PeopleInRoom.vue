<template>
  <div id='peopleContainer'>
    Users currently online: 
    <ul id='listOfUsers'>
      <li v-for='user in users'><span class='green-dot'></span>{{user.username}} - ({{user.id}})</li>
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
      author: 'author'  
    })
  },

  methods: {
  
  },


  
};
</script>


<style scoped>
  #peopleContainer {
  line-height: 1.5vh;
  display: block;
  font-size: 10vh;
  margin-top: 2vh;
  box-sizing: border-box;
  }

  #listOfUsers {
  margin-top: auto;
   /*font-size: 0.3em;*/
  }

  .green-dot {
    height: 1.8vh;
    width: 1.8vh;
    margin-right: 2vh;
    background-color: green;
    border-radius: 50%;
    display: inline-block;
  }
</style>
