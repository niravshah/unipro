<template>
  <div>
    <sidebar-component mini=false></sidebar-component>
    <main class="o-page__content">
      <header-component></header-component>

      <router-view></router-view>
    </main><!-- // .o-page__content -->

  </div>
</template>
<script>
  import Header from "@/components/Header"
  import Sidebar from "@/components/Sidebar"
  export default {
    name: 'Home',
    components: {
      "header-component": Header,
      "sidebar-component": Sidebar
    },
    data: function () {
      return {
        error: null
      }
    }
    ,
    methods: {}
  }
</script>
<style>

</style>
