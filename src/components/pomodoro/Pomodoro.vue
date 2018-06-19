<template>
 	<div id='pomodoroContainer'>
		<Timer/>

        <div id='sideContainer'>
            <span class='toggleLists' v-show='toggleLists' @click='toggleList'>Session Titles (Click to toggle lists) </span><span class='toggleLists' v-show='!toggleLists' @click='toggleList'>Distractions (Click to toggle lists)</span>
            <br><br>
            
            <div v-show='toggleLists'><SessionTitleList/></div>
            
            <div v-show='!toggleLists'><DistractionList/></div>

        </div>
        

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
#sideContainer {
    width: 50%;
    border: 1px solid black;
    box-sizing: border-box;
    margin: 0 auto;
    text-align: center;
}

.toggleLists {
    text-align: center;
}

</style>