<template>

  <div id='questContainer' v-if='showQuestContainer'>

    <div id='questLogContainer' v-if='questContainerDisplay == "questLog"'> Quest Log
      <div v-if='quest' v-for='quest in activeQuests' @click='openActiveQuest(quest)'> 
          {{quest}}
      </div>
    </div>


    <div v-if='questContainerDisplay == "newQuest" || questContainerDisplay ==  "activeQuest"'>
      <span id='questContainerCloseButton' @click='closeQuestContainer(quest)'>x</span>

      <div id='questTitleContainer'>
        <h1>{{quests[questShown].title}}</h1>
      </div>

      <div id='questDescriptionContainer'>
        <span>{{quests[questShown].description}}</span>
      </div>


      <div id='questStepsContainer'>
        <h2>Steps to take:</h2>

        <ul>
          <li v-for='(step, index) in quests[questShown].stepsToDo'>{{index + 1}}: {{step}}</li>
        </ul>

      </div>


      <div id='questRewardContainer'>
        <h2>Rewards</h2>

        <span v-if='quests[questShown].reward.gold > 0'> 
          gold: {{quests[questShown].reward.gold}}  
        </span>

        <span v-if='quests[questShown].reward.experience > 0'> 
          experience: {{quests[questShown].reward.experience}} 
        </span>

      </div>


      <button id='acceptQuestButton' @click='acceptQuest' v-if='questContainerDisplay == "newQuest"'>Accept Quest</button>
    </div>


  </div>

</template>

<script>
import {mapState, mapGetters, mapActions} from 'vuex'

export default {
  name: 'Template',
  
      
  computed : {
   ...mapState('loadInterface',{
      showQuestContainer:'showQuestContainer',
      showQuestLog:'showQuestLog', 
      questContainerDisplay: 'questContainerDisplay',  
    }),

    ...mapState('quests',{
      quests:'quests', 
      questShown: 'questShown', 
      activeQuests:'activeQuests',  
    })
  },
 
 methods: {
  ...mapActions('loadInterface',{
      closeQuestContainer: 'closeQuestContainer',
    }),

  ...mapActions('quests',{
      acceptQuest: 'acceptQuest',
      openActiveQuest: 'openActiveQuest',
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
  background-color: #faf9f7;
  border-radius: 3px;
  width: 320px;
  height: 150px;
  -webkit-box-shadow: inset 0px 0px 135px -20px rgba(0,0,0,0.25);
  -moz-box-shadow: inset 0px 0px 135px -20px rgba(0,0,0,0.25);
  box-shadow: inset 0px 0px 135px -20px rgba(0,0,0,0.25);
  margin: 0 auto;
  padding: 10px;
  margin-bottom: 10px;
}

#questStepsContainer {
  background-color: #faf9f7;
  border-radius: 3px;
  width: 320px;
  height: 150px;
  -webkit-box-shadow: inset 0px 0px 135px -20px rgba(0,0,0,0.25);
  -moz-box-shadow: inset 0px 0px 135px -20px rgba(0,0,0,0.25);
  box-shadow: inset 0px 0px 135px -20px rgba(0,0,0,0.25);
  margin: 0 auto;
  padding: 10px;
  margin-bottom: 10px;
}

#questRewardContainer {
  text-align: center;
  margin: 0 auto;
  margin-bottom: 10px;
}

#acceptQuestButton {
  width: 120px;
  height: 35px;
  line-height: 25px;
  background-color: green;
  color: orange;
  border-radius: 20%;
  margin-left: 105px;
}

</style>
