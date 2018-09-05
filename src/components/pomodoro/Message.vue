<template>
    <div class="message" v-bind:class="{ another : sameSender}">
        <div v-if="sameSender" class="head">
            <span class="author">{{message.author}}</span> - <span class="timestamp">{{displayTime}}</span>
        </div>
        <div class="content">
            <p>{{message ? message.textMessage : ''}}</p>
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
                if(this.message){
                    return moment(this.message.time).calendar();
                }
            },
            sameSender(){
                if(this.message)
                    return this.previous.author !== this.message.author;
            }
        }
    };
</script>

<style scoped>
.content p{
    color:white;
    display: inline;
    white-space: pre-line;
    text-overflow: clip;
    word-break: break-word;
}


.head{
    color:black;
    font-weight: bold;
}
.message{
    margin: 0;
    background: #003C7A;
}

.another{
    margin-top:1em;
}
</style>