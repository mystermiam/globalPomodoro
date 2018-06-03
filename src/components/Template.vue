<template>
  <div>
 
  </div>

</template>

<script>
import ReadyButton from '@/components/ReadyButton'

import {mapState, mapGetters, mapActions} from 'vuex'

export default {
  name: 'Template',
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
