<template>
  <div class="tasks">
    <div class="card">
      <div class="card-header">
        <h5>{{task.title}}</h5>
      </div>
      <div class="card-body">
        <p>{{task.description}}</p>
        <div v-for="comment in comments">
          <p>{{user.name}}</p>
          <p>{{comment.comment}}</p>
          <!-- add comment form -->
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
  export default {
    name: 'Tasks',
    mounted() {
    },
    data() {
      return {

      }

    },
    methods: {

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