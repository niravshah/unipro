<template>
  <div class="container-fluid">

    <page-actions :pageActions="pageActions"></page-actions>
    <!--div class="row">
      <div class="col-md-4  u-mb-small">
        <label class="c-field__label">Filter By Location</label>
        <v-select id="input1" v-model="locationFilter" :options="['foo','bar']"></v-select>
      </div>
      <div class="col-md-6  u-mb-medium">
        <label class="c-field__label">Filter By Supplier</label>
        <v-select multiple v-model="supplierFilter" :options="['foo','bar','baz']"></v-select>
      </div>
      <div class="col-md-2  u-mb-medium">
        <a v-on:click="filterRecords" class="abs-bottom c-btn c-btn--info c-btn--fullwidth" style="width: 80%"
           href="#">Filter Records</a>
      </div>
    </div-->
    <summary-table :columns="columns"
                   :rows="rows"
                   :select-options="{ enabled: true }"
                   :search-options="{ enabled: true }"
                   :tableActions="tableActions"
                   @details="getDetails"></summary-table>
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
        const response = await SchemaService.fetchLocationSchema();
        this.columns = response.data
      },
      async getLocationData () {
        const response = await LocationService.fetchLocations();
        this.rows = response.data
      },
      getDetails(data){
        var url = 'locations/details?ids=';
        data.forEach(record => {
          url = url + record.location_id + ","
        });
        url = url.replace(/,\s*$/, "");
        console.log(url);
        this.$router.push(url);
      }
    }

  }
</script>
<style></style>
