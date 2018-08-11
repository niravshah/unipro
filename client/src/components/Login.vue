<template>
  <div class="login-container">
    <div class="u-mt-xlarge o-page__card o-page__card--horizontal">
      <div class="c-card c-login-horizontal">
        <div class="c-login__content-wrapper">
          <header class="c-login__header">
            <a class="c-login__icon c-login__icon--rounded c-login__icon--left" href="#!">
              <img src="/static/img/logo.png" alt="Dashboard's Logo">
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
          <img src="/static/img/login2.png" alt="Welcome to Uniprocure">

          <!--
                    <h3>Welcome to Uniprocure</h3>
                    <p class="u-text-large">
                      GS1 compliant Inventory & Catalogue Management System for NHS Trusts.</p>
          -->
        </div>
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
<style>
  .c-login-horizontal .c-login__icon {
    background: none;
  }

  .c-login-horizontal .c-login__content-image img {
    opacity: 1;
  }

  .c-login-horizontal .c-login__content-image {
    background-color: #ffffff;
  }

  .login-container {
    height: 100vh;
    background-image: url("/static/img/login-bg-1.jpg");
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    padding-top: 60px;
  }
</style>
