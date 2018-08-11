<template>
  <div class="container-fluid">
    <div class="row">
    </div>
  </div><!-- // .container -->

</template>
<script>
  export default {
    name: 'Dashboard',
    mounted: function () {
      this.$store.commit('sidebar', this.$route.meta.mini);
      this.$store.commit('heading', "Dashboard");
    }
  }
</script>
<style></style>
