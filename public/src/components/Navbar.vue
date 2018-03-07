<template>
    <div class="navbar">
        <nav>
            <span class="navbar-brand mb-0 h1">KanBan</span>
            <button @click='logout' class='btn btn-primary'>Logout</button>
        </nav>
    </div>
</template>
<script>
    export default {
        name: 'Navbar',
        methods: {
            logout() {
                this.$store.dispatch('logout')
            }
        },
        computed: {
            user(){
                return this.$store.state.user
            }
        }
    }
</script>
<style scoped>
    .navbar{
        background-color: steelblue;
        display: flex;
        align-content: center;
        border-bottom: 3px solid slategray;    }
</style>