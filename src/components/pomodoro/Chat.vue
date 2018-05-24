<template>
  <div>
    <div class="chatBox">
        <message v-for="message in messages" :key="message.time" :message="message">
        </message>
    </div>
    <div>
        <input type="text" name="username" v-model="nickmame"><br>
        <input v-model="content" type="text" name="typeBar"/><button @click="sendMessage">Send</button>
   </div>
  </div>
</template>

<script>
import {mapState, mapGetters, mapActions} from 'vuex'
import Message from '@/components/pomodoro/Message'

export default {
  name: 'Chat',
  components : {
    'message' : Message
  },

  data(){
    return {
        nickmame : '',
        content : ''
    };
  },

  computed : {
    ...mapState('chat',{
      messages:'messages'
    }),
    nickname : {
        get(){
            return this.nickmame;
        },
        set(nickmame){
            this.nickname = nickname;
        }
    },
    content : {
        get(){
            return this.content;
        },
        set(content){
            this.content = content;
        }
    }
  },
  methods : {
    ...mapActions('chat',{
      concatMessages:'concatMessages'
    }),
    sendMessage(){
        this.concatMessages([{
            nickname: this.nickname,
            time : new Date(),
            content : this.content 
        }]);
    }
  }
};
</script>

<style>
.chatBox{
    border:1px solid black;
    width: 100%;
    height: 500px;
}
</style>
