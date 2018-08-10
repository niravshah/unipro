<template>
  <div>
    <div v-if="uploadMode">
      <div class="row">
        <div class="col-md-12 u-mb-medium">
          <div class="c-alert c-alert--info">
            <i class="c-alert__icon fa fa-info-circle"></i>
            Only Microsoft Excel (xlsx) files are accepted. Please make sure your file has correct headers as the first row.
          </div>
          <div v-if="error" class="c-alert c-alert--danger">
            <i class="c-alert__icon fa fa-exclamation-triangle"></i>
            {{errorMessage}}
          </div>
        </div>
      </div>
      <div v-if="uploadErrors.length > 1" class="row u-mb-medium">
        <div class="col-md-12">
          <ul class="well error-well">
            <li v-for="error in uploadErrors">{{error}}</li>
          </ul>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12 u-mb-small">
          <p>Valid Headers: <span class="c-badge c-badge--secondary u-mr-small" v-for="head in headers"
                                  :key="head">{{head}}</span>
          </p>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12 u-mb-medium">
          <v-dropzone ref="myVueDropzone" id="dropzone" :options="dropzoneOptions" @vdropzone-success="vsuccess"
                      @vdropzone-error="verror"></v-dropzone>
        </div>
      </div>
    </div>
    <div v-if="rows.length > 0" class="row">
      <div align="left" class="col-md-12 u-mb-small">
        <button @click="saveFn" class="c-btn c-btn--success">
          Save Data
        </button>
      </div>
      <div class="col-md-12 u-mb-small">
        <vue-good-table
          :columns="columns"
          :rows="rows"
          :search-options="{ enabled: true }"/>
      </div>
    </div>
  </div>
</template>
<script>
  import SchemaService from "@/services/SchemaService"
  import ToastedService from "@/services/ToastedService"
  export default {
    name: 'UploadInfo',
    props: {
      headers: {type: Array},
      dropzoneOptions: {type: Object},
      columns: {type: Array},
      savFn: {type: Function}
    },
    data: function () {
      return {
        uploadMode: true,
        error: false,
        uploadErrors: [],
        errorMessage: '',
        rows: [],
      }
    },
    methods: {
      vsuccess(file, response) {
        this.rows = response.data;
        this.uploadMode = false;
        this.error = false;
        ToastedService.showInfo("Upload Successful. Data not saved to DB. Please review the data below and save it.", 4000)
      },
      verror(file, message, xhr) {
        this.error = true;
        this.errorMessage = message.message;
        this.uploadErrors = message.errors;
      },
      saveFn: function () {
        this.$emit("uploadsave", this.rows)
      }
    }
  }
</script>
<style></style>
