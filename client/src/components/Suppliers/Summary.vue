<template>

  <div class="container-fluid">
    <div class="row u-mb-medium">
      <div align="right" class="col-md-12">
        <router-link :to="{name:'AddSupplier'}" class="c-btn c-btn--small c-btn--success">
          Add New Supplier
        </router-link>
      </div>
    </div>
    <div v-if="columns.length > 1" class="row">
      <div class="col-md-12">
        <vue-good-table
          @on-selected-rows-change="selectionChanged"
          :columns="columns"
          :rows="rows"
          :select-options="{ enabled: true }"
          :search-options="{ enabled: true }">
          <div slot="selected-row-actions">
            <button v-on:click="getDetails" class="c-btn c-btn--success">Details</button>
          </div>
          <div slot="table-actions">
            <download-excel
              class="u-mr-small c-btn c-btn--primary c-btn--small"
              :data="rows"
              :fields="excelColumns"
              name="filename.xls">
              Download to Excel
            </download-excel>
          </div>
        </vue-good-table>
      </div>
    </div>

  </div>

</template>
<script>

  import Service from "@/services/SupplierService"


  export default {
    name: 'SuppliersSummary',
    mounted: function () {
      this.$store.commit('sidebar', this.$route.meta.mini);
      this.$store.commit('heading', "Manage Suppliers");
    },
    created: function () {
      this.getSupplierSchema();
      this.getSupplierData();
    },
    data: function () {
      return {
        supplierFilter: 0,
        locationFilter: 0,
        columns: [],
        rows: [],
        selRows: []
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
    methods: {
      selectionChanged: function (params) {
        this.selRows = params.selectedRows;
      },
      async getSupplierSchema () {
        const response = await Service.schema();
        this.columns = response.data
      },
      async getSupplierData () {
        const response = await Service.get();
        this.rows = response.data
      },
      getDetails(){
        var url = 'suppliers/details?ids=';
        this.selRows.forEach(record => {
          url = url + record.supplier_id + ","
        });

        url = url.replace(/,\s*$/, "");
        this.$router.push(url);
      }
    }
  }
</script>
<style></style>
