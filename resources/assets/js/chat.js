
const app = new Vue({
    el: '#app',
    data: {
        messages: [],
	    usersInRoom: []
    },
    methods: {
      addMessage(message) {
        console.log('message added');

        // Add message
        this.messages.push({
            message: message.message,
            user: JSON.parse(message.user)
        })
        // console.log(message);
        // console.log(JSON.parse(message.user).avatar);
        // To the database
        axios.post('/messages', message)

        var log = document.getElementById('chat-log')
        log.scrollTop = log.scrollHeight;
      }
    },
    created() {
        axios.get('/messages').then(response => {
          console.log('data is: ',response.data[0].user.avatar);
            this.messages = response.data;
        });

        Echo.join('chatroom')
            .here((users) => {
                this.usersInRoom = users
            })
            .joining((user) => {
                this.usersInRoom.push(user);
            })
            .leaving((user) => {
                this.usersInRoom = this.usersInRoom.filter(u => u != user);
            })
            .listen('MessagePosted', (e) => {
                this.messages.push({
                    message: e.message.message,
                    user: e.user
                });
                console.log(e);
                var log = document.getElementById('chat-log')
                log.scrollTop = log.scrollHeight;
            });

    }
});

window.onload = function() {
    var log = document.getElementById('chat-log')
    log.scrollTop = log.scrollHeight;
}
