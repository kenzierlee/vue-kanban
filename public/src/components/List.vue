<template>
  <div class="lists card" droppable="true" v-on:drop.capture="changeList" ondragover="event.preventDefault()">
    <div class="card-header">
      <h3>{{list.title}}</h3>
      <div class="listIcons">
        <i class="fas fa-times-circle delete-button" @click="deleteList(list)"></i>
        <div class="dropdown">
          <i class="fas fa-edit dropdown-toggle edit-button " :id="list._id" data-toggle="dropdown"></i>
          <div class="dropdown-menu dropdown-menu-right">
            <form class="px-4 py-3" @submit.prevent="editList(list)">
              <div class="form-group">
                <label for="list-title">Title</label>
                <input v-model="list.title" type="text" class="form-control" id="list-title" placeholder="Title">
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
  import Tasks from './Task'
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
        this.$store.dispatch('createTask', this.task).then(
          task.target.reset(task-title)
        )
        
      },
      deleteList(list) {
        this.$store.dispatch('deleteList', list)
      },
      editList(list) {
        this.$store.dispatch('editList', list)
        $('#' + list._id).dropdown('toggle')
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
    border-radius: 4px;
  }

  .hideCreateTask {
    display: none;
  }

  .card-header {
    display: inline-flex;
    justify-content: space-between;
    align-items: center;
    background-color: rgba(211, 126, 102, .8);
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