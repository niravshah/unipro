<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-12">
        <vue-tabs @tab-change="tabChanged">
          <v-tab v-for="item in items" :title="'' + item.stock_id" v-bind:key="item.stock_id">
            <div align="right" class="u-mt-medium">
              <button v-if="!edit" @click="editForm(item.stock_id)" class="c-btn c-btn--small">Edit {{item.stock_id}}
              </button>
              <button v-if="edit" @click="saveForm(item.stock_id)" class="c-btn c-btn--small c-btn--success">
                Save {{item.stock_id}}
              </button>
              <button v-if="edit" @click="cancelEdit(item.stock_id)" class="c-btn c-btn--small c-btn--secondary">
                Cancel
              </button>
            </div>

            <div class="u-m-small">
              <div class="col-md-4">
                <div class="c-field u-mb-small">
                  <label class="c-field__label" for="input14">Stock Id</label>
                  <p v-if="!edit">{{item.stock_id}}</p>
                  <input v-if="edit" class="c-input" id="input15" type="text" placeholder="Clark"
                         :value="item.stock_id">
                  <small v-if="error" class="c-field__message u-color-success">
                    <i class="fa fa-check-circle"></i>Positive Feedback
                  </small>
                </div>

                <div class="c-field">
                  <label class="c-field__label" for="input14">Item Description</label>
                  <p v-if="!edit">{{item.item_description}}</p>
                  <input v-if="edit" class="c-input" id="input14" type="text" placeholder="Clark"
                         :value="item.item_description">
                  <small v-if="error" class="c-field__message u-color-success">
                    <i class="fa fa-check-circle"></i>Positive Feedback
                  </small>
                </div>
              </div>
              <div class="col-md-4"></div>
              <div class="col-md-4"></div>
            </div>
          </v-tab>
        </vue-tabs>
      </div>
    </div>
  </div>


</template>
<script>
  import StockService from "@/services/StockService"
  export default {
    name: 'StockDetails',
    data: function () {
      return {
        ids: [],
        items: [],
        edit: false,
        error: false
      }
    },
    mounted: function () {
      this.$store.commit('sidebar', this.$route.meta.mini);
      this.$store.commit('heading', "Stock Details");
    },
    created: function () {
      this.ids = this.$route.query.ids.split(',');
      this.ids.forEach(id => {
        this.items.push({stock_id: id});
      });
      StockService.getStockDetailsByIds(this.ids).then(resp => {
        this.items = resp.data
      }).catch(ex => {
        console.log(ex)
      });
    },
    methods: {
      editForm: function (stock_id) {
        console.log("editForm", stock_id);
        this.edit = true;
      },
      saveForm: function (stock_id) {
        console.log("saveForm", stock_id);
        this.edit = false;
      },
      cancelEdit: function (stock_id) {
        console.log("cancelEdit", stock_id);
        this.edit = false;
      },
      tabChanged: function (parms) {
        console.log("tabChanged", parms);
        this.edit = false;
      }
    }
  }

</script>
<style>
</style>
