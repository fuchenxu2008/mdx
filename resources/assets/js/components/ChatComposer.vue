<template>
  <div id="composer" class="chat-composer">
      <input type="text" class="col-xs-9" name="message_input" placeholder="Enter your message here" v-model="messageText" @keyup.enter="sendMessage">
      <button type="button" class="col-xs-3" @click="sendMessage">Send</button>
  </div>
</template>

<script>
export default {
    props: ['current-user'],
    data: () => ({
        messageText: ''
    }),
    methods: {
        sendMessage() {
            if (this.messageText != '') {
                console.log('sent: ' + this.messageText);
                this.$emit('messagesent', {
                    message: this.messageText,
                    user: this.currentUser
                });
                this.messageText = '';
            }
        }
    }
}
</script>

<style lang="scss" scoped>
#composer {

}
.chat-composer {
    display: flex;
    left:15px;
    right: 15px;
    // width: 100%;
    position: fixed;
    bottom: 55px;
}
.chat-composer input {
    flex: 1px auto;
    border: none;
    background-color: rgba(255,255,255,0.8);
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 0;
    padding: 10px;
    color: black;
}
.chat-composer button {
    border-top-right-radius: 0;
    border-bottom-right-radius: 15px;
    padding: 10px;
    border: 1px solid rgba(255,255,255,0.8);
}
</style>
