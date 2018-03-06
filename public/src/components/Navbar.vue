<template>
    <div class="navbar">
        <nav class="navbar navbar-light bg-light">
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
</style>