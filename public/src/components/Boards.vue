<template>
    <div class="boards">
        <navbar></navbar>
        <div class="container-fluid">
            <div class="row">
                <div class="col-sm-12">
                    <h3>{{board.title}}</h3>
                    <div class="dropdown">
                        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" @click="showDropdown">
                            Add A List
                        </button>
                        <div class="dropdown-menu" id="createListDropdown">
                            <form class="px-4 py-3" @submit.prevent="createList" id="createListForm">
                                <div class="form-group">
                                    <label for="list-title">Title</label>
                                    <input v-model="list.title" type="text" class="form-control" id="list-title" placeholder="Title">
                                </div>
                                <div class="form-group">
                                    <label for="list-description">Description</label>
                                    <input v-model="list.description" type="text" class="form-control" id="list-description" placeholder="Description">
                                </div>
                                <button type="submit" class="btn btn-primary" @click="hideDropdown">Add List</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-3"  v-for="list in lists">
                    <lists :list='list'></lists>
                </div>
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
            this.$store.dispatch('getLists', this.$route.params.boardId)
        },
        data() {
            return {
                list: {boardId: this.$route.params.boardId}
            }
        },
        methods: {
            createList(list){  
                this.$store.dispatch('createList', this.list)
            },
            showDropdown(){
                var element = document.getElementById("createListDropdown")
                element.classList.remove("hideCreateList")
                document.getElementById("createListForm").reset()
            },
            hideDropdown(){
                var element = document.getElementById("createListDropdown")
                element.classList.add("hideCreateList")
            },
        },
        computed: {
            user() {
                return this.$store.state.user
            },
            board() {
                return this.$store.state.activeBoard
            },
            lists(){
                return this.$store.state.boardLists
            }
        },
        components: {
            Lists,
            Navbar
        }
    }
</script>
<style scoped>
    .hideCreateList{
        display: none;
    }
</style>