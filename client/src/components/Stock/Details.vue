<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-12">
        <vue-tabs @tab-change="tabChanged" v-if="items.length>0">
          <v-tab v-for="item in items" :title="'' + item.inventory_id" v-bind:key="item.inventory_id">
            <div v-if="item.Item" class="u-m-small">
              <!---START : HEADER ROW --->
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
              <!---END : HEADER ROW --->
              <!---START : STATS ROW --->
              <div class="row">
                <div class="col-md-4">
                  <stats :inv_id="item.inventory_id" faclass="fa-box-open" :value=item.current_level
                         :description=formatCurrentLevels(item)
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
              </div>
              <!---END : STATS ROW --->
              <div class="row">
                <!---START : DATA --->
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
                      <formp id="input23" :error=error :edit=false description="Current Level"
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
                  <!---START : BARCODE --->
                  <div v-if="barcodes[item.inventory_id]" class="row u-mt-medium">
                    <div class="col-md-12">
                      <div class=" barcodes c-card c-card--responsive u-mb-medium">
                        <div class="c-card__header c-card__header--transparent o-line">
                          <h5 class="c-card__title">Bar Codes</h5>
                          <a v-on:click.prevent="showBarcodeModal(item.id + '-modal')" class="c-card__meta" href="#">Add New</a>
                        </div>

                        <table class="c-table u-border-zero">
                          <tbody>
                          <tr v-for="it in barcodes[item.inventory_id]" class="c-table__row u-border-top-zero">
                            <td class="c-table__cell">
                              <div class="u-flex u-align-items-center">
                                <span class="u-text-bold">{{it.description}}</span>
                              </div>
                            </td>
                            <td class="c-table__cell">{{it.barcode}}</td>
                          </tr>
                          </tbody>
                        </table>

                      </div>
                    </div>
                  </div>
                  <!---END : BARCODE --->
                </div>
                <!---END : DATA ROW --->
                <!---START : USAGE --->
                <div v-if="usageData[item.inventory_id]" class="col-md-6">
                  <div class="row">
                    <div class="col-md-12">
                      <div class="c-card u-p-medium u-mb-medium">
                        <line-chart :data=usData(item.inventory_id)></line-chart>
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
                            <td class="c-table__cell"></td>
                            <td class="c-table__cell u-text-right">
                              <span class="u-text-bold">{{usageStats[item.inventory_id]['seven_days']}}</span>
                            </td>
                            <td class="c-table__cell"></td>
                          </tr>
                          <tr class="c-table__row">
                            <td class="c-table__cell">
                              <div class="u-flex u-align-items-center">
                                <span class="u-text-bold">Last 30 days</span>
                              </div>
                            </td>
                            <td class="c-table__cell"></td>
                            <td class="c-table__cell u-text-right">
                              <span class="u-text-bold">{{usageStats[item.inventory_id]['thirty_days']}}</span>
                            </td>
                            <td class="c-table__cell"></td>
                          </tr>
                          <tr class="c-table__row">
                            <td class="c-table__cell">
                              <div class="u-flex u-align-items-center">
                                <span class="u-text-bold">Last 6 months</span>
                              </div>
                            </td>
                            <td class="c-table__cell"></td>
                            <td class="c-table__cell u-text-right">
                              <span class="u-text-bold">{{usageStats[item.inventory_id]['six_months']}}</span>
                            </td>
                            <td class="c-table__cell"></td>
                          </tr>
                          <tr class="c-table__row">
                            <td class="c-table__cell">
                              <div class="u-flex u-align-items-center">
                                <span class="u-text-bold">Last 1 year</span>
                              </div>
                            </td>
                            <td class="c-table__cell"></td>
                            <td class="c-table__cell u-text-right">
                              <span class="u-text-bold">{{usageStats[item.inventory_id]['twelve_months']}}</span>
                            </td>
                            <td class="c-table__cell"></td>
                          </tr>
                          </tbody>
                        </table>

                      </div>
                    </div>
                  </div>
                  <!---END : USAGE --->
                </div>
                <!---END : USAGE --->
              </div>
              <!---START : CATALOGUE --->
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
              <!---END : CATALOGUE --->
            </div>
            <modal v-if="item.Item" height="auto" :name="item.id + '-modal'">
              <div class="c-modal__content">
                <div class="c-modal__header">
                  <h3 class="c-modal__title">Add a New Barcode</h3>

                  <span class="c-modal__close" data-dismiss="modal" aria-label="Close">
                                        <i class="fa fa-close"></i>
                                    </span>
                </div>
                <div class="c-modal__subheader">
                  <p>{{item.Item.product_code}} - {{item.Item.description}}</p>
                </div>
                <div class="c-modal__body">
                  <div class="row u-mt-medium u-mb-medium">
                    <div class="col-md-12">
                      <div class="row">
                        <div class="col-md-7">
                          <div class="c-field">
                            <label class="c-field__label" for="input14">Scan a Barcode</label>
                            <input class="c-input" id="input14" type="text" placeholder="GTIN">
                          </div>
                        </div>
                        <div class="col-md-5">
                          <p>OR</p>
                          <button v-on:click.prevent="generateBarCode" type="button" class="c-btn c-btn--success">
                            Generate New Barcode
                          </button>
                        </div>
                      </div>
                      <div v-if="generatedBarcode != ''" class="row u-mt-medium text-center">
                        <div class="col-md-12">
                          <barcode :value=generatedBarcode format="EAN13">
                            Unable to render the generated barcode
                          </barcode>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row u-mb-medium">
                    <div class="col-md-12">
                      <div class="c-field">
                        <label class="c-field__label" for="input15">Add a Description</label>
                        <input v-model=addBarcodeDesc class="c-input" id="input15" type="text" placeholder="GTIN">
                      </div>
                    </div>
                  </div>
                </div>
                <div class="c-modal__footer">
                  <button :disabled="addBarcodeDesc==''"
                          v-on:click.precent="saveNewBarcode(item.item_id, item.supplier_id)" type="button"
                          class="c-btn c-btn--info">
                    Save
                  </button>
                  <button v-on:click.prevent="hideBarcodeModal(item.id + '-modal')" type="button"
                          class="c-btn c-btn--secondary">
                    Cancel
                  </button>
                </div>
              </div>
            </modal>
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
  import barcode from 'vue-barcode';

  export default {
    name: 'StockDetails',
    components: {
      Stats,
      Formp,
      barcode
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
        usageData: {},
        usageStats: {},
        catalogueRows: [],
        carriageCharges: {},
        barcodes: {},
        generatedBarcode: '',
        addBarcodeDesc: ''
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

      this.ids = this.$route.query.ids.split(',');
      this.ids.forEach(id => {
        this.items.push({stock_id: id});
      });
      this.loadData();
    },
    methods: {
      formatCurrency: function (num) {
        return "£" + num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
      },
      formatCurrentLevels: function (item) {
        return "Min: " + item.min_level + " Max: " + item.max_level;
      },
      usData: function (id) {
        return [this.usageData[id]];
      },
      loadData: function () {
        var _this = this;
        Service.getByIds(this.ids).then(resp => {
          this.items = resp.data.rows;
          this.items.forEach(item => {
            _this.pids.push(item.item_id);
          });
          this.getOrders(_this.pids);
          this.getCatalogueInfo(_this.pids);
          this.getBarcodes();
        }).catch(err => {
          console.log("ERROR: loadData: ", err);
        });

        this.getUsageData(this.ids);

      },
      editForm: function () {
        this.edit = true;
      },
      saveForm: function (stock_id, item) {
        this.edit = false;
        Service.update(stock_id, item).then(resp => {
          this.loadData();
        }).catch(err => {
          console.log("ERROR: saveForm: ", err);
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

          ids.forEach(id => {
            var arr = resp.data.usage[id];
            var uarr = resp.data.stats[id];
            this.usageData[id] = arr[0];
            this.usageStats[id] = uarr;
          });

        }).catch(err => {
          console.log("ERROR: getCatalogueInfo: ", err);
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
      getBarcodes: async function () {
        this.items.forEach(item => {
          Service.getBarcodes(item.item_id, item.supplier_id).then(resp => {
            console.log("getBarcodes", resp.data.count, resp.data.count.rows);
            this.barcodes[item.inventory_id] = [];
            if (resp.data.count > 0) {

              this.barcodes[item.inventory_id] = resp.data.rows;
            }
          }).catch(err => {
          });
        });
      },
      counterUp: function (params) {
        Service.counterUp(params).then(resp => {
          this.loadData();
        }).catch(err => {
          console.log("ERROR: counterUp: ", err);
        })
      },
      counterDown: function (params) {
        Service.counterDown(params).then(resp => {
          this.loadData();
        }).catch(err => {
          console.log("ERROR: counterDown: ", err);
        })
      },
      showBarcodeModal: function (id) {
        this.$modal.show(id);
      },
      hideBarcodeModal: function (id) {
        this.$modal.hide(id);
      },
      generateBarCode: function () {
        this.generatedBarcode = "123456789012";
      },
      saveNewBarcode: function (item_id, supplier_id) {
        Service.addBarcode({
          item_id: item_id,
          supplier_id: supplier_id,
          barcode: this.generatedBarcode,
          description: this.addBarcodeDesc
        }).then(resp => {
          console.log("RESP: saveNewBarcode: ", resp);
          this.addBarcodeDesc = '';
          this.generatedBarcode = '';
        }).catch(err => {
          console.log("ERROR: saveNewBarcode: ", err);
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

  .barcodes .c-card__header {
    padding: 0.5rem 1rem;
  }

  .barcodes .c-card__title {
    font-size: 1rem;
  }

</style>
