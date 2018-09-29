<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-12">
        <vue-tabs @tab-change="tabChanged">

          <v-tab class="u-p-medium" v-for="item in items" :title="'' + item.id" :key="item.id">


            <div class="row u-mt-medium u-mb-medium">
              <div v-if="item.Item" class="col-md-9">
                <div class="row">
                  <div class="col-md-12">
                    <span class="c-toolbar__state-title"><small>{{item.Supplier.name}}</small></span>
                    <h2 class="c-navbar__title u-mr-auto">{{item.Item.description}}</h2>
                    <span class="c-toolbar__state-title"><small>{{item.Item.product_code}}</small> | <small>{{item.Item.gtin}}</small></span>
                  </div>
                </div>
                <div class="row u-mt-small">
                  <div class="col-md-12">
                    <span class="c-badge c-badge--warning">{{item.contract_ref}}</span>
                  </div>
                </div>
              </div>
              <div class="col-md-2">
                <div class="c-state c-state--info">
                  <h3 class="c-state__title">Current Price</h3>
                  <h4 class="c-state__number">£{{item.current_price}}</h4>
                  <p class="c-state__status">21% Decrease</p>
                  <span class="c-state__indicator">
                            <i class="fa fa-arrow-down"></i>
                        </span>
                </div><!-- // c-state -->

              </div>
              <div class="col-md-1"></div>
            </div>

            <div class="row u-mt-small">
              <div class="col-md-6">
                <div class="row">
                  <div class="col-md-4">
                    <formp id="input1" :error=error :edit=edit description="Supplier Id"
                           :model="item.Supplier.id" @fromp="function(newval){item.Supplier.id=newval}"></formp>
                  </div>
                  <div class="col-md-8">
                    <formp id="input2" :error=error :edit=edit description="Supplier Name"
                           :model="item.Supplier.name" @fromp="function(newval){item.Supplier.name=newval}"></formp>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-4">
                    <formp id="input3" :error=error :edit=edit description="Manufacturer Id"
                           :model="item.Item.Manufacturer.id"
                           @fromp="function(newval){item.Manufacturer.id=newval}"></formp>
                  </div>
                  <div class="col-md-8">
                    <formp id="input4" :error=error :edit=edit description="Manufacturer Name"
                           :model="item.Item.Manufacturer.name"
                           @fromp="function(newval){item.Item.Manufacturer.name=newval}"></formp>
                  </div>
                </div>
                <div class="row u-mt-small">
                  <div class="col-md-12">
                    <formp id="input5" :error=error :edit=edit description="Contract Reference"
                           :model="item.contract_ref"
                           @fromp="function(newval){item.contract_ref=newval}"></formp>
                  </div>
                  <div class="col-md-4">
                    <formp id="input6" :error=error :edit=edit description="Start Date"
                           :model="item.start_date"
                           @fromp="function(newval){item.start_date=newval}"></formp>
                  </div>
                  <div class="col-md-8">
                    <formp id="input7" :error=error :edit=edit description="End Date"
                           :model="item.end_date"
                           @fromp="function(newval){item.end_date=newval}"></formp>
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
  import Service from "../../services/CatalogueService";
  import ToastedService from "../../services/ToastedService";
  import Formp from '../_partials/_formp.vue'

  export default {
    name: 'CatalogueDetails',
    components: {
      Formp,
    },
    data: function () {
      return {
        ids: [],
        items: [],
        edit: false,
        error: false,
      }
    },
    mounted: function () {
      this.$store.commit('sidebar', this.$route.meta.mini);
      this.$store.commit('heading', "Catalogue Item Details");
    },
    created: function () {
      this.getData();
    },
    methods: {

      getData: function () {
        this.items = [];
        this.ids = [];
        this.ids = this.$route.query.ids.split(',');
        this.ids.forEach(id => {
          this.items.push({catalogue_id: id});
        });
        Service.getByIds(this.ids).then(resp => {
          this.items = resp.data.rows
        }).catch(ex => {
          console.log(ex)
        });
      },
      cancelEdit: function (stock_id) {
        this.edit = false;
      },
      tabChanged: function (parms) {
        this.edit = false;
      }
    }
  }
</script>
<style></style>
