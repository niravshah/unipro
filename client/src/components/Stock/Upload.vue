<template>
  <div class="container-fluid">
    <upload-info :headers="headers" :columns="columns" :dropzoneOptions="dropzoneOptions"
                 :savFn="saveUploadedData" @uploadsave="saveUploadedData"></upload-info>
  </div>
</template>
<script>
  import SchemaService from "@/services/SchemaService"
  import StockService from "@/services/StockService"
  import ToastedService from "@/services/ToastedService"
  import ConfigService from "@/services/ConfigService"
  import UploadInfo from "../_partials/_upload.vue"

  export default {
    name: 'UploadStock',
    components: {UploadInfo},
    data: function () {
      return {
        dropzoneOptions: ConfigService.dropboxOptions(),
        columns: [],
        headers: []
      }
    },
    created: function () {
      this.getStockSchema();
      this.getStockHeaders();
      this.dropzoneOptions.url = this.dropzoneOptions.url + "/stock"
    },
    mounted: function () {
      this.$store.commit('sidebar', this.$route.meta.mini);
      this.$store.commit('heading', "Upload Stock");
    },
    methods: {
      async getStockSchema () {
        const response = await SchemaService.fetchStockSchema();
        this.columns = response.data.filter(item => item.excelUpload)
      },
      async getStockHeaders () {
        const response = await SchemaService.fetchStockHeaders();
        this.headers = response.data.headers
      },
      async saveUploadedData(data){
        try {
          const response = await StockService.uploadStock(data);
          ToastedService.showInfo("Data Saved Successfully", 6000);
          this.$router.push({name: 'Stock'});

        } catch (ex) {
          ToastedService.showError("Unable to save your data. " + ex.message, 6000)
        }
      }

    }
  }
</script>
<style></style>
