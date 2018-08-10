<template>
  <h1>Orders</h1>
</template>
<script>
    export default {
        name: 'Orders',
      mounted: function () {
        this.$store.commit('sidebar', this.$route.meta.mini);
        this.$store.commit('heading', "Manage Orders");
      }
    }
</script>
<style></style>
