<template>
 	<div>
		<Timer></Timer>
		<Chat></Chat>
	</div>
</template>



<script>
	import Timer from '@/components/pomodoro/Timer'
	import Chat from '@/components/pomodoro/Chat'

	export default{
        name:'Pomodoro',
        sockets : {
            connect : function(){
                console.log('connected from vue');
            }
        },
        components : {
        'Timer' : Timer,
        'Chat' : Chat
        },
    };
</script>




<style>
</style>