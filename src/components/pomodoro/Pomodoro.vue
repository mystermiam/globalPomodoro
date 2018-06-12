<template>
 	<div>
        <PeopleInRoom></PeopleInRoom>
		<Timer></Timer>
        <SessionTitleList></SessionTitleList>
		<Chat></Chat>
        <DistractionList></DistractionList>
	</div>
</template>



<script>
    import PeopleInRoom from '@/components/pomodoro/PeopleInRoom'
	import Timer from '@/components/pomodoro/Timer'
    import DistractionList from '@/components/pomodoro/DistractionList'
	import Chat from '@/components/pomodoro/Chat'
    import SessionTitleList from '@/components/pomodoro/SessionTitleList'


	export default{
        name:'Pomodoro',
        sockets : {
            connect : function(){
                console.log('connected from vue');
            }
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




<style>
</style>