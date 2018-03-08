<template>
    <div class="comments">
        <p>{{user.userName}}: {{comment.comment}}
            <i class="fas fa-times-circle" @click="deleteComment(comment)"></i>
            <div class="dropdown">
                <i class="fas fa-edit dropdown-toggle" :id="comment._id" data-toggle="dropdown"></i>
                <div class="dropdown-menu">
                    <form class="px-4 py-3" @submit.prevent="editComment(comment)">
                        <div class="form-group">
                            <label for="comment">Comment</label>
                            <input v-model="comment.comment" type="text" class="form-control" id="comment" placeholder="Comment">
                        </div>
                        <button type="submit" class="btn btn-primary">Edit Comment</button>
                    </form>
                </div>
            </div>
        </p>
    </div>
</template>
<script>
    export default {
        name: 'Comments',
        props: ['comment'],
        methods: {
            editComment(comment) {
                var idComment = '#'+comment._id
                this.$store.dispatch('editComment', comment)
                console.log(comment)
                $('#'+comment._id).dropdown('toggle')
            },
            deleteComment(comment) {
                this.$store.dispatch('deleteComment', comment)
            }
        },
        computed: {
            user() {
                return this.$store.state.user
            }
        }
    }
</script>
<style scoped>
</style>