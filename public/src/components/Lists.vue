<template>
  <div class="lists">
    <div>
      <h3>{{list.title}}</h3>
      <i class="fas fa-times-circle" @click="deleteList(list)"></i>
      <p>
        <strong>{{list.description}}</strong>
      </p>
      <div :key="task._id" v-for="task in tasks">
        <Tasks :task="task"></Tasks>
      </div>
      <div class="dropdown">
        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" @click="showDropdown">
          Add A Task
        </button>
        <div class="dropdown-menu" id="createTaskForm">
          <form class="px-4 py-3" @submit.prevent="createTask">
            <div class="form-group">
              <label for="task-title">Title</label>
              <input v-model="task.title" type="text" class="form-control" id="task-title" placeholder="Title">
            </div>
            <div class="form-group">
              <label for="task-description">Description</label>
              <input v-model="task.description" type="text" class="form-control" id="task-description" placeholder="Description">
            </div>
            <button type="submit" class="btn btn-primary" @click="hideDropdown(task._id)">Add Task</button>
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
      showDropdown() {
        var element = document.getElementById("createListDropdown")
        element.classList.remove("hideCreateTask")
        document.getElementById("createTaskForm").reset()
      },
      hideDropdown(id) {
        console.log(id)
        var element = document.getElementById("createListDropdown")
        element.classList.add("hideCreateTask")
      },
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
  .hideCreateTask {
    display: none;
  }
</style>