<template>
  <div class="lists card">
    <div class="card-header">
      <h3>{{list.title}}</h3>
      <div class="listIcons">
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
      </div>
    </div>
    <p>
      <strong>{{list.description}}</strong>
    </p>
    <div :key="task._id" v-for="task in tasks">
      <Tasks :task="task"></Tasks>
    </div>
    <form class="px-4 py-3" @submit.prevent="createTask">
      <div class="form-group">
        <input v-model="task.title" type="text" class="form-control" id="task-title" placeholder="New Task">
      </div>
      <button type="submit" class="btn btn-primary" @click="hideDropdown(task._id)">Add Task</button>
    </form>
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
      editList(list) {
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
  .hideCreateTask {
    display: none;
  }

  .card-header {
    display: inline-flex;
    justify-content: space-between;
    align-items: center;
    background-color: rgba(180, 88, 87, .8)
  }

  .listIcons {
    display: block;
  }
</style>