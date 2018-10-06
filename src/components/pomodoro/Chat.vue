<template>
  <div class="chatContainer"  v-show='showChat'>
    <div id="chatBox" class="chatBox">
        <message v-for="(message,i) in messages" :key="i" :message="message" :previous="i>0 ? messages[i-1] : ''">
        </message>
    </div>
    <div>
      <div class="inputContainer">
        
          <input class="input" type="text" name="username"  @blur="updateUsers" placeholder="Who are you ?" v-model="author">
          <textarea class="textarea" id="textField" v-model="textMessage" @keydown="handleKey" placeholder="Say whatever..." rows=1></textarea>
        
     </div>
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
import Message from './Message'

export default {
  name: 'Chat',
  components : {
    'message' : Message
  },
  sockets : {
    connected : function(){
      console.log('connected from vue');
    },
    readMsg : function(msg){
      console.log('receive')
      console.log(msg)
      this.$store.commit('chat/concatMessages',msg)
    },
    newUser : function(user){
      console.log('received',user);
      this.$store.commit('chat/addUser',{id:user,username:this.author});
      this.userId = user;
    }
  },
  data(){
    return {
        author : 'gionisos',
        textMessage : '',
        userId : ''
    };
  },
  computed : {
    ...mapState('chat',{
      messages:'messages',
      users : 'users'
    }),

    ...mapState('loadInterface',{
      showChat: 'showChat',
    }),
  },
  created (){
    this.fetchMessages();
    //this.fetchUsers();
  },
  methods : {
    ...mapActions('chat',{
      concatMessages:'concatMessages',
      fetchMessages:'fetchMessages',
      fetchUsers: 'fetchUsers',
      saveMessages:'saveMessages',
      updateUsers:'updateUsers'


    }),
    updateUsers(e){
      let indexUser = this.users.findIndex(x=>this.userId == x.id);

            this.users[indexUser] = {id:this.userId,username:this.author};
    },
    handleKey(e){

      let textField = this.$el.querySelector('#textField');

      if(e.shiftKey && e.keyCode == 13){
        if(this.$el.querySelector('#textField').rows < 13) 
          this.$el.querySelector('#textField').rows++;
      } else if(e.keyCode == 8 && this.$el.querySelector('#textField').rows > 1){
        let lines = this.$el.querySelector('#textField').value.split('\n');

        if(!lines[lines.length - 1]) 
            this.$el.querySelector('#textField').rows--;
        
      } else if(e.keyCode == 13){
        e.preventDefault();
        if(this.author && this.textMessage)
          this.$socket.emit('sendMessage',{
            author:this.author,
            textMessage:this.textMessage,
            time:new Date()
          });

          /*this.saveMessages({
              author:this.author,
              textMessage:this.textMessage,
              time:new Date()
          }).then(function(response){
            console.log(response);
          });*/
        this.textMessage='';
        this.$el.querySelector('#textField').rows = 1;
      }
      else{
        if(textField.clientHeight < textField.scrollHeight){
          if(textField.rows < 13) textField.rows++;
        }
        
      }
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