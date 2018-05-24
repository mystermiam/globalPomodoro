<template>
    <div>
        <div class="head"><span class="nickname">{{message.nickname}}</span> - <span class="timestamp">{{message.time}}</span></div>
        <div class="content">
            {{message.content}}
        </div>
    </div>
</template>

<script>
    export default{
        name:'Message',
        props : ['message']
    };
</script>

<style scoped>

</style>