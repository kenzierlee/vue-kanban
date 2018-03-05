<template>
  <div class="login">
    <button type="button" class="btn location-bottom btn-lg btn-nav" data-toggle="modal" data-target="#signUp">
      <b>Sign Up</b>
    </button>
    <div class="modal fade" id="signUp" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
          </div>
          <form @submit.prevent="createUser(createdUser)">
            <div class="modal-body">
              <div>
                <i class="fas mar-right fa-1x fa-user"></i>
                <input type="text" name="username" v-model="createdUser.userName" placeholder=" Username" required>
              </div>
              <div>
                <i class="far mar-right fa-1x fa-envelope"></i>
                <input type="text" name="userEmail" v-model="createdUser.email" placeholder=" Email" required>
              </div>
              <div>
                <i class="far mar-right fa-1x fa-edit"></i>
                <input type="password" name="password" v-model="createdUser.password" placeholder=" Password">
              </div>
            </div>
            <div class="modal-footer">
              <button type="submit" class="btn btn-lg btn-primary">
                <b>Create User</b>
              </button>
              <button type="button" class="btn btn-lg btn-secondary" data-dismiss="modal">
                <b>close</b>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <button type="button" class="btn location-bottom btn-lg btn-nav" data-toggle="modal" data-target="#login">
      <b>Login</b>
    </button>
    <div class="modal fade" id="login" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
          </div>
          <form @submit.prevent="login(user)">
            <div class="modal-body">
              <div>
                <i class="far mar-right fa-1x fa-envelope"></i>
                <input type="text" name="userEmail" v-model="user.email" placeholder=" Email" required>
              </div>
              <div>
                <i class="far mar-right fa-1x fa-edit"></i>
                <input type="password" name="password" v-model="user.password" placeholder=" Password">
              </div>
            </div>
            <div class="modal-footer">
              <button type="submit" class="btn btn-lg btn-primary">
                <b>Login</b>
              </button>
              <button type="button" class="btn btn-lg btn-secondary" data-dismiss="modal">
                <b>close</b>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
  export default {
    name: 'Login',
    data() {
      return {
        user: {},
        createdUser: {}
      }
    },
    methods: {
      login() {
        this.$store.dispatch('login', this.user)
        $('#login').modal('hide')
      },
      createUser() {
        this.$store.dispatch('createUser', this.createdUser)
        $('#signup').modal('hide')
      }
    }
  }
</script>


<style scoped>
  .login {
    background-color: bisque
  }
</style>