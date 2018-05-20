<template>
  <div class="chatContainer">
    <div id="chatBox" class="chatBox">
        <message v-for="(message,i) in messages" :key="message.time+message.nickmame" :message="message" :previous="i>0 ? messages[i-1] : ''">
        </message>
    </div>
    <div>
        <input type="text" name="username" v-model="nickmame"><br>
        <input v-model="content" type="text" name="typeBar"/><button @click="sendMessage">Send</button>
   </div>
  </div>
</template>
<!-- computed: {
    formattedMessages() {
        return this.messages.map((message, i) => {
            const lastMessage = this.messages[i-1]

            return {
                ...message,
                lastMessageHasThing: !!(lastMessage && lastMessage.thing),
            }
        }
    }
} -->
<script>
import {mapState, mapGetters, mapActions} from 'vuex'
import Message from '@/components/Message'

export default {
  name: 'App',
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
      if(this.nickname && this.content)
        this.concatMessages([{
            nickname: this.nickname,
            time : new Date(),
            content : this.content 
        }]);
    }
  },
  updated(){
    let chatBox = this.$el.querySelector('#chatBox');
    chatBox.scrollTop = chatBox.scrollHeight;
  }
};
</script>

<style scoped>


<style>