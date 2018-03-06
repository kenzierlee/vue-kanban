<template>
  <div class="lists">
    <div class="col-3">
      <h3>{{list.title}}</h3>
      <p>
        <strong>{{list.description}}</strong>
      </p>
      <div v-for="task in tasks">
        <Tasks></Tasks>
      </div>
    </div>
  </div>
</template>

<script>
  import Task from './Tasks'
  export default {
    name: 'Lists',
    mounted() {
      this.$store.dispatch('getTasks')
    },
    data() {
      return {

      }

    },
    methods: {
      updateUser() {
        this.$store.dispatch('updateUser', this.newUserData)
      }
    },
    computed: {
      user() {
        return this.$store.state.user
      },
      tasks() {
        return this.$store.state.tasks
      }
    }
  }
</script>

<style scoped>
</style>