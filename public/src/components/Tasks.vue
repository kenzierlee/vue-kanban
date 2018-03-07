<template>
  <div class="tasks">
    <div class="card">
      <div class="card-header">
        <h5>{{task.title}}
          <i class="fas fa-times-circle" @click="deleteTask(task)"></i>
          <button class="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown">
              Change List
            </button>
          <div class="dropdown-menu">
              <a class="dropdown-item" v-for="list in lists">
                  <p @click="changeList(list)">{{list.title}}</p>
              </a>
          </div>
          <div class="dropdown">
            <i class="fas fa-edit dropdown-toggle" id="dropdownMenuButton" data-toggle="dropdown"></i>
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
        </h5>
      </div>
      <div class="card-body">
        <p>{{task.description}}</p>
        <!-- <div v-for="comment in comments">
          <p>{{user.userName}}</p>
          <p>{{comment.comment}}</p>
        </div> -->
        <div :key="comment._id" v-for="comment in comments">
          <Comments :comment="comment"></Comments>
        </div>
        <div class="comments">
          <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true"
              aria-expanded="false">
              Add A Comment
            </button>
            <div class="dropdown-menu">
              <form class="px-4 py-3" @submit.prevent="createComment">
                <div class="form-group">
                  <label for="comment">Comment</label>
                  <input v-model="comment.comment" type="text" class="form-control" id="comment" placeholder="Comment">
                </div>
                <button type="submit" class="btn btn-primary">Add Comment</button>
              </form>
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
          boardId: this.task.boardId,
          listId: this.task.listId,
          taskId: this.task._id
        }
      }
    },
    methods: {
      createComment(comment) {
        this.$store.dispatch('createComment', this.comment)
      },
      editTask(task) {
          this.$store.dispatch('editTask', task)
      },
      deleteTask(task) {
        this.$store.dispatch('deleteTask', task)
      },
      changeList(list){
        
        this.$store.dispatch('changeList', {list, task: this.task._id, oldList: this.task.listId})
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
      board(){
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