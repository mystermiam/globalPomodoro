<template>
  <div id='toDoContainer'>
     
  </div>

</template>

<script>
import {mapState, mapGetters, mapActions} from 'vuex'

export default {
  name: 'ToDo',
  
  components : {
  
  },
      
  computed : {
   ...mapState('toDo',{ 
    })
  },
  
 methods: {
  ...mapActions('toDo',{
    })
  },

 

  
};
</script>


<style scoped>
#toDoContainer {
  width: 50%;
  border: 1px solid black;
  float: left;
  display: block;
  box-sizing: border-box;
}
</style>
