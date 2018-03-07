<template>
  <div class="home">
    <navbar></navbar>
    <div class="container-fluid">
      <div class="row">
        <div class="col-12 d-flex justify-content-end">
          <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle m-2" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true"
              aria-expanded="false">
              Add A Board
            </button>
            <div class="dropdown-menu">
              <form class="px-4 py-3" @submit.prevent="createBoard">
                <div class="form-group">
                  <label for="board-title">Title</label>
                  <input v-model="board.title" type="text" class="form-control" id="board-title" placeholder="Title">
                </div>
                <button type="submit" class="btn btn-primary">Add Board</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div class="card boardCard">
        <div class="card-header">
          <h5>My Boards</h5>
        </div>
        <div class="card-body">
          <ul class="list-group list-group-flush">
            <li class="list-group-item" v-for="board in boards">
              <router-link :to="{name: 'Board', params: {boardId: board._id}}">
                <strong>{{board.title}}</strong>
                <p>Created: {{board.created}}</p>
              </router-link>
                <i class="fas fa-times-circle" @click="deleteBoard(board)"></i>
            </li>
          </ul>
        </div>
      </div>

    </div>
  </div>

</template>

<script>
  import Router from '../router'
  import Boards from './Boards.vue'
  import Navbar from './Navbar.vue'
  export default {
    name: 'Home',
    mounted() {
    },
    data() {
      return {
        board: {}
      }

    },
    methods: {
      logout() {
        this.$store.dispatch('logout')
      },
      createBoard() {
        this.$store.dispatch('createBoard', this.board)
      },
      deleteBoard(board) {
        this.$store.dispatch('deleteBoard', board)
      }
    },
    computed: {
      user() {
        return this.$store.state.user
      },
      boards() {
        return this.$store.state.boards
      }
    },
    components: {
      Boards,
      Navbar
    }
  }
</script>

<style scoped>
  .home {
    background-color: whitesmoke;
    height: 100vh;
  }

  .boardCard {
    margin: 2rem;
    width: 25rem;
    border: 2px solid black;
    border-radius: 4px;
  }
</style>