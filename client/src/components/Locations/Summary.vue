<template>
  <div class="container-fluid">

    <page-actions :pageActions="pageActions"></page-actions>
    <summary-table :columns="columns"
                   :rows="rows"
                   :select-options="{ enabled: true }"
                   :search-options="{ enabled: true }"
                   :tableActions="tableActions"
                   @details="getDetails"
                   @onRowClick="onRowClick"></summary-table>
  </div>

</template>
<script>
  import SchemaService from "@/services/SchemaService"
  import LocationService from "@/services/LocationService"
  import SummaryTable from "../_partials/_summary";
  import PageActions from "../_partials/_page-actions";
  export default {
    components: {SummaryTable, PageActions},
    name: 'Locations',
    data: function () {
      return {
        supplierFilter: 0,
        locationFilter: 0,
        columns: [],
        rows: [],
        tableActions: [{name: 'Details', event: 'details'}],
        pageActions: [{title: "Add New Location", routerLink: "AddLocations"}, {
          title: "Upload Locations",
          routerLink: "UploadLocations"
        }]
      };
    },
    created: function () {
      this.getLocationSchema();
      this.getLocationData();
    },
    mounted: function () {
      this.$store.commit('sidebar', this.$route.meta.mini);
      this.$store.commit('heading', "Manage Locations");
    },
    methods: {
      filterRecords: function () {
        console.log("Filter Records", this.supplierFilter, this.locationFilter)
      },
      async getLocationSchema () {
        //const response = await SchemaService.fetchLocationSchema();
        this.columns = [
          {
            label: 'Location Id',
            field: 'id',
            type: 'Number',
            excelUpload: false,
            summaryScreen: true,
            mDef: {type: 'Number', field_name: 'location_id'}
          },
          {
            label: 'Description',
            field: 'description',
            excelUpload: true,
            summaryScreen: true,
            mDef: {type: 'String', required: false, field_name: 'description'}
          },
          {
            label: 'GS1 GLN',
            field: 'gs1_gln',
            excelUpload: true,
            summaryScreen: true,
            mDef: {type: 'String', required: false, field_name: 'gs1_gln'}
          }
        ]
      },
      async getLocationData () {
        const response = await LocationService.fetchLocations();
        this.rows = response.data
      },
      getDetails(data){
        var url = 'locations/details?ids=';
        data.forEach(record => {
          url = url + record.id + ","
        });
        url = url.replace(/,\s*$/, "");
        this.$router.push(url);
      },
      onRowClick(params){
        this.getDetails([params.row]);
      }
    }

  }
</script>
<style></style>
