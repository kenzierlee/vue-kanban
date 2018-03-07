<template>
    <div class="comments">
        <p>{{comment.comment}} <i class="fas fa-times-circle" @click="deleteComment(comment)"></i></p>
    </div>
</template>
<script>
    export default {
        name: 'Comments',
        props: ['comment'],
        methods: {
            deleteComment(comment){
                this.$store.dispatch('deleteComment', comment)
            }
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