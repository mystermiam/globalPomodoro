<template>
  <div>
 	Menu
 	<SideBar/>
  <Dailies/>
  </div>

</template>

<script>
import SideBar from '@/components/menu/sidebar/SideBar'
import Dailies from '@/components/menu/toolbox/Dailies'

import {mapState, mapGetters, mapActions} from 'vuex'

export default {
  name: 'Menu',
 
  components : {
  	 'SideBar': SideBar,
     'Dailies': Dailies
  },
      
  computed : {
  
  },

  methods: {
  
  },


  
};
</script>


<style scoped>

</style>
