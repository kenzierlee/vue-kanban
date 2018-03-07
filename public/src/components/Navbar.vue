<template>
    <div class="navbar">
        <nav>
            <div class="container-fluid">
                <div class="row">
                    <div class="col-12 justify-content-space-between ">
                        <img src="../assets/red-logo.png" height="80">
                        <button @click='logout' class='btn btn-secondary'><b>Logout</b></button>
                    </div>
                </div>
            </div>
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
        background-color: rgb(193, 82, 84);
        display: flex;
        align-content: center;
        border-bottom: 3px solid #454545;
        }
</style>