<template>
  <div class="lounge">
    <Chat></Chat>
  </div>

</template>

<script>
import Chat from '@/components/pomodoro/Chat'

export default {

 name: 'Lounge',

 components : {
      'Chat' : Chat
    },

};
</script>


<style scoped>
	.lounge{
		height: 100%;
		width:50%;
		margin: 0 auto;
	}

</style>
