<template>
  <div class="login-container">
    <div class="container">
      <div class="row u-pt-xlarge">
        <img class="login-logo" src="/static/img/logo-light.png" alt="Uniprocure Logo">
      </div>
    </div>

    <div class="u-mt-large o-page__card o-page__card--horizontal">
      <div class="c-card c-login-horizontal">
        <div class="c-login__content-wrapper">
          <header class="c-login__header">
            <h2 class="c-login__title">Create Account</h2>
          </header>

          <form class="c-login__content">
            <div class="c-field u-mb-small">
              <label class="c-field__label" for="email">Name</label>
              <input class="c-input" type="text" id="name" name="name"
                     placeholder="Name" v-model="user.name" v-validate="'required'">
              <small v-show="errors.has('name')" class="c-field__message u-color-danger">
                <i class="fa fa-times-circle"></i>{{ errors.first('name') }}
              </small>
            </div>

            <div class="c-field u-mb-small">
              <label class="c-field__label" for="email">Email Address</label>
              <input class="c-input" type="email" id="email" name="email"
                     placeholder="Email" v-model="user.email" v-validate="'required'">
              <small v-show="errors.has('email')" class="c-field__message u-color-danger">
                <i class="fa fa-times-circle"></i>{{ errors.first('email') }}
              </small>
            </div>

            <div class="c-field u-mb-small">
              <label class="c-field__label" for="password">Password</label>
              <input class="c-input" type="password" id="password" name="password" placeholder="Password"
                     v-model="user.password" v-validate="'required'" ref="password">
              <small v-show="errors.has('password')" class="c-field__message u-color-danger">
                <i class="fa fa-times-circle"></i>{{ errors.first('password') }}
              </small>

            </div>

            <div class="c-field u-mb-small">
              <label class="c-field__label" for="confirm_password">Confirm Password</label>
              <input class="c-input" type="password" id="confirm_password" name="confirm_password"
                     placeholder="Confirm Password"
                     v-model="user.confirm_password" v-validate="'required|confirmed:password'">
              <small v-show="errors.has('confirm_password')" class="c-field__message u-color-danger">
                <i class="fa fa-times-circle"></i>{{ errors.first('confirm_password') }}
              </small>

            </div>

            <button v-on:click.prevent="signup" class="c-btn c-btn--success c-btn--fullwidth" type="submit">
              Create Account
            </button>

          </form>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row u-pt-xlarge">
        <p class="footer">© Copyright 2018 Uniprocure - All Rights Reserved</p>
      </div>

    </div>

  </div>
</template>
<script>
  import ToastedService from '@/services/ToastedService'
  import Login from '@/services/LoginService'

  export default {
    name: 'SignUp',
    data: function () {
      return {
        user: {}
      }
    },
    methods: {
      signup: function () {
        this.$validator.validateAll().then(result => {
          if (!result) {
            ToastedService.showError("Please input all required data", 4000)
          } else {
            Login.signup(this.user).then(response => {
              ToastedService.showInfo(response.data.message, 8000, {text: 'Login', href: '#/login'});
              this.user = {}
            }).catch(err => {
              if (err.response.data) {
                if (err.response.data.message) {
                  ToastedService.showError(err.response.data.message, 5000)
                } else {
                  ToastedService.showError("Unable to Login ", 5000)
                }
              } else {
                ToastedService.showError("Unable to Login. " + err.message, 5000)
              }
            });
          }
        });
      }
    }
  }
</script>
<style>

  .login-container {
    height: 100%;
    background-color: #005EB8;
  }

  .login-logo {
    margin: auto;
  }

  .c-login-horizontal .c-login__content-wrapper {
    width: 100%
  }

  .o-page__card--horizontal {
    width: 400px;
  }

  .login-container .footer {
    margin: auto;
    color: #FFFFFF;
  }

</style>
