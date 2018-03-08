<template>
    <div class="navbar">
        <nav>
            <div class="container-fluid">
                <div class="row">
                    <div class="col-12 justify-content-space-between ">
                        <img src="../assets/red-logo.png" height="80">
                        <button @click='logout' class='btn btn-secondary'>
                            <b>Logout</b>
                        </button>
                        <button class="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown" v-if="$route.name != 'Home'">
                            Change Board
                        </button>
                        <div class="dropdown-menu">
                            <a class="dropdown-item" v-for="board in boards">
                                <router-link :to="{name: 'Board', params: {boardId: board._id}}">
                                    <p>
                                        <strong>{{board.title}}</strong>
                                    </p>
                                </router-link>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    </div>
</template>
<script>
    import Boards from './Boards.vue'
    export default {
        name: 'Navbar',
        methods: {
            logout() {
                this.$store.dispatch('logout')
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
            Boards
        }
    }
</script>
<style scoped>
    .navbar {
        background-color: rgb(193, 82, 84);
        display: flex;
        align-content: center;
        border-bottom: 3px solid #454545;
    }
</style>