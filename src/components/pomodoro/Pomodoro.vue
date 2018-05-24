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
        components : {
        'Timer' : Timer,
        'Chat' : Chat
        },
    };
</script>




<style>
</style>