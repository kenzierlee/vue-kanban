<template>
    <div class="boards">
        <navbar></navbar>
        <div class="container-fluid">
                <div class="row">
                  <div class="col-sm-12 d-flex justify-content-end">
                    <h3>{{board.title}}</h3>
                    <div class="dropdown dropleft">
                        <button class="btn addListBtn dropdown-toggle m-2" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true"
                            aria-expanded="false">
                            Add A List
                        </button>
                        <div class="dropdown-menu">
                            <form class="px-4 py-3" @submit.prevent="createList">
                                <div class="form-group">
                                    <input v-model="list.title" type="text" class="form-control" id="list-title" placeholder="Title">
                                </div>
                                <button type="submit" class="btn btn-primary">Add List</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-3" v-for="list in lists">
                    <lists :list='list'></lists>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import Router from '../router'
    import Lists from './List.vue'
    import Navbar from './Navbar.vue'
    export default {
        name: 'Boards',
        props: ['boardId'],
        mounted() {
            this.$store.dispatch('getLists', this.$route.params.boardId)
        },
        data() {
            return {
                list: { boardId: this.$route.params.boardId }
            }
        },
        methods: {
            createList(list) {
                this.$store.dispatch('createList', this.list)
                $('#add-list').dropdown('toggle')
            }
        },
        computed: {
            user() {
                return this.$store.state.user
            },
            board() {
                return this.$store.state.activeBoard
            },
            lists() {
                return this.$store.state.boardLists
            }
        },
        watch: {
            boardId: function (newId, oldId) {
                this.$store.dispatch('getLists', newId)
            }
        },
        components: {
            Lists,
            Navbar
        }
    }
</script>
<style scoped>
    .addListBtn {
        background-color: rgb(240, 198, 148);
    }
    .addListBtn:hover {
        background-color: rgba(240, 198, 148, .75);
    }
    .dropdown-menu {
    width: 20rem;
    margin-right: .5rem;
  }
  .boards{
    background-color: whitesmoke;
    height: 100%;
    min-height: 100vh
  }

</style>