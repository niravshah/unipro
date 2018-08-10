<template>
  <div class="container-fluid">
    <upload-info :headers="headers" :columns="columns" :dropzoneOptions="dropzoneOptions"
                 :savFn="saveUploadedData" @uploadsave="saveUploadedData"></upload-info>
  </div>
</template>
<script>
  import SchemaService from "@/services/SchemaService"
  import LocationService from "@/services/LocationService"
  import ToastedService from "@/services/ToastedService"
  import ConfigService from "@/services/ConfigService"
  import UploadInfo from "../_partials/_upload.vue";

  export default {

    name: 'UploadLocations',
    components: {UploadInfo},
    data: function () {
      return {
        dropzoneOptions: ConfigService.dropboxOptions(),
        columns: [],
        headers: []
      }
    },
    created: function () {
      this.getLocationSchema();
      this.getLocationHeaders();
      this.dropzoneOptions.url = this.dropzoneOptions.url + "/locations"
    },
    mounted: function () {
      this.$store.commit('sidebar', this.$route.meta.mini);
      this.$store.commit('heading', "Upload Locations");
    },
    methods: {
      async getLocationSchema () {
        const response = await SchemaService.fetchLocationSchema();
        this.columns = response.data.filter(item => item.excelUpload);
      },
      async getLocationHeaders () {
        const response = await SchemaService.fetchLocationHeaders();
        this.headers = response.data.headers
      },
      async saveUploadedData(data){
        try {
          const response = await LocationService.uploadLocations(data);
          ToastedService.showInfo("Data Saved Successfully", 6000);
          this.$router.push({name: 'Locations'});
        } catch (ex) {
          ToastedService.showError("Unable to save your data. " + ex.message, 6000)
        }
      }
    }
  }
</script>
<style>

</style>
