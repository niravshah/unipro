<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-12">
        <vue-tabs @tab-change="tabChanged" v-if="items.length>0">
          <v-tab v-for="item in items" :title="'' + item.inventory_id" v-bind:key="item.inventory_id">
            <div align="right" class="u-mt-medium">
              <button v-if="!edit" @click="editForm(item.inventory_id)" class="c-btn c-btn--small">
                Edit {{item.inventory_id}}
              </button>
              <button v-if="!edit" @click="deleteForm(item)" class="c-btn c-btn--small">
                Delete {{item.inventory_id}}
              </button>
              <button v-if="edit" @click="saveForm(item.inventory_id, item)" class="c-btn c-btn--small c-btn--success">
                Save {{item.inventory_id}}
              </button>
              <button v-if="edit" @click="cancelEdit(item.inventory_id)" class="c-btn c-btn--small c-btn--secondary">
                Cancel
              </button>
            </div>

            <div v-if="item.Item" class="u-m-small">
              <div class="row">
                <div class="col-md-4">
                  <stats faclass="fa-box-open" :value=item.current_level description="Current Level"></stats>
                </div>
                <div class="col-md-4">
                  <stats faclass="fa-chevron-down" :value=item.min_level description="Minimum Level"></stats>
                </div>
                <div class="col-md-4">
                  <stats faclass="fa-chevron-up" :value=item.max_level description="Maximum Level"></stats>
                </div>

              </div><!-- .row -->
              <div class="row">
                <div class="col-md-6">
                  <div class="row">
                    <div class="col-md-4">
                      <formp id="input18" :error=error :edit=false description="Product Code"
                             :model="item.Item.product_code"
                             @fromp="function(newval){item.Item.product_code=newval}"></formp>
                    </div>
                    <div class="col-md-8">
                      <formp id="input19" :error=error :edit=edit description="Product"
                             :model="item.Item.description"
                             @fromp="function(newval){item.Item.description=newval}"></formp>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-4">
                      <formp id="input21" :error=error :edit=false description="Location Id"
                             :model="item.Location.id"
                             @fromp="function(newval){item.Location.id=newval}"></formp>
                    </div>
                    <div class="col-md-8">
                      <formp id="input22" :error=error :edit=edit description="Location"
                             :model="item.Location.description"
                             @fromp="function(newval){item.Location.description=newval}"></formp>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-4">
                      <formp id="input211" :error=error :edit=false description="Supplier Id"
                             :model="item.Supplier.id"
                             @fromp="function(newval){item.Supplier.id=newval}"></formp>
                    </div>
                    <div class="col-md-8">
                      <formp id="input221" :error=error :edit=edit description="Supplier"
                             :model="item.Supplier.name"
                             @fromp="function(newval){item.Supplier.name=newval}"></formp>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-4">
                      <formp id="input23" :error=error :edit=edit description="Current Level"
                             :model="item.current_level" @fromp="function(newval){item.current_level=newval}"></formp>
                    </div>
                    <div class="col-md-4">
                      <formp id="input24" :error=error :edit=edit description="Max"
                             :model="item.max_level" @fromp="function(newval){item.max_level=newval}"></formp>
                    </div>
                    <div class="col-md-4">
                      <formp :error=error :edit=edit description="Min"
                             :model="item.min_level" @fromp="function(newval){item.min_level=newval}"></formp>
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="c-card u-p-medium u-mb-medium">
                    <div class="u-flex u-justify-between u-align-items-center">
                      <h3 class="c-card__title">Revenue</h3>
                      <span class="u-text-small u-text-uppercase u-text-mute">January 2017</span>
                    </div>
                    <line-chart :data=spendData></line-chart>
                  </div>
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
  import Stats from "../_partials/_stats";
  export default {
    name: 'StockDetails',
    components: {
      Stats,
      Formp,
    },
    data: function () {
      return {
        testProp: 'Test Val',
        ids: [],
        items: [],
        edit: false,
        error: false,
        spendData: [
          {
            name: 'Actual',
            data: {
              '2018-01-01': 100000,
              '2018-02-01': 200000,
              '2018-03-01': 250000,
              '2018-04-01': 350000,
              '2018-05-01': 550000,
              '2018-06-01': 750000,
              '2018-07-01': 850000,
              '2018-08-01': 900000
            }
          },
          {
            name: 'Forecast', data: {
            '2018-01-01': 125000, '2018-02-01': 150000, '2018-03-01': 200000, '2018-04-01': 250000,
            '2018-05-01': 300000, '2018-06-01': 350000, '2018-07-01': 400000, '2018-08-01': 500000,
            '2018-09-01': 600000, '2018-10-01': 650000, '2018-11-01': 800000, '2018-12-01': 1200000
          }
          }
        ]
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
