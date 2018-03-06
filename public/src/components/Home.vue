<template>
  <div class="home">
    <navbar></navbar>
  </div>

  <!-- Boards Go Here -->

</template>

<script>
  import Router from '../router'
  import Boards from './Boards.vue'
  import Navbar from './Navbar.vue'
  export default {
    name: 'Home',
    data() {
      return {

      }

    },
    methods: {
      updateUser() {
        this.$store.dispatch('updateUser', this.newUserData)
      },
      logout(){
        this.$store.dispatch('logout')
      }
    },
    computed: {
      user() {
        return this.$store.state.user
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