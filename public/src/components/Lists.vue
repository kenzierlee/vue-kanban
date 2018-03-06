<template>
  <div class="lists">
    <div>
      <h3>{{list.title}}</h3>
      <p>
        <strong>{{list.description}}</strong>
      </p>
      <div v-for="task in tasks">
        <Tasks></Tasks>
      </div>
      <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true"
                aria-expanded="false">
                Add A Task
            </button>
            <div class="dropdown-menu">
                <form class="px-4 py-3" @submit.prevent="createTask">
                    <div class="form-group">
                        <label for="task-title">Title</label>
                        <input v-model="task.title" type="text" class="form-control" id="task-title" placeholder="Title">
                    </div>
                    <div class="form-group">
                        <label for="task-description">Description</label>
                        <input v-model="task.description" type="text" class="form-control" id="task-description" placeholder="Description">
                    </div>
                    <button type="submit" class="btn btn-primary">Add Task</button>
                </form>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
  import Task from './Tasks'
  export default {
    name: 'Lists',
    props: ['list'],
    // mounted() {
    //   this.$store.dispatch('getTasks')
    // },
    data() {
      return {
        task: {}
      }

    },
    methods: {
        createTask(){
            task.boardId = activeBoard._id;
            task.listId = this.list._id;
            this.$store.dispatch('createTask', this.task)
        }

    },
    computed: {
      user() {
        return this.$store.state.user
      },
      tasks() {
        return this.$store.state.tasks
      },
      board(){
          return this.$store.state.activeBoard
      }
    }
  }
</script>

<style scoped>
</style>