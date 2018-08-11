<template>

  <div class="container-fluid">
    <page-actions :pageActions="pageActions"></page-actions>
    <!-- <div class="row u-mb-small">
       <div class="col-md-4  u-mb-medium">
         <label class="c-field__label">Filter By Location</label>
         <v-select id="input1" v-model="locationFilter" :options="['foo','bar']"></v-select>
       </div>
       <div class="col-md-6  u-mb-medium">
         <label class="c-field__label">Filter By Supplier</label>
         <v-select multiple v-model="supplierFilter" :options="['foo','bar','baz']"></v-select>
       </div>
       <div class="col-md-2  u-mb-medium">
         <a v-on:click="filterRecords" class="abs-bottom c-btn c-btn&#45;&#45;info c-btn&#45;&#45;fullwidth" style="width: 80%"
            href="#">Filter Records</a>
       </div>
     </div>-->

    <summary-table :columns="columns"
                   :rows="rows"
                   :select-options="{ enabled: true }"
                   :search-options="{ enabled: true }"
                   :tableActions="tableActions"
                   @details="getDetails"></summary-table>
  </div>
</template>
<script>

  import StockService from "@/services/StockService"
  import SummaryTable from "../_partials/_summary";
  import PageActions from "../_partials/_page-actions";

  export default {
    components: {
      PageActions,
      SummaryTable
    },
    name: 'StockSummary',
    mounted: function () {
      this.$store.commit('sidebar', this.$route.meta.mini);
      this.$store.commit('heading', "Manage Stock");
    },
    data: function () {
      return {
        supplierFilter: 0,
        locationFilter: 0,
        columns: [],
        rows: [],
        pageActions: [{title: "Add New Item", routerLink: "AddStock"}, {
          title: "Upload Items",
          routerLink: "UploadStock"
        }],
        tableActions: [{name: 'Details', event: 'details'}, {name: 'Move Stock', event: 'move'}, {
          name: 'Write Off',
          event: 'writeoff'
        }]
      };
    },
    created: function () {
      this.getStockSchema();
      this.getStockData();
    },
    methods: {
      filterRecords: function () {
        console.log("Filter Records", this.supplierFilter, this.locationFilter)
      },
      async getStockSchema () {
        const response = await StockService.schema();
        this.columns = response.data
      },
      async getStockData () {
        const response = await StockService.get();
        this.rows = response.data
      },
      getDetails(selRows){
        var url = 'stock/details?ids=';
        selRows.forEach(record => {
          url = url + record.stock_id + ","
        });

        url = url.replace(/,\s*$/, "");
        this.$router.push(url);
      }
    },
  }
</script>
<style></style>
