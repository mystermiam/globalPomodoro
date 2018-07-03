<template>
  <div id='dailyContainer'>

    <div class='container'>
     <span id='howMuchDustOverall'>Overall Dust: {{user.dustTotal}}</span><br>
     <span>Water: {{user.dust[0]}} </span><br>
     <span>Fire: {{user.dust[1]}} </span><br>
     <span>Earth: {{user.dust[2]}} </span><br>
     <span>Air: {{user.dust[3]}} </span><br>
     <span>Steel: {{user.dust[4]}} </span>

    </div>
    
    <div class='container'>
       <span> Health: {{user.health}}</span><br>
       <span> Gold: {{user.gold}}</span>
    </div>

          
    <br><br><br><br>

    <ul>

      <li>
        <input id='dailyTitle' placeholder='Daily Name'>
        <input id='categoryName' list='categoryList' placeholder='Daily Category'>
          <datalist id='categoryList'>
            <option value='Water'></option>
            <option value='Fire'></option>
            <option value='Earth'></option>
            <option value='Air'></option>
            <option value='Steel'></option>
          </datalist>
        <button @click='addDaily'>+</button>
      </li>

      <br>

      <li v-for='(daily, index) in dailies'>{{daily.category}} - {{daily.name}} - {{daily.timesCompleted}} - {{daily.level}}

      <button @click='dailyDone(index)' :disabled='daily.doneToday'>+</button>
      </li>
    </ul>
    <br>
    <button @click='resetDay'>Reset Day</button>
  </div>

</template>

<script>
import {mapState, mapGetters, mapActions} from 'vuex'

export default {
  name: 'Dailies',
      
  computed : {
   ...mapState('dailies',{
      dailies:'dailies',
      user: 'user'
    })
  },
  
 methods: {
  ...mapActions('dailies',{
      dailyDone: 'dailyDone',
      addDaily: 'addDaily',
      resetDay: 'resetDay'
    })
  },

 

  
};
</script>


<style scoped>
#dailyContainer {
  width: 50%;
  border: 1px solid black;
  float: left;
  box-sizing: border-box;
}

.container {
  width: 10em;
  height: 10em;
  float: left;
  display: inline-block;
  border: 1px solid black;
  font-size: 0.5em;
  margin-right: 2em;
}

#howMuchDustOverall {
  font-size: 1.2em;
}
</style>
