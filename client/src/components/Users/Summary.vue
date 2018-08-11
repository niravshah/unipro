<template>
  <div class="container-fluid">
    <page-actions :pageActions="pageActions"></page-actions>
    <summary-table :columns="columns"
                   :rows="rows"
                   :select-options="{ enabled: true }"
                   :search-options="{ enabled: true }"
                   :tableActions="tableActions"
                   @deleteUser="deleteUser"></summary-table>
  </div>
</template>
<script>
  import BounceLoader from "../../../node_modules/vue-spinner/src/BounceLoader";
  import Service from "../../services/UserService";
  import ToastedService from "../../services/ToastedService";
  import SummaryTable from "../_partials/_summary";
  import PageActions from "../_partials/_page-actions";

  export default {
    name: 'UserSummary',
    components: {SummaryTable, PageActions},
    data: function () {
      return {
        columns: [],
        rows: [],
        tableActions: [{name: 'Delete', event: 'deleteUser'}],
        pageActions: [{title: "Add Users", routerLink: "AddUser"}]
      };
    },
    mounted: function () {
      this.$store.commit('sidebar', this.$route.meta.mini);
      this.$store.commit('heading', "Manage Users");
    },
    created: function () {
      this.getUserSchema();
      this.getUserData();
    },
    methods: {
      async getUserSchema () {
        const response = await Service.schema();
        this.columns = response.data
      },
      async getUserData () {
        const response = await Service.get();
        this.rows = response.data
      },
      deleteUser(data){
        var ids = [];
        data.forEach(record => {
          ids.push(record.user_id)
        });
        Service.delete(ids).then(resp => {
          this.getUserData();
        });

      }
    }
  }
</script>
<style></style>
