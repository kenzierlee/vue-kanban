<template>
  <div class="home">

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

    },
    computed: {
      user(){
        return this.$store.state.user
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>