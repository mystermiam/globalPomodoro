<template>
 	<div>
		<Timer></Timer>
        <SessionTitleList></SessionTitleList>
        <DistractionList></DistractionList>
        <Chat></Chat>
	</div>
</template>



<script>
    import PeopleInRoom from '@/components/pomodoro/PeopleInRoom'
	import Timer from '@/components/pomodoro/Timer'
    import SessionTitleList from '@/components/pomodoro/SessionTitleList'
    import DistractionList from '@/components/pomodoro/DistractionList'
	import Chat from '@/components/pomodoro/Chat'

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