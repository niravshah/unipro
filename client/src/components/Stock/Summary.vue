<template>

  <div class="container-fluid">
    <page-actions :pageActions="pageActions"></page-actions>
    <div class="row u-mb-small">
      <div class="col-md-8  u-mb-medium">
        <label class="c-field__label">Select Location</label>
        <v-select id="input1" v-model="locationFilter" :options="locations"></v-select>
      </div>
      <div class="col-md-2  u-mb-medium">
        <a v-on:click="filterRecords" class="abs-bottom c-btn c-btn&#45;&#45;info c-btn&#45;&#45;fullwidth"
           style="width: 80%"
           href="#">Get Records</a>
      </div>
    </div>


    <summary-table :columns="columns"
                   :rows="rows"
                   :totalRecords="totalRecords"
                   :select-options="{ enabled: true }"
                   :search-options="{ enabled: true }"
                   :tableActions="tableActions"
                   @details="getDetails"
                   @onPerPageChange="onPerPageChange"
                   @onPageChange="onPageChange"
                   @onSearchFunction="onSearchFunction"
                   @onRowClick="onRowClick"></summary-table>

  </div>
</template>
<script>

  import StockService from "@/services/StockService"
  import LocationService from "@/services/LocationService"
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
        locationFilter: 0,
        totalRecords: 0,
        locations: [],
        columns: [],
        rows: [],
        pageActions: [{title: "Add New Item", routerLink: "AddStock"}, {
          title: "Upload Items",
          routerLink: "UploadStock"
        }],
        tableActions: [{name: 'Details', event: 'details'}, {name: 'Move Stock', event: 'move'}, {
          name: 'Write Off',
          event: 'writeoff'
        }],
        totalRecords: 0,
        serverParams: {
          columnFilters: {},
          page: 1,
          perPage: 10,
          search: '',
          location_id: 0
        }
      };
    },
    created: function () {
      this.getLocations();
      this.getStockSchema();
      this.loadItems();
    },
    methods: {
      filterRecords: function () {
        console.log("Filter Records. Location Id", this.locationFilter.value);
        this.updateParams({location_id: this.locationFilter.value});
        this.loadItems();
      },
      async getLocations(){
        const response = await LocationService.fetchLocations();
        response.data.forEach(location => {
          this.locations.push({label: location.description, value: location.id})
        });
      },
      getDetails(selRows){
        var url = 'stock/details?ids=';
        selRows.forEach(record => {
          url = url + record.inventory_id + ","
        });
        url = url.replace(/,\s*$/, "");
        this.$router.push(url);
      },
      async getStockSchema () {
        // const response = await StockService.schema();
        //this.columns = response.data
        this.columns = [
          {
            label: 'Id',
            field: 'inventory_id',
            type: 'Number',
          },
          {
            label: 'Product Code',
            field: 'Item.product_code',
            type: 'String',
          },
          {
            label: 'Description',
            field: 'Item.description',
            type: 'String',
          },
          {
            label: 'Current Level',
            field: 'current_level',
            type: 'Number',
          },
          {
            label: 'Min Level',
            field: 'min_level',
            type: 'Number',
          },
          {
            label: 'Max Level',
            field: 'max_level',
            type: 'Number',
          },
          {
            label: 'Location ID',
            field: 'Location.id',
            type: String
          },
          {
            label: 'Cost Centre Code',
            field: 'CostCentre.cost_centre',
            type: String
          }
        ]
      },

      updateParams(newProps) {
        this.serverParams = Object.assign({}, this.serverParams, newProps);
      },
      onPageChange(params) {
        this.updateParams({page: params.currentPage});
        this.loadItems();
      },
      onPerPageChange(params) {
        this.updateParams({perPage: params.currentPerPage});
        this.loadItems();
      },
      onSearchFunction(params){
        this.updateParams({search: params.searchTerm});
        this.loadItems();
      },
      onRowClick(params){
        this.getDetails([params.row]);
      },
      onSortChange(params) {
        this.updateParams({
          sort: {
            type: params.sortType,
            field: this.columns[params.columnIndex].field,
          },
        });
        this.loadItems();
      },

      async loadItems() {
        const response = await StockService.get(this.serverParams);
        this.totalRecords = response.data.count;
        this.rows = response.data.rows;
      }
    },
  }
</script>
<style></style>
