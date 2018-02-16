<template>
  <div class="chat-message">
      <img :src="avatarUrl">
      <!-- <small>{{message.user.avatar}}</small> -->
      <small>{{ message.user.name }}</small>
      <!-- <p>{{message.user}}</p> -->
      <p><b>{{ message.message }}</b></p>

  </div>
</template>
<script>
export default {
    props: ['message'],
    data() {
        return {
            avatarUrl: '/storage/avatar_images/' + this.message.user.avatar
        }
    }
}
</script>
<style lang="scss" scoped>
.chat-message {
    padding: 1rem;
}
.chat-message > p {
    margin-bottom: .5rem;
}
.chat-message > img {
    border-radius: 100%;
    height: 40px;
    width: 40px;
}
</style>
