<template>
  <div class="row u-mb-medium">
    <div align="right" class="col-md-12">

      <router-link :key="action.routerLink" v-for="action in pageActions" :to="{name:action.routerLink}"
                   class="c-btn c-btn--success u-mr-small">
        {{action.title}}
      </router-link>


      <!--
              <router-link :to="{name:'AddStock'}" class="c-btn c-btn&#45;&#45;small c-btn&#45;&#45;success">
                Add New Item
              </router-link>
              <router-link :to="{name:'UploadStock'}" class="c-btn c-btn&#45;&#45;small c-btn&#45;&#45;success">
                Upload Items
              </router-link>
      -->
    </div>
  </div>

</template>
<script>
  export default {
    name: 'PageActions',
    props:['pageActions']
  }
</script>
<style></style>
