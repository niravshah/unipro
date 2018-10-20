<template>
  <header class="c-navbar u-mb-medium">
    <button class="c-sidebar-toggle u-mr-small">
      <span class="c-sidebar-toggle__bar"></span>
      <span class="c-sidebar-toggle__bar"></span>
      <span class="c-sidebar-toggle__bar"></span>
    </button><!-- // .c-sidebar-toggle -->

    <h2 class="c-navbar__title white u-mr-auto">{{heading}}</h2>

    <h3 class="c-navbar__title c-navbar__trustName white u-ml-auto u-mr-large">{{trustName}}</h3>
    <div class="c-dropdown dropdown">
      <a class="c-avatar c-avatar--xsmall has-dropdown dropdown-toggle" href="#" id="dropdwonMenuAvatar"
         data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <img class="c-avatar__img" src="/static/img/avatar-72.jpg" alt="User's Profile Picture">
      </a>

      <div class="c-dropdown__menu dropdown-menu dropdown-menu-right" aria-labelledby="dropdwonMenuAvatar">
        <a class="c-dropdown__item dropdown-item" href="#/logout">Logout</a>
      </div>
    </div>
  </header>
</template>
<script>
  export default {
    name: 'Navigation',
    computed: {
      heading: function () {
        return this.$store.state.heading
      },
      trustName: function () {
        return this.$store.state.trustName
      }
    }
  }
</script>
<style>
  .c-avatar.has-dropdown:after {
    display: block;
    padding-left: 10px;
    color: #7f8fa4;
    font-family: 'Font Awesome\ 5 Free';
    content: "\f078";
    font-weight: 900;
  }

  .c-navbar__trustName {
    font-family: 'Roboto Slab', serif;
    text-transform: inherit;
  }
</style>
