<template>
    <div>
        <div v-if="previous.nickname !== message.nickname" class="head">
            <span class="nickname">{{message.nickname}}</span> - <span class="timestamp">{{displayTime}}</span>
        </div>
        <div class="content">
            {{message.content}}
        </div>
    </div>
</template>

<script>
    export default{
        name:'Message',
        props : ['message','previous'],
        computed:{
            displayTime(){
                let time = new Date(this.message.time);
                return time.getHours()+':'+time.getMinutes()
            }
        }
    };
</script>

<style scoped>


</style>