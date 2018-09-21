<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-12">
        <vue-tabs @tab-change="tabChanged" v-if="items.length>0">
          <v-tab v-for="item in items" :title="'' + item.id" v-bind:key="item.id">
            <div align="right" class="u-mt-medium">
              <button v-if="!edit" @click="editForm(item.id)" class="c-btn c-btn--small">Edit {{item.id}}
              </button>
              <button v-if="!edit" @click="deleteForm(item)" class="c-btn c-btn--small">
                Delete {{item.id}}
              </button>
              <button v-if="edit" @click="saveForm(item.id, item)" class="c-btn c-btn--small c-btn--success">
                Save {{item.id}}
              </button>
              <button v-if="edit" @click="cancelEdit(item.id)" class="c-btn c-btn--small c-btn--secondary">
                Cancel
              </button>
            </div>

            <div v-if="item.Product" class="u-m-small">
              <div class="row">
                <div class="col-md-2">
                  <formp id="input18" :error=error :edit=edit description="Product Code"
                         :model="item.Product.product_code"
                         @fromp="function(newval){item.Product.product_code=newval}"></formp>
                </div>
                <div class="col-md-4">
                  <formp id="input19" :error=error :edit=edit description="Product"
                         :model="item.Product.description"
                         @fromp="function(newval){item.Product.description=newval}"></formp>
                </div>
              </div>
              <div class="row">
                <div class="col-md-2">
                  <formp id="input21" :error=error :edit=edit description="Location Id"
                         :model="item.Location.location_id"
                         @fromp="function(newval){item.Location.location_id=newval}"></formp>
                </div>
                <div class="col-md-4">
                  <formp id="input22" :error=error :edit=edit description="Location"
                         :model="item.Location.description"
                         @fromp="function(newval){item.Location.description=newval}"></formp>
                </div>
              </div>
              <div class="row">
                <div class="col-md-2">
                  <formp id="input23" :error=error :edit=edit description="Current Level"
                         :model="item.current_level" @fromp="function(newval){item.current_level=newval}"></formp>
                </div>
                <div class="col-md-2">
                  <formp id="input24" :error=error :edit=edit description="Max"
                         :model="item.max_level" @fromp="function(newval){item.max_level=newval}"></formp>
                </div>
                <div class="col-md-2">
                  <formp :error=error :edit=edit description="Min"
                         :model="item.min_level" @fromp="function(newval){item.min_level=newval}"></formp>
                </div>

              </div>
            </div>
          </v-tab>
        </vue-tabs>
      </div>
    </div>
  </div>


</template>
<script>
  import Service from "@/services/StockService"
  import ToastedService from "../../services/ToastedService";
  import Formp from '../_partials/_formp.vue'
  export default {
    name: 'StockDetails',
    components: {
      Formp,
    },
    data: function () {
      return {
        testProp: 'Test Val',
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
      Service.getByIds(this.ids).then(resp => {
        this.items = resp.data.rows;
      }).catch(ex => {
        console.log(ex)
      });
    },
    methods: {
      editForm: function () {
        this.edit = true;
      },
      saveForm: function (stock_id, item) {
        console.log("saveForm", stock_id, item);
        this.edit = false;
        Service.update(stock_id, item).then(resp => {
          console.log("Stock Update Response: ", resp)
        }).catch(err => {
          console.log("Stock Update Error: ", error);
        });
      },
      cancelEdit: function (stock_id) {
        console.log("cancelEdit", stock_id);
        this.edit = false;
      },
      tabChanged: function (parms) {
        console.log("tabChanged", parms);
        this.edit = false;
      },
      deleteForm: async function (item) {
        Service.delete(item.stock_id).then(resp => {
          ToastedService.showInfo("Delete Successful", 2000);
          this.$router.push({name: 'Goods'})
        }).catch(err => {
          if (err.response) {
            ToastedService.showError("Could not delete." + err.response.data.message, 2000)
          } else {
            ToastedService.showError("Could not delete." + err.message, 2000)
          }
        })
      }
    }
  }

</script>
<style>
</style>
