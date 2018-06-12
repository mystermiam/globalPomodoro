<template>
 	<div>
        <PeopleInRoom></PeopleInRoom>
		<Timer></Timer>
        <ToDoList></ToDoList>
		<Chat></Chat>
	</div>
</template>



<script>
    import PeopleInRoom from '@/components/pomodoro/PeopleInRoom'
	import Timer from '@/components/pomodoro/Timer'
    import ToDoList from '@/components/pomodoro/ToDoList'
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
        'ToDoList': ToDoList,
        },
    };
</script>




<style>
</style>