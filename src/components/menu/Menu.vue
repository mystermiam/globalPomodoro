<template>
  <div>
 	Menu
 	<SideBar></SideBar>
  </div>

</template>

<script>
import SideBar from '@/components/menu/sidebar/SideBar'

import {mapState, mapGetters, mapActions} from 'vuex'

export default {
  name: 'Menu',
 
  components : {
  	 'SideBar': SideBar
  },
      
  computed : {
  
  },

  methods: {
  
  },


  
};
</script>


<style scoped>

</style>
