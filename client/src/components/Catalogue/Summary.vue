<template>
  <div class="container-fluid">
    <page-actions :pageActions="pageActions"></page-actions>
    <summary-table :columns="columns"
                   :rows="rows"
                   :select-options="{ enabled: true }"
                   :search-options="{ enabled: true }"
                   :tableActions="tableActions"
                   @details="getDetails"></summary-table>
  </div>
</template>
<script>
  import Service from "@/services/CatalogueService"
  import SummaryTable from "../_partials/_summary";
  import PageActions from "../_partials/_page-actions";
  export default {
    name: 'CatalogueSummary',
    components: {SummaryTable, PageActions},
    data: function () {
      return {
        columns: [],
        rows: [],
        tableActions: [{name: 'Details', event: 'details'}],
        pageActions: [{title: "Add Item", routerLink: "AddCatalogue"}]
      };
    },
    mounted: function () {
      this.$store.commit('sidebar', this.$route.meta.mini);
      this.$store.commit('heading', "Manage Catalogue");
    },
    created: function () {
      this.getGoodsSchema();
      this.getGoodsData();
    },
    methods: {
      async getGoodsSchema () {
        const response = await Service.schema();
        this.columns = response.data
      },
      async getGoodsData () {
        const response = await Service.get();
        this.rows = response.data
      },
      getDetails(data){
        var url = 'catalogue/details?ids=';
        data.forEach(record => {
          url = url + record.catalogue_id + ","
        });
        url = url.replace(/,\s*$/, "");
        this.$router.push(url);
      }
    }
  }
</script>
<style></style>
