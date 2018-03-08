<template>
  <div class="tasks" draggable="true" v-on:dragstart.capture="changeList" :task='task'>
    <div class="card">
      <div class="card-header" data-toggle="modal" :data-target="'#'+task._id">
        <h5>{{task.title}}</h5>
      </div>
      <div class="modal" tabindex="-1" role="dialog" :id='task._id'>
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="card-body">
              <div class="dropdown">
                <i class="fas fa-edit dropdown-toggle" id="edit-task" data-toggle="dropdown"></i>
                <div class="dropdown-menu">
                  <form class="px-4 py-3" @submit.prevent="editTask(task)">
                    <div class="form-group">
                      <label for="task-title">Title</label>
                      <input v-model="task.title" type="text" class="form-control" id="task-title" placeholder="Title">
                    </div>
                    <div class="form-group">
                      <label for="task-description">Description</label>
                      <input v-model="task.description" type="text" class="form-control" id="task-description" placeholder="Description">
                    </div>
                    <button type="submit" class="btn btn-primary">Edit Task</button>
                  </form>
                </div>
              </div>
              <i class="fas fa-times-circle" @click="deleteTask(task)"></i>
              <p>
                <b>{{task.title}}</b>
              </p>
              <p>{{task.description}}</p>
            </div>
            <div class="comments">
              <form class="px-4 py-3" @submit.prevent="createComment">
                <div class="form-group">
                  <input v-model="comment.comment" type="text" class="form-control" id="comment-comment" placeholder="New Comment">
                </div>
                <button type="submit" class="btn btn-primary">Add Comment</button>
              </form>
            </div>
            <div :key="comment._id" v-for="comment in comments">
              <Comments :comment="comment"></Comments>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
  import Comments from './Comments'
  export default {
    name: 'Tasks',
    props: ['task'],
    mounted() {
      this.$store.dispatch('getComments', this.task._id)
    },
    data() {
      return {
        comment: {
          comment: '',
          boardId: this.task.boardId,
          listId: this.task.listId,
          taskId: this.task._id
        }
      }
    },
    methods: {
      createComment(comment) {
        this.$store.dispatch('createComment', this.comment)
        this.comment = {}
      },
      editTask(task) {
        this.$store.dispatch('editTask', task)
        $('#edit-task').dropdown('toggle')
      },
      deleteTask(task) {
        this.$store.dispatch('deleteTask', task)
      },
      changeList(event) {
        event.dataTransfer.setData('text/javascript', JSON.stringify(this.task))
      }
    },
    computed: {
      user() {
        return this.$store.state.user
      },
      comments() {
        return this.$store.state.comments[this.task._id]
      },
      lists() {
        return this.$store.state.boardLists
      },
      board() {
        return this.$store.state.boardLists
      }
    },
    components: {
      Comments
    }
  }
</script>

<style scoped>
</style>