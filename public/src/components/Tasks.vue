<template>
  <div class="tasks">
    <div class="card">
      <div class="card-header">
        <h5>{{task.title}}</h5>
      </div>
      <div class="card-body">
        <p>{{task.description}}</p>
        <!-- <div v-for="comment in comments">
          <p>{{user.userName}}</p>
          <p>{{comment.comment}}</p>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Tasks',
    props: ['task'],
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
      }
    }
  }
</script>

<style scoped>
</style>