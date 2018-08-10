<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-12">
        <vue-tabs @tab-change="tabChanged">
          <v-tab class="u-p-medium" v-for="item in items" :title="'' + item.supplier_id" v-bind:key="item.supplier_id">
            <div align="right" class="u-mt-medium">
              <button v-if="!edit" @click="editForm(item)" class="c-btn c-btn--small">
                Edit {{item.supplier_id}}
              </button>
              <button v-if="!edit" @click="deleteForm(item.supplier_id)" class="c-btn c-btn--small">
                Delete {{item.supplier_id}}
              </button>
              <button v-if="edit" @click="saveForm(item)" class="c-btn c-btn--small c-btn--success">
                Save {{item.supplier_id}}
              </button>
              <button v-if="edit" @click="cancelEdit(item.supplier_id)" class="c-btn c-btn--small c-btn--secondary">
                Cancel
              </button>
            </div>
            <div class="row u-mt-small">
              <div class="col-md-3">
                <div class="c-field u-mb-small">
                  <label class="c-field__label" for="location_id">Supplier Id</label>
                  <p id="location_id">{{item.supplier_id}}</p>
                </div>
              </div>
            </div>
            <div class="row u-mt-small">
              <div v-for="field in fields" :class="field.col">
                <div v-if="field.field_name" class="c-field u-mb-small">
                  <label class="c-field__label">{{field.title}}</label>
                  <p v-if="!edit">{{item[field.field_name]}}</p>
                  <input v-if="edit" class="c-input" id="field.field_name" type="text" placeholder="GLN"
                         v-model="upd[field.field_name]">
                  <small v-show="errors.has('field.field_name')" class="c-field__message u-color-success">
                    <i class="fa fa-times-circle"></i>{{ errors.first('field.field_name') }}
                  </small>
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
  import Service from "@/services/SupplierService"
  import ToastedService from "../../services/ToastedService";
  export default {
    name: 'SupplierDetails',
    data: function () {
      return {
        ids: [],
        items: [],
        edit: false,
        error: false,
        fields: [],
        upd: {}
      }
    },
    mounted: function () {
      this.$store.commit('sidebar', this.$route.meta.mini);
      this.$store.commit('heading', "Supplier Details");
    },
    created: function () {
      this.getVDef();
      this.getData();
    },
    methods: {
      editForm: function (item) {
        this.edit = true;
        this.upd = JSON.parse(JSON.stringify(item));
      },
      cancelEdit: function () {
        this.edit = false;
        this.upd = {};
      },
      getVDef: async function () {
        const response = await Service.vdef();
        this.fields = response.data
      },
      getData: function () {
        this.ids = this.$route.query.ids.split(',');
        this.ids.forEach(id => {
          this.items.push({stock_id: id});
        });
        Service.getByIds(this.ids).then(resp => {
          this.items = resp.data
        }).catch(ex => {
          console.log(ex)
        });
      },
      tabChanged: function (parms) {
        console.log("tabChanged", parms);
        this.edit = false;
      },
      deleteForm: function (id) {
        Service.delete(id).then(resp => {
          ToastedService.showInfo("Delete Successful", 2000);
          this.$router.push({name: 'Suppliers'})
        }).catch(err => {
          if (err.response) {
            ToastedService.showError("Could not delete this supplier." + err.response.data.message, 2000)
          } else {
            ToastedService.showError("Could not delete this supplier" + err.message, 2000)
          }

        })
      },
      saveForm: function (item) {
        this.edit = false;
        Service.update(item.supplier_id, this.upd).then(resp => {
          ToastedService.showInfo("Supplier Updated", 2000);
          this.getData();
        }).catch(err => {
          if (err.response) {
            ToastedService.showError("Could not update this Supplier." + err.response.data.message, 2000)
          } else {
            ToastedService.showError("Could not update this Supplier." + err.message, 2000)
          }
        })
      }
    }
  }

</script>
<style>
</style>
