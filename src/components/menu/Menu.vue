<template>
  <div>
 	Menu
 	<SideBar/>
  <ProgressBar/>
  <Dailies/>
  <ToDo/>
  </div>

</template>

<script>
import SideBar from './sidebar/SideBar'
import ProgressBar from './sidebar/ProgressBar'
import Dailies from './toolbox/Dailies'
import ToDo from './toolbox/ToDo'

import {mapState, mapGetters, mapActions} from 'vuex'

export default {
  name: 'Menu',
 
  components : {
  	 'SideBar': SideBar,
     'Dailies': Dailies,
     'ToDo': ToDo,
     'ProgressBar': ProgressBar
  },
      
  computed : {
  
  },

  methods: {
  
  },


  
};
</script>


<style scoped>

</style>
