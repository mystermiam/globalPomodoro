<template>
  <div>
 	Menu
 	<SideBar/>
  <Dailies/>
  <ToDo/>
  </div>

</template>

<script>
import SideBar from '@/components/menu/sidebar/SideBar'
import Dailies from '@/components/menu/toolbox/Dailies'
import ToDo from '@/components/menu/toolbox/ToDo'

import {mapState, mapGetters, mapActions} from 'vuex'

export default {
  name: 'Menu',
 
  components : {
  	 'SideBar': SideBar,
     'Dailies': Dailies,
     'ToDo': ToDo
  },
      
  computed : {
  
  },

  methods: {
  
  },


  
};
</script>


<style scoped>

</style>
