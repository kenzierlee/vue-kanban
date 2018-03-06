<template>
    <div class="boards">
        <navbar></navbar>
        <div class="container">
            <div class="row">
                <div class="col-sm-12">
                    <h3>{{board.title}}</h3>
                    <div class="dropdown">
                        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true"
                            aria-expanded="false">
                            Add A List
                        </button>
                        <div class="dropdown-menu">
                            <form class="px-4 py-3" @submit.prevent="createList">
                                <div class="form-group">
                                    <label for="list-title">Title</label>
                                    <input v-model="list.title" type="text" class="form-control" id="list-title" placeholder="Title">
                                </div>
                                <div class="form-group">
                                    <label for="list-description">Description</label>
                                    <input v-model="list.description" type="text" class="form-control" id="list-description" placeholder="Description">
                                </div>
                                <button type="submit" class="btn btn-primary">Add List</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row" v-for="list in lists">
                <lists :list='list'></lists>
            </div>
        </div>
    </div>
</template>
<script>
    import Router from '../router'
    import Lists from './Lists.vue'
    import Navbar from './Navbar.vue'
    export default {
        name: 'Boards',
        mounted(){
            this.$store.dispatch('getLists', this.board._id)
        },
        data() {
            return {
                list: {}
            }
        },
        methods: {
            createList(list){
                list.boardId = this.board._id
                this.$store.dispatch('createList', this.list)
            }
        },
        computed: {
            user() {
                return this.$store.state.user
            },
            board() {
                return this.$store.state.activeBoard
            },
            lists(){
                return this.$store.state.lists
            }
        },
        components: {
            Lists,
            Navbar
        }
    }
</script>
<style scoped>
</style>