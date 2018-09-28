<template>
  <div v-if="columns.length > 1" class="row">
    <div class="col-md-12">

      <vue-good-table
        mode="remote"
        @on-selected-rows-change="selectionChanged"
        @on-page-change="onPageChange"
        @on-per-page-change="onPerPageChange"
        @on-row-click="onRowClick"
        @on-search="onSearch"
        :columns="columns"
        :rows="rows"
        :totalRows="totalRecords"
        :pagination-options="{enabled:true}"
        :search-options="{ enabled: true, trigger:'enter', placeholder:'Press enter to search product description ' }">
        <div slot="selected-row-actions">
          <button v-for="action in tableActions" @click="emitEvent(action.event,selRows)"
                  class="c-btn c-btn--success u-mr-small">
            {{action.name}}
          </button>
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
</template>
<script>
  export default {
    name: 'SummaryTable',
    props: ['columns', 'rows', 'selectOptions', 'searchOptions', 'tableActions', 'totalRecords'],
    data: function () {
      return {
        selRows: []
      }
    },
    methods: {
      selectionChanged: function (params) {
        this.selRows = params.selectedRows;
      },
      emitEvent: function (event, data) {
        this.$emit(event, data)
      },
      onPageChange: function (data) {
        this.$emit('onPageChange', data);
      },
      onPerPageChange: function (data) {
        this.$emit('onPerPageChange', data);
      },
      onSearch: function (params) {
        this.$emit('onSearchFunction', params);
      },
      onRowClick: function (params) {
        this.$emit('onRowClick', params);
      }
    },
    computed: {
      excelColumns: function () {
        var cols = {};
        this.columns.forEach(record => {
          cols[record.label] = record.field;
        });
        return cols;
      }
    }
  }
</script>
<style></style>
