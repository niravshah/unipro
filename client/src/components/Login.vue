<template>
  <div class="u-mt-xlarge o-page__card o-page__card--horizontal">
    <div class="c-card c-login-horizontal">
      <div class="c-login__content-wrapper">
        <header class="c-login__header">
          <a class="c-login__icon c-login__icon--rounded c-login__icon--left" href="#!">
            <img src="/static/img/logo-login.svg" alt="Dashboard's Logo">
          </a>

          <h2 class="c-login__title">Sign In</h2>
        </header>

        <form class="c-login__content">
          <div class="c-field u-mb-small">
            <label class="c-field__label" for="email">Email Address</label>
            <input class="c-input" type="email" id="email" name="email"
                   placeholder="user@uniproc.com" v-model="user.email" v-validate="'required'">
            <small v-show="errors.has('email')" class="c-field__message u-color-danger">
              <i class="fa fa-times-circle"></i>{{ errors.first('email') }}
            </small>
          </div>

          <div class="c-field u-mb-small">
            <label class="c-field__label" for="password">Password</label>
            <input class="c-input" type="password" id="password" name="password" placeholder="password"
                   v-model="user.password" v-validate="'required'">
            <small v-show="errors.has('password')" class="c-field__message u-color-danger">
              <i class="fa fa-times-circle"></i>{{ errors.first('password') }}
            </small>

          </div>

          <button v-on:click.prevent="login" class="c-btn c-btn--success c-btn--fullwidth" type="submit">Sign in
          </button>
        </form>
      </div>

      <div class="c-login__content-image">
        <img src="/static/img/login2.jpg" alt="Welcome to Dashboard UI Kit">

        <h3>Welcome to Workspace</h3>
        <p class="u-text-large">
          An interface designed for freelancers to help them manage their work and clients. Created with Dashboard UI Kit.</p>
      </div>
    </div>
  </div>
</template>
<script>
  import Login from '@/services/LoginService'
  import ToastedService from '@/services/ToastedService'

  export default {
    name: 'Login',
    data: function () {
      return {
        user: {}
      }
    },
    methods: {
      login: function () {
        this.$validator.validateAll().then(result => {
          if (!result) {
            ToastedService.showError("Please input all required data", 4000)
          } else {
            Login.login(this.user).then(response => {
              this.$store.commit('setLoggedIn');
              this.$ls.set('jwt', response.data.token);
              this.$router.push(this.$route.query.redirect || '/')
            }).catch(err => {
              if (err.response) {
                ToastedService.showError("Unable to Login. " + err.response.data.message, 4000)
              } else {
                ToastedService.showError("Unable to Login. " + err.message, 4000)
              }
            });
          }
        });
      }
    }
  }
</script>
<style></style>
