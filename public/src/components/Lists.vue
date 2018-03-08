<template>
  <div class="lists card" droppable="true" v-on:drop.capture="changeList" ondragover="event.preventDefault()">
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
    <div :key="task._id" v-for="task in tasks" class="taskTitle">
      <Tasks :task="task"></Tasks>
    </div>
    <form class="addTaskForm" @submit.prevent="createTask" id="addTaskForm">
      <input v-model="task.title" type="text" class="form-control formBox" id="task-title" placeholder="New Task">
      <button type="submit" class="btn">
        <i class="fas fa-plus"></i>
      </button>
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
          listId: this.list._id,
        }
      }
    },
    methods: {
      createTask(task) {
        this.$store.dispatch('createTask', this.task)
        this.task = {}
      },
      deleteList(list) {
        this.$store.dispatch('deleteList', list)
      },
      showDropdown() {
        var element = document.getElementById("createListDropdown")
        element.classList.remove("hideCreateTask")
        document.getElementById("addTaskForm").reset()
      },
      hideDropdown(id) {
        console.log(id)
        var element = document.getElementById("createListDropdown")
        element.classList.add("hideCreateTask")
      },
      editList(list) {
        this.$store.dispatch('editList', list)
      },
      changeList(event) {
        var movingTask = JSON.parse(event.dataTransfer.getData('text/javascript'))
        this.$store.dispatch('changeList', { task: this.task, movingTask })
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
  .lists {
    margin-bottom: 2rem;
    margin-top: 1rem;
    width: 25rem;
    border-radius: 4px;
  }

  .hideCreateTask {
    display: none;
  }

  .card-header {
    display: inline-flex;
    justify-content: space-between;
    align-items: center;
    background-color: rgba(211,126,102, .8);
  }

  .listIcons {
    display: block;
  }

  .taskTitle {
    margin: .5rem;
    margin-bottom: .2rem;
  }

  .addTaskForm {
    display: inline-flex;
    justify-content: space-between;
  }

  .formBox {
    border: 0;
    box-shadow: none;
  }
</style>