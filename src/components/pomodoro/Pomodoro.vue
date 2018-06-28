<template>
 	<div id='pomodoroContainer'>
        <PeopleInRoom id="peopleInRoom"/>
		<div id="timer"><Timer/></div>


        <div id='sideContainer'>
            <span class='toggleLists' v-show='toggleLists' @click='toggleList'>Session Titles (Click to toggle lists) </span><span class='toggleLists' v-show='!toggleLists' @click='toggleList'>Distractions (Click to toggle lists)</span>
            <br><br>
            
            <div v-show='toggleLists'><SessionTitleList/></div>
            
            <div v-show='!toggleLists'><DistractionList/></div>

        </div>
        <Chat id="chat"/>
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
              toggleList: 'toggleList',
            }),
        },



        components : {
        'PeopleInRoom': PeopleInRoom,
        'Timer' : Timer,
        'Chat' : Chat,
        'DistractionList': DistractionList,
        'SessionTitleList': SessionTitleList,
        },
    };
</script>




<style scoped>
#pomodoroContainer{
    display: grid;
    grid-template-columns: repeat(8,1fr);
    align-items: center;
}

#peopleInRoom{
    padding: 1% 2%;
    grid-row: 1/2;
    grid-column: 1/3;

}

#chat{
    grid-row: 2/2;
    grid-column: 1/9;
}

#timer{
    grid-row:1/2;
    grid-column: 3/7;
    display: block;
}

#sideContainer {
    grid-row: 1/2;
    padding: 1% 2%;
    grid-column: 7/9;
    border: 1px solid black;
    box-sizing: border-box;
    text-align: center;

}

.toggleLists {
    text-align: center;
}

</style>