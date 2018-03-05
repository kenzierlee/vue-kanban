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

    },
    methods: {
      updateUser() {
        this.$store.dispatch('updateUser', this.newUserData)
      },
    }
  }
</script>

<style scoped>
</style>