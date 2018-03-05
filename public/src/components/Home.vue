<template>
  <div class="home">
    <h1>THIS IS HOME!!</h1>
    <button @click='logout' class='btn btn-primary'>Logout</button>
  </div>
</template>

<script>
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
    }
  }
</script>

<style scoped>
</style>