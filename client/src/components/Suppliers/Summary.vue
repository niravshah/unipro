<template>

  <div class="container-fluid">
    <div class="row u-mb-medium">
      <div align="right" class="col-md-12">
        <router-link :to="{name:'AddSupplier'}" class="c-btn c-btn--small c-btn--success">
          Add New Supplier
        </router-link>
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

  import Service from "@/services/SupplierService"
  import SummaryTable from "@/components/_partials/_summary";

  export default {
    name: 'SuppliersSummary',
    components: {
      SummaryTable
    },
    data: function () {
      return {
        supplierFilter: 0,
        locationFilter: 0,
        tableActions: [{name: 'Details', event: 'details'}],
        totalRecords: 0,
        columns: [],
        rows: [],
        selRows: [],
        serverParams: {
          columnFilters: {},
          page: 1,
          perPage: 10,
          search: '',
          location_id: 0
        }
      };
    },
    computed: {
      excelColumns: function () {

        var cols = {};
        this.columns.forEach(record => {
          cols[record.label] = record.field;
        })
        return cols;
      }
    },
    mounted: function () {
      this.$store.commit('sidebar', this.$route.meta.mini);
      this.$store.commit('heading', "Manage Suppliers");
    },
    created: function () {
      this.getSupplierSchema();
      this.loadItems();
    },
    methods: {
      async getSupplierSchema () {
        this.columns = [
          {
            label: 'Supplier Id',
            field: 'id',
            type: 'Number',
            summaryScreen: true,
            excelUpload: false,
            mDef: {type: 'Number', field_name: 'supplier_id'}
          },
          {
            label: 'Supplier Name',
            field: 'name',
            summaryScreen: true,
            excelUpload: true,
            mDef: {type: 'String', required: true, field_name: 'supplier_name'}
          }
        ]
      },
      async loadItems() {
        const response = await Service.get(this.serverParams);
        this.totalRecords = response.data.count;
        this.rows = response.data.rows;
      },
      getDetails(rows){
        var url = 'suppliers/details?ids=';
        rows.forEach(record => {
          url = url + record.id + ","
        });

        url = url.replace(/,\s*$/, "");
        this.$router.push(url);
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
