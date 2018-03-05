<template>
  <div class="home">
<h1>THIS IS HOME!!</h1>
  </div>
</template>

<script>
  export default {
    name: 'Home',
    data() {
      return {

      }
<<<<<<< HEAD

    },
    methods: {
      updateUser() {
        this.$store.dispatch('updateUser', this.newUserData)
      },
=======
    },
    methods: {

    },
    computed: {
      user(){
        return this.$store.state.user
      }
>>>>>>> 6731f8add8d3d7f211fe0f880c9902eb433b0586
    }
  }
</script>

<style scoped>
</style>