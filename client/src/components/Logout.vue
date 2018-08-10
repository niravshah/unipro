<template></template>
<script>
  export default {
    name: 'Logout',
    created: function () {
      this.$ls.remove('jwt');
      this.$router.push({path: '/'});
    }
  }
</script>
<style></style>
