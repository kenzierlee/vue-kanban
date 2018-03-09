<template>
    <div class="navbar container-fluid">
        <div>
            <img src="../assets/red-logo.png" height="80">
            <router-link :to="{name: 'Home'}">
                <button class="btn homeBtn" v-if="$route.name != 'Home'">Home</button>
            </router-link>
            <div class="dropdown dropright d-inline-flex">
                <button class="btn chooseBoard dropdown-toggle m-1" type="button" data-toggle="dropdown" v-if="$route.name != 'Home'">
                    Change Board
                </button>
                <div class="dropdown-menu">
                    <a class="dropdown-item" v-for="board in boards">
                        <router-link :to="{name: 'Board', params: {boardId: board._id}}" class="link">
                            <p>
                                <strong>{{board.title}}</strong>
                            </p>
                        </router-link>
                    </a>
                </div>
            </div>
        </div>
        <button @click='logout' class='btn logout m-1'>
            <b>Logout</b>
        </button>
    </div>

    </div>
</template>
<script>
    import Boards from './Board.vue'
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
        align-content: center;
        border-bottom: 3px solid #454545;
        display: inline-flex;
        justify-content: space-between;
    }
    .homeBtn {
        background-color: rgb(154, 218, 181);
    }
    .homeBtn:hover {
        background-color: rgba(154, 218, 181, .75);

    }
    .logout {
        background-color: rgb(211, 126, 102);
        color: whitesmoke;
    }
    .logout:hover {
        background-color: rgba(211, 126, 102, .75);

    }
    .chooseBoard {
        background-color: rgb(240, 198, 148);
    }
    .chooseBoard:hover {
        background-color: rgba(240, 198, 148, .75);

    }
    .link {
        color: black
    }
    .dropdown-item:hover {
        background-color: rgba(154, 218, 181, .75);

    }
</style>