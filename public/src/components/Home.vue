<template>
  <div class="home">
    <navbar></navbar>
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-12 d-flex justify-content-end">
          <div class="dropdown dropleft">
            <button class="btn addBoardBtn dropdown-toggle m-2" type="button" id="addBoard" data-toggle="dropdown">
              Add A Board
            </button>
            <div class="dropdown-menu" id="addBoard">
              <form class="px-4 py-3" @submit.prevent="createBoard">
                <div class="form-group">
                  <input v-model="board.title" type="text" class="form-control" id="board-title" placeholder="Title">
                </div>
                <button type="submit" class="btn dropdownBtn">Add Board</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div class="row boardsSection">
        <div class="col-4">
          <div class="card boardCard">
            <div class="card-header">
              <h3>My Boards</h3>
            </div>
            <div class="card-body">
              <ul class="list-group list-group-flush">
                <li class="list-group-item" v-for="board in boards">
                  <router-link :to="{name: 'Board', params: {boardId: board._id}}" class="link">
                    <strong>{{board.title}}</strong>
                  </router-link>
                  <i class="fas fa-times-circle" @click="deleteBoard(board)"></i>
                  <div class="dropdown">
                    <i class="fas fa-edit dropdown-toggle" :id="board._id" data-toggle="dropdown"></i>
                    <div class="dropdown-menu" id="board._id">
                      <form class="px-4 py-3" @submit.prevent="editBoard(board)">
                        <div class="form-group">
                          <label for="board-title">Title</label>
                          <input v-model="board.title" type="text" class="form-control" id="board-title" placeholder="Title">
                        </div>
                        <button type="submit" class="btn btn-primary">Edit Board</button>
                      </form>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="col-4">
          <div class="card boardCard">
            <div class="card-header">
              <h3>Collaboration Boards</h3>
            </div>
            <div class="card-body">
              <ul class="list-group list-group-flush">
                <li class="list-group-item" v-for="board in boards">
                  <router-link :to="{name: 'Board', params: {boardId: board._id}}" class="link">
                    <strong>{{board.title}}</strong>
                  </router-link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import Router from '../router'
  import Boards from './Board.vue'
  import Navbar from './Navbar.vue'
  export default {
    name: 'Home',
    mounted() {
      this.$store.dispatch('getBoards', this.user._id)
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
        $("#addBoard").dropdown('toggle')
      },
      editBoard(board) {
        this.$store.dispatch('editBoard', board)
        $("#" + board._id).dropdown('toggle')
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
  .boardsSection {
    justify-content: center
  }

  .addBoardBtn {
    background-color: rgb(240, 198, 148);
  }

  .addBoardBtn:hover {
    background-color: rgba(240, 198, 148, .75);

  }

  .dropdown-menu {
    width: 20rem;
    margin-right: .5rem;
  }

  .dropdownBtn {
    background-color: rgb(154, 218, 181);
  }

  .home {
    background-color: whitesmoke;
    height: 100%;
    min-height: 100vh
  }

  .hideDropdown {
    display: none
  }

  .card-header {
    display: inline-flex;
    justify-content: space-between;
    align-items: center;
    background-color: rgba(211, 126, 102, .8);
  }

  .boardCard {
    margin: 2rem;
    border: 2px solid black;
    border-radius: 4px;
  }

  .link {
    color: black
  }

  .list-group-item {
    display: block;
  }

  .list-group-item:hover {
    background-color: rgba(154, 218, 181, .75);
  }
</style>