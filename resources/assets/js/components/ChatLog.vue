<template>
    <div class="chat-log" id="chat-log">
        <chat-message :message="message" v-for="message in messages" :key="message.key"></chat-message>
        <div class="empty" v-show="messages.length === 0">
            Nothing here yet!
        </div>
    </div>

</template>
<script>
export default {
    props: ['messages']
}
</script>
<style lang="scss" scoped>
.chat-log .chat-message:nth-child(even) {
    background-color: rgba(255,255,255,0.3);
}
.chat-log {
    position: absolute;
    top: 55px;
    height: 75%;
    left: 15px;
    right: 15px;
    overflow-y: scroll;
    padding-bottom: 200px;
    // border: 1px solid rgba(255,255,255,0.3);
}
.empty {
    padding: 1rem;
    text-align: center;
}
</style>
