<template>
  <div>
    Hello
  </div>

</template>

<script>
import {mapState, mapGetters, mapActions} from 'vuex'

export default {
  name: 'Session',
   components : {
      },
      
  computed : {
    ...mapState('template',{
     
    })
  },

  methods: {
    ...mapActions('template',{
   
    })

    },

  mounted(){
   
  },
  
};
</script>


<style scoped>

</style>
