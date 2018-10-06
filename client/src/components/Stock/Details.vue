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
                  <stats :inv_id="item.inventory_id" faclass="fa-box-open" :value=item.current_level
                         :description=getCurrentLevels(item)
                         counters=1 @counterUp="counterUp" @counterDown="counterDown"></stats>
                </div>
                <div class="col-md-4">
                  <stats :inv_id="item.inventory_id" faclass="fa-box" :value=orders description="Orders"
                         counters=0></stats>
                </div>
                <div class="col-md-4">
                  <stats :inv_id="item.inventory_id" faclass="fa-pound-sign" :value=spendValue description="Spend"
                         counters=0></stats>
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
                  <div class="row u-mt-small">
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
                      <formp id="input212" :error=error :edit=false description="Cost Centre"
                             :model="item.CostCentre.cost_centre"
                             @fromp="function(newval){item.CostCentre.cost_centre=newval}"></formp>
                    </div>
                    <div class="col-md-4">
                      <formp id="input223" :error=error :edit=edit description="Description"
                             :model="item.CostCentre.description"
                             @fromp="function(newval){item.CostCentre.description=newval}"></formp>
                    </div>
                    <div class="col-md-4">
                      <formp id="input181" :error=error :edit=false description="NHS eClass"
                             :model="item.Item.nhs_eclass"
                             @fromp="function(newval){item.Item.nhs_eclass=newval}"></formp>
                    </div>

                  </div>
                  <div class="row u-mt-medium">
                    <div class="col-md-12">
                      <div class="c-card c-card--responsive u-mb-medium">
                        <div class="c-card__header c-card__header--transparent o-line">
                          <h5 class="c-card__title">Bar Codes</h5>
                          <a class="c-card__meta" href="#">Add New</a>
                        </div>

                        <table class="c-table u-border-zero">
                          <tbody>
                          <tr class="c-table__row u-border-top-zero">
                            <td class="c-table__cell">
                              <div class="u-flex u-align-items-center">
                                <span class="u-text-bold">Minnie Ferguson</span>
                              </div>
                            </td>
                            <td class="c-table__cell">New Website</td>
                            <td class="c-table__cell u-text-right">
                              <span class="u-text-bold">$150</span>
                            </td>
                            <td class="c-table__cell u-text-right">
                              <span class="u-text-mute">3 Days ago</span>
                            </td>
                          </tr>

                          <tr class="c-table__row">
                            <td class="c-table__cell">
                              <div class="u-flex u-align-items-center">
                                <span class="u-text-bold">Minnie Ferguson</span>
                              </div>
                            </td>
                            <td class="c-table__cell">New Website</td>
                            <td class="c-table__cell u-text-right">
                              <span class="u-text-bold">$150</span>
                            </td>
                            <td class="c-table__cell u-text-right">
                              <span class="u-text-mute">3 Days ago</span>
                            </td>
                          </tr>

                          <tr class="c-table__row">
                            <td class="c-table__cell">
                              <div class="u-flex u-align-items-center">
                                <span class="u-text-bold">Minnie Ferguson</span>
                              </div>
                            </td>
                            <td class="c-table__cell">New Website</td>
                            <td class="c-table__cell u-text-right">
                              <span class="u-text-bold">$150</span>
                            </td>
                            <td class="c-table__cell u-text-right">
                              <span class="u-text-mute">3 Days ago</span>
                            </td>
                          </tr>

                          </tbody>
                        </table>

                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="row">
                    <div class="col-md-12">
                      <div class="c-card u-p-medium u-mb-medium">
                        <line-chart :data=usageData></line-chart>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-12">
                      <div class="c-card c-card--responsive u-mb-medium">

                        <table class="c-table u-border-zero">
                          <tbody>
                          <tr class="c-table__row u-border-top-zero">
                            <td class="c-table__cell">
                              <div class="u-flex u-align-items-center">
                                <span class="u-text-bold">Last 7 days</span>
                              </div>
                            </td>
                            <td class="c-table__cell">New Website</td>
                            <td class="c-table__cell u-text-right">
                              <span class="u-text-bold">$150</span>
                            </td>
                            <td class="c-table__cell u-text-right">
                              <span class="u-text-mute">3 Days ago</span>
                            </td>
                          </tr>

                          <tr class="c-table__row">
                            <td class="c-table__cell">
                              <div class="u-flex u-align-items-center">
                                <span class="u-text-bold">Last 30 days</span>
                              </div>
                            </td>
                            <td class="c-table__cell">New Website</td>
                            <td class="c-table__cell u-text-right">
                              <span class="u-text-bold">$150</span>
                            </td>
                            <td class="c-table__cell u-text-right">
                              <span class="u-text-mute">3 Days ago</span>
                            </td>
                          </tr>
                          <tr class="c-table__row">
                            <td class="c-table__cell">
                              <div class="u-flex u-align-items-center">
                                <span class="u-text-bold">Last 6 months</span>
                              </div>
                            </td>
                            <td class="c-table__cell">New Website</td>
                            <td class="c-table__cell u-text-right">
                              <span class="u-text-bold">$150</span>
                            </td>
                            <td class="c-table__cell u-text-right">
                              <span class="u-text-mute">3 Days ago</span>
                            </td>
                          </tr>
                          <tr class="c-table__row">
                            <td class="c-table__cell">
                              <div class="u-flex u-align-items-center">
                                <span class="u-text-bold">Last 1 year</span>
                              </div>
                            </td>
                            <td class="c-table__cell">New Website</td>
                            <td class="c-table__cell u-text-right">
                              <span class="u-text-bold">$150</span>
                            </td>
                            <td class="c-table__cell u-text-right">
                              <span class="u-text-mute">3 Days ago</span>
                            </td>
                          </tr>
                          </tbody>
                        </table>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row u-mt-medium">
                <div class="col-md-12">
                  <div class="catalogue c-card c-card--responsive u-mb-medium">
                    <div class="c-card__header c-card__header--transparent o-line">
                      <h5 class="c-card__title">Catalogue Information</h5>
                    </div>

                    <table class="c-table u-border-zero">
                      <thead>
                      <th>Supplier Name</th>
                      <th>Current Price</th>
                      <th>Min Order</th>
                      <th>Lead Time</th>
                      <th>Carriage Charge</th>
                      <th>Updated</th>
                      </thead>
                      <tbody>
                      <tr v-for="cR in catalogueRows" class="c-table__row">
                        <td class="c-table__cell">{{cR.Supplier.name}}</td>
                        <td class="c-table__cell">{{cR.current_price}}</td>
                        <td class="c-table__cell">{{cR.min_order}}</td>
                        <td class="c-table__cell">{{cR.order_lead_time}}</td>
                        <td class="c-table__cell">{{formatCurrency(carriageCharges[cR.supplier_id])}}</td>
                        <td class="c-table__cell">{{cR.updatedAt | moment('from')}}</td>
                      </tr>
                      </tbody>
                    </table>
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
  import OrderService from "@/services/OrderService";

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
        pids: [],
        items: [],
        edit: false,
        error: false,
        orders: 0,
        spend: 0,
        usageData: [],
        catalogueRows: [],
        carriageCharges: {}
      }
    },
    computed: {
      spendValue: function () {
        return "£" + this.spend.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
      }
    },
    mounted: function () {
      this.$store.commit('sidebar', this.$route.meta.mini);
      this.$store.commit('heading', "Stock Details");
    },
    created: function () {
      var _this = this;
      this.ids = this.$route.query.ids.split(',');
      this.ids.forEach(id => {
        this.items.push({stock_id: id});
      });
      Service.getByIds(this.ids).then(resp => {
        this.items = resp.data.rows;
        this.items.forEach(item => {
          _this.pids.push(item.item_id);
        });

        this.getOrders(_this.pids);
        this.getCatalogueInfo(_this.pids);

      }).catch(ex => {
        console.log(ex)
      });


      this.getUsageData(this.ids);
    },
    methods: {
      formatCurrency: function (num) {
        return "£" + num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
      },
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
      },
      getOrders: async function (ids) {
        var _this = this;
        Service.getOrders(ids).then(resp => {
          this.orders = resp.data.count;
          resp.data.rows.forEach(order => {
            _this.spend += order.amount;
          })
        }).catch(err => {
        })
      },
      getCatalogueInfo: async function (ids) {
        var _this = this;
        Service.getCatalogueInfo(ids).then(resp => {
          this.catalogueRows = resp.data.cats.rows;
          resp.data.cc.rows.forEach(row => {
            _this.carriageCharges[row.supplier_id] = row.current_price;
          })

        }).catch(err => {
          console.log("ERROR: getCatalogueInfo: ", err);
        })
      },
      counterUp: function (params) {
        console.log("Counter Up Event", params);
        Service.counterUp(params).then(resp => {
        }).catch(err => {
          console.log("ERROR: counterUp: ", err);
        })
      },
      counterDown: function (params) {
        console.log("Counter Down Event", params);
        Service.counterDown(params).then(resp => {
        }).catch(err => {
          console.log("ERROR: counterDown: ", err);
        })
      }
    }
  }

</script>
<style>
  .catalogue .c-table th {
    text-align: center;
    color: #7f8fa4;
    font-size: .875rem;
    font-weight: 400;
  }

  .catalogue .c-table__cell {
    text-align: center;
    padding: 20px 0 20px 0px;
  }

  .catalogue .c-table__cell:last-child {
    padding-right: 0rem;
  }

</style>
