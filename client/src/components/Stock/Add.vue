<template>
  <div class="container-fluid">
    <div class="row">
    <h2>Add New Location</h2>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'AddStock',
    mounted: function () {
      this.$store.commit('sidebar', this.$route.meta.mini);
      this.$store.commit('heading', "Add New Stock Item");
    },
    methods: {

    },
    data: function () {
      return {

      }
    }
  }
</script>
<style></style>
