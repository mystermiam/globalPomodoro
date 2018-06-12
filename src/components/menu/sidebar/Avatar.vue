<template>
  <div>
    <div id="avatarContainer">
    </div>                          
  </div>
</template>

<script>
import {mapState, mapGetters, mapActions} from 'vuex'

export default {
  name: 'Avatar',

  methods: {

   ...mapActions('avatar',{
        fetchState: 'fetchState',
        avatarBodyLoad: 'avatarBodyLoad',

  })

  },


  created () {
  // Fetch variables from fake server
  this.fetchState()
  // load avatar, items and pet on start 
      .then(() => this.avatarBodyLoad());




  },

  
};

</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

body {
  height: 768px;
  width: 1024px;
  display: block;
  border: 1px solid white;
  background-color: #464646;
}

#sideBar {
  min-width: 256px;
  min-height: 768px;
  border: 10px solid white;
  display: block;

  /* For demonstration purposes in this vue element*/
  position: absolute;
  top: 50px;
  left: 20px;
  /*                                               */
  

  background-color: "white";
}

#avatarContainer {
  height: 192px;
  width: 255px;
  background-color: #A3320B;
  background-image: url("../../../../static/raw_sprites/spritesmith/backgrounds/background_beehive.png");
  background-size:cover;
  -webkit-transition: background-image 0.5s;
  -moz-transition: background-image 0.5s;
  -ms-transition: background-image 0.5s;
  -o-transition: background-image 0.5s;
  transition: background-image 0.5s;
  border-bottom: 1px solid gray;
  /* Keeps Avatar Image in the foreground */
  /*z-index: 0;*/
}


#avatarContainerBackgroundDiv {
  position: absolute; 
  top: 100px;
  left: -10px;
  
}

#avatarContainerBackground {
  margin-left: 84px;
  margin-top: -5px;
  z-index: 10;
}

#sideBarPet {
  position: absolute;
}

@keyframes petJump {
  0% {
    transform: translate(0px,7px);
  }
  25% {
    transform: translate(0px, 0px);
  }
  50% {
   transform: translate(0px,7px)
  }
  75% {
    transform: translate(0px, 0px)
  }
  100% {
   transform: translate(0px,7px)
  }
}



</style>

