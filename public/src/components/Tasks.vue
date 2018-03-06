<template>
    <div class="tasks">
          <div class="card">
              <div class="card-header">
                <h5>{{task.title}}</h5>
              </div>
              <div class="card-body">
                <h5 class="card-title">Special title treatment</h5>
                <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                <a href="#" class="btn btn-primary">Go somewhere</a>
                <div v-for="comment in comments">
                  <p>{{comment.comment}}</p>
                  <p>user.name</p>
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
      mounted(){
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
        tasks(){
          return this.$store.state.tasks
        }
      }
    }
  </script>
  
  <style scoped>
  </style>