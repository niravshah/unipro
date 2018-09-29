<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-12">
        <vue-tabs @tab-change="tabChanged" v-if="items.length>0">
          <v-tab v-for="item in items" :title="'' + item.inventory_id" v-bind:key="item.inventory_id">


            <div v-if="item.Item" class="u-m-small">


              <div class="row u-mt-medium u-mb-medium">
                <div class="col-md-6">
                  <span class="c-toolbar__state-title"><small>{{item.Location.description}}</small></span>
                  <h2 class="c-navbar__title u-mr-auto">{{item.Item.description}}</h2>
                  <span class="c-toolbar__state-title"><small>{{item.Item.product_code}}</small> | <small>{{item.Item.gtin}}</small></span>

                </div>
                <div class="col-md-6">
                  <div align="right">
                    <button v-if="!edit" @click="editForm(item.inventory_id)" class="c-btn c-btn--small">
                      Edit {{item.inventory_id}}
                    </button>
                    <button v-if="!edit" @click="deleteForm(item)" class="c-btn c-btn--small">
                      Delete {{item.inventory_id}}
                    </button>
                    <button v-if="edit" @click="saveForm(item.inventory_id, item)"
                            class="c-btn c-btn--small c-btn--success">
                      Save {{item.inventory_id}}
                    </button>
                    <button v-if="edit" @click="cancelEdit(item.inventory_id)"
                            class="c-btn c-btn--small c-btn--secondary">
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-4">
                  <stats faclass="fa-box-open" :value=item.current_level :description=getCurrentLevels(item)></stats>
                </div>
                <div class="col-md-4">
                  <stats faclass="fa-pound-sign" :value=item.min_level description="Spend YTD"></stats>
                </div>
                <div class="col-md-4">
                  <stats faclass="fa-box" :value=item.max_level description="Orders YTD"></stats>
                </div>
              </div><!-- .row -->
              <div class="row">
                <div class="col-md-6">
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
                      <formp id="input181" :error=error :edit=false description="NHS eClass"
                             :model="item.Item.nhs_eclass"
                             @fromp="function(newval){item.Item.nhs_eclass=newval}"></formp>
                    </div>
                    <div class="col-md-8">
                      <formp id="input191" :error=error :edit=edit description="GTIN"
                             :model="item.Item.gtin"
                             @fromp="function(newval){item.Item.gtin=newval}"></formp>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-4">
                      <formp id="input212" :error=error :edit=false description="Cost Centre"
                             :model="item.CostCentre.cost_centre"
                             @fromp="function(newval){item.CostCentre.cost_centre=newval}"></formp>
                    </div>
                    <div class="col-md-8">
                      <formp id="input223" :error=error :edit=edit description="Description"
                             :model="item.CostCentre.description"
                             @fromp="function(newval){item.CostCentre.description=newval}"></formp>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-4">
                      <formp id="input213" :error=error :edit=false description="Location Id"
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
                      <formp id="input214" :error=error :edit=false description="Manufacturer Id"
                             :model="item.Item.Manufacturer.id"
                             @fromp="function(newval){item.Item.Manufacturer.id=newval}"></formp>
                    </div>
                    <div class="col-md-8">
                      <formp id="input225" :error=error :edit=edit description="Name"
                             :model="item.Item.Manufacturer.name"
                             @fromp="function(newval){item.Item.Manufacturer.name=newval}"></formp>
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
                </div>
                <div class="col-md-6">
                  <div class="c-card u-p-medium u-mb-medium">
                    <div class="u-flex u-justify-between u-align-items-center">
                      <h3 class="c-card__title" style="color: black">Usage Trends</h3>
                    </div>
                    <line-chart :data=usageData></line-chart>
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
        usageData: []
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

      this.getUsageData(this.ids);
    },
    methods: {
      getCurrentLevels: function (item) {
        return "Min: " + item.min_level + " Max: " + item.max_level;
      },
      editForm: function () {
        this.edit = true;
      },
      saveForm: function (stock_id, item) {
        this.edit = false;
        Service.update(stock_id, item).then(resp => {
          console.log("Stock Update Response: ", resp)
        }).catch(err => {
          console.log("Stock Update Error: ", error);
        });
      },
      cancelEdit: function (stock_id) {
        this.edit = false;
      },
      tabChanged: function (parms) {
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
      },
      getUsageData: async function (ids) {
        Service.getUsageDetails(ids).then(resp => {
          this.usageData = resp.data[ids[0]]
        }).catch(err => {
        })
      }
    }
  }

</script>
<style>
</style>
