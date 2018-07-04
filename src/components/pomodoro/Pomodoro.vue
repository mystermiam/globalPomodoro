<template>
 	<div id='pomodoroContainer'>


        <PeopleInRoom id="peopleInRoom"/>
		
        <Timer id="timer"/>


        <div id='sideContainer'>

            <div class='toggleLists' id='sessionTitleToggle' v-bind:class="{ toggleActive: !toggleLists }" @click='showDistractionList'>Pomodoros</div><div class='toggleLists' id='Toggle'  @click='showSessionList' v-bind:class="{ toggleActive: toggleLists }">Distractions</div>
            
            <br> 
            <br>
            <div v-show='!toggleLists'><SessionTitleList/></div>
            
            <div v-show='toggleLists'><DistractionList/></div>

        </div>

        <Chat id='chat'/>
	</div>
</template>



<script>
    import PeopleInRoom from '@/components/pomodoro/PeopleInRoom'
	import Timer from '@/components/pomodoro/Timer'
    import SessionTitleList from '@/components/pomodoro/SessionTitleList'
    import DistractionList from '@/components/pomodoro/DistractionList'
	import Chat from '@/components/pomodoro/Chat'

    import {mapState, mapGetters, mapActions} from 'vuex'

	export default{
        name:'Pomodoro',
        sockets : {
            connect : function(){
                console.log('connected from vue');
            }
        },

        computed : {
         ...mapState('sessionTitleList',{
             toggleLists:'toggleLists',    
        }),
        },

        methods : {
            ...mapActions('sessionTitleList',{
              showSessionList: 'showSessionList',
              showDistractionList: 'showDistractionList'
            }),
        },



        components : {
        'PeopleInRoom': PeopleInRoom,
        'Timer' : Timer,
        'DistractionList': DistractionList,
        'SessionTitleList': SessionTitleList,
        'Chat' : Chat,
        },
    };
</script>




<style scoped>
#pomodoroContainer{
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    margin: 3em;
    align-items: center;
    height: 100%;
}

#peopleInRoom{
    padding: 1% 2%;
    grid-column: 1/3;
    height: 100%;

}

#chat{
    grid-column: 1/9;
    height: 100%;
}

#timer{
    grid-column: 3/7;
    display: block;
    line-height: 1;
    display: block;
    flex-direction: column;
    font-size: 48px;
    border-radius: 5%;
    background: #f12711; /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #f12711, #f5af19); /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #f12711, #f5af19); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    box-sizing: border-box;
    text-align: center;
    height: 100%;
    margin: 0;
}

#sideContainer {
    padding: 1% 2%;
    grid-column: 7/9;
    box-sizing: border-box;
    text-align: center;
    height: 100%;
}

.toggleLists {
    display: inline-block;
    float: left;
    height: 2em;
    line-height: 2em;
    width: 50%;
    background-color: lightgray;
    color: darkgray;
    text-align: center;
    cursor: pointer;
}

.toggleActive {
    background-color: darkgray;
    color: lightgray;
}


</style>