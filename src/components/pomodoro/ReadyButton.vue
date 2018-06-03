<template>
	<button @click='countdown'>Go!</button>
</template>

<script>
import {mapState, mapGetters, mapActions} from 'vuex'

export default {
	name: 'ReadyButton',


methods: {
	...mapActions('timer',{
   		countdown: 'countdown',
    })
},
	
};
</script>

<style scoped>
	
</style>