<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  import router from './router'
export default {
  name: 'App',
  mounted(){
    this.$store.dispatch('authenticate')
  }
}
</script>

<style>
.fa-times-circle:hover{
  color: rgba(255, 0, 0, .7)
}
.fa-edit:hover{
  color: rgba(0, 26, 255, 0.7);
}
.dropdown-menu {
    width: 20rem;
}
</style>
