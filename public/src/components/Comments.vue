<template>
    <div class="comments">
        <p>{{comment.comment}}</p>
    </div>
</template>
<script>
    export default {
        name: 'Comments',
        props: ['comment'],
        methods: {
            
        },
        computed: {
            user(){
                return this.$store.state.user
            }
        }
    }
</script>
<style scoped>
</style>