<template>
    <div class="message" v-bind:class="{ another : !!sameSender}">
        <div v-if="sameSender" class="head">
            <span class="nickname">{{message.nickname}}</span> - <span class="timestamp">{{displayTime}}</span>
        </div>
        <div class="content">
            <p>{{message.textMessage}}</p>
        </div>
    </div>
</template>

<script>
    import moment from 'moment'
    export default{
        name:'Message',
        props : ['message','previous'],
        computed:{
            displayTime(){
                return moment().calendar(this.message.time);
            },
            sameSender(){
                return this.previous.nickname !== this.message.nickname;
            }
        }
    };
</script>

<style scoped>
.content p{
    display: inline;
    white-space: pre-line;
    text-overflow: clip;
    word-break: break-word;
}
.message{
    background: #ddd;
}

.head{
    color:red;
}

.another{
    margin-top:0.3em;
}
</style>