<template>
  <div class="home">
    <navbar></navbar>
    <div class="dropdown">
      <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true"
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
    <div v-for="board in boards">
      <!-- Boards Go Here -->
      <boards :board='board'></boards>
    </div>
  </div>

</template>

<script>
  import Router from '../router'
  import Boards from './Boards.vue'
  import Navbar from './Navbar.vue'
  export default {
    name: 'Home',
    data() {
      return {
        board: {}
      }

    },
    methods: {
      updateUser() {
        this.$store.dispatch('updateUser', this.newUserData)
      },
      logout() {
        this.$store.dispatch('logout')
      },
      createBoard(){
        this.$store.dispatch('createBoard', this.board)
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
</style>