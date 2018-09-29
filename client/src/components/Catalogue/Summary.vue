<template>
  <div class="container-fluid">
    <page-actions :pageActions="pageActions"></page-actions>
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
  import Service from "@/services/CatalogueService"
  import SummaryTable from "../_partials/_summary";
  import PageActions from "../_partials/_page-actions";
  export default {
    name: 'CatalogueSummary',
    components: {SummaryTable, PageActions},
    data: function () {
      return {
        columns: [
          {
            label: 'Catalogue Id',
            field: 'id',
          },
          {
            label: 'Product Code',
            field: 'Item.product_code',
          },
          {
            label: 'Product',
            field: 'Item.description',
          },
          {
            label: 'Supplier',
            field: 'Supplier.name',
          },
          {
            label: 'Price',
            field: 'current_price',
          },
          {
            label: 'Contract',
            field: 'contract_ref',
          }
        ],
        rows: [],
        tableActions: [{name: 'Details', event: 'details'}],
        pageActions: [{title: "Add Item", routerLink: "AddCatalogue"}],
        totalRecords: 0,
        selRows: [],
        serverParams: {
          columnFilters: {},
          page: 1,
          perPage: 20,
          search: '',
          location_id: 0
        }
      };
    },
    mounted: function () {
      this.$store.commit('sidebar', this.$route.meta.mini);
      this.$store.commit('heading', "Manage Catalogue");
    },
    created: function () {
      this.loadItems();
    },
    methods: {
      getDetails(data){
        var url = 'catalogue/details?ids=';
        data.forEach(record => {
          url = url + record.catalogue_id + ","
        });
        url = url.replace(/,\s*$/, "");
        this.$router.push(url);
      },
      async loadItems() {
        const response = await Service.get(this.serverParams);
        this.totalRecords = response.data.count;
        this.rows = response.data.rows;
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
      }
    }
  }
</script>
<style></style>
