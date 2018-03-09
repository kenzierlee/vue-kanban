<template>
    <div class="comments">
        <p class="commentBody"><strong>{{user.userName}}:</strong> {{comment.comment}}
            <span class="editComment">
                <div class="dropdown">
                    <i class="fas fa-edit dropdown-toggle m-1" :id="comment._id" data-toggle="dropdown"></i>
                    <div class="dropdown-menu">
                        <form class="px-4 py-3" @submit.prevent="editComment(comment)">
                            <div class="form-group">
                                <label for="comment">Comment</label>
                                <textarea v-model="comment.comment" type="text" class="form-control" id="comment" placeholder="Comment" rows="3"></textarea>
                            </div>
                            <button type="submit" class="btn btn-primary">Edit Comment</button>
                        </form>
                    </div>
                </div>
                <i class="fas fa-times-circle m-1" @click="deleteComment(comment)"></i>
            </span>
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
                console.log(comment)
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
    .commentBody{
        border-bottom: 2px solid rgba(112, 128, 144, .2);
        padding-bottom: 10px;
    }
.editComment{
    display: flex;
    justify-content: flex-end;
    align-content: flex-end;
}
</style>