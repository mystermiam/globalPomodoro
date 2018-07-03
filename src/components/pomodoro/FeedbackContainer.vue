<template>
  <div id='modalList'>
    <button @click="createModal(['small', 'white', 'Lalalalalalala', 3])">Create modal</button>
  </div>

</template>

<script>
import {mapState, mapGetters, mapActions} from 'vuex'

export default {
  name: 'FeedbackContainer',
  
  components : {
  
  },
      
  computed : {
   ...mapState('template',{
      
    })
  },
  
 methods: {
     ...mapActions('feedback',{
      createModal:'createModal',    
    })
  },

 

  
};
</script>


<style scoped>
#modalList {
  position: absolute;
  top: 5vh;
  right: 0;
  width: 10em;
  border: 1px solid black;
}

</style>
