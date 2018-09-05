<template>
  <div id='questContainer' v-show='showQuestContainer'>
    <span id='questContainerCloseButton' @click='closeQuestContainer'>x</span>

    <div id='questTitleContainer'>
      <h1>{{quests[questShown].title}}</h1>
    </div>

    <div id='questDescriptionContainer'>
      <span>{{quests[questShown].description}}</span>
    </div>


    <div id='questStepsContainer'>
      <h2>Steps to take</h2>

      <ul>
        <li v-for='step in quests[questShown].stepsToDo'>{{step}}</li>
      </ul>

    </div>


    <div id='questRewardContainer'>
      <h2>Rewards</h2>

      gold: {{quests[questShown].reward.gold}}

      experience: {{quests[questShown].reward.experience}}
    </div>


    <button @click='acceptQuest'>Accept Quest</button>

  </div>

</template>

<script>
import {mapState, mapGetters, mapActions} from 'vuex'

export default {
  name: 'Template',
  
      
  computed : {
   ...mapState('loadInterface',{
      showQuestContainer:'showQuestContainer',    
    }),

    ...mapState('quests',{
      quests:'quests', 
      questShown: 'questShown',  
    })
  },
 
 methods: {
  ...mapActions('loadInterface',{
      closeQuestContainer: 'closeQuestContainer',
    }),

  ...mapActions('quests',{
      acceptQuest: 'acceptQuest',
    }),



  
  },


  
};
</script>


<style scoped>
#questContainer{
  width: 350px;
  height: 500px;
  opacity: 0.98;
  margin: 0 auto;
  margin-top: 50px;
  position: relative;
  top: 0;
  left: 0;
  background-color: white;
  -webkit-box-shadow: 5px 7px 10px -5px rgba(0,0,0,0.75);
  -moz-box-shadow: 5px 7px 10px -5px rgba(0,0,0,0.75);
  box-shadow: 5px 7px 10px -5px rgba(0,0,0,0.75);
  padding: 10px;
}

#questContainerCloseButton {
  width: 20px;
  height: 20px;
  line-height: 16px;
  text-align: center;
  cursor: pointer;
  float: right;
  position: relative;
  top: -2px;
  left: 2px;
  color: white;
  border: 1px solid lightgray;
  background-color: lightgray;
  border-radius: 30%;

}

#questContainerCloseButton:hover {
  color: red;
  border-radius: 35%;
}

#questTitleContainer {
  font-size: 22px;
  font-weight: bold;
  text-align: center;
  padding-top: 2px;
  padding-bottom: 8px;
  border-bottom: 1px solid lightgray;
  margin-bottom: 20px;
}

#questDescriptionContainer {
  
}
</style>
