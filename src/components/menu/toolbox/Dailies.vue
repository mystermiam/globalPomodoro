<template>
  <div>

    <span>Experience: {{user.experience}} - Gold: {{user.gold}}</span>

    <br><br>

    <ul>
      <li v-for='(daily, index) in dailies'>{{daily.category}} - {{daily.name}} - {{daily.timesCompleted}}

      <button @click='dailyDone(index)' :disabled='daily.doneToday'>+</button>
      </li>

      <li>
        <input id='dailyTitle'>
        <input id='categoryName' list='categoryList'>
          <datalist id='categoryList'>
            <option value='Air'></option>
            <option value='Social'></option>
            <option value='Water'></option>
            <option value='Health'></option>
            <option value='Steel'></option>
          </datalist>
        <button @click='addDaily'>+</button>
      </li>
    </ul>

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

</style>
