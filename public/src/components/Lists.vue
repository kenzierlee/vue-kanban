<template>
  <div class="lists">
    <div>
      <h3>{{list.title}}</h3>
      <i class="fas fa-times-circle" @click="deleteList(list)"></i>
      <div class="dropdown">
          <i class="fas fa-edit dropdown-toggle" id="dropdownMenuButton" data-toggle="dropdown"></i>
          <div class="dropdown-menu">
              <form class="px-4 py-3" @submit.prevent="editList(list)">
                  <div class="form-group">
                      <label for="list-title">Title</label>
                      <input v-model="list.title" type="text" class="form-control" id="list-title" placeholder="Title">
                  </div>
                  <div class="form-group">
                      <label for="list-description">Description</label>
                      <input v-model="list.description" type="text" class="form-control" id="list-description" placeholder="Description">
                  </div>
                  <button type="submit" class="btn btn-primary">Edit List</button>
              </form>
          </div>
      </div>
      <p>
        <strong>{{list.description}}</strong>
      </p>
      <div :key="task._id" v-for="task in tasks">
        <Tasks :task="task"></Tasks>
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
  import Tasks from './Tasks'
  export default {
    name: 'Lists',
    props: ['list'],
    mounted() {
      this.$store.dispatch('getTasks', this.list._id)
    },
    data() {
      return {
        task: {
          boardId: this.list.boardId,
          listId: this.list._id
        }
      }
    },
    methods: {
      createTask(task) {
        this.$store.dispatch('createTask', this.task)
      },
      deleteList(list) {
        this.$store.dispatch('deleteList', list)
      },
      editList(list){
        this.$store.dispatch('editList', list)
      }

    },
    computed: {
      user() {
        return this.$store.state.user
      },
      tasks() {
        return this.$store.state.tasks[this.list._id]
      },
      board() {
        return this.$store.state.activeBoard
      }
    },
    components: {
      Tasks
    }
  }
</script>

<style scoped>
</style>