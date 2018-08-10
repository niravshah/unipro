<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-12">
        <vue-tabs @tab-change="tabChanged">

          <v-tab class="u-p-medium" v-for="item in items" :title="'' + item.goods_id" :key="item.gs1_gtin">

            <div align="right" class="u-mt-small">
              <button v-if="!edit" @click="editForm(item)" class="c-btn c-btn--small">
                Edit {{item.goods_id}}
              </button>
              <button v-if="!edit" @click="deleteForm(item)" class="c-btn c-btn--small">
                Delete {{item.goods_id}}
              </button>
              <button v-if="edit" @click="saveForm(item)" class="c-btn c-btn--small c-btn--success">
                Save {{item.goods_id}}
              </button>
              <button v-if="edit" @click="cancelEdit(item.goods_id)" class="c-btn c-btn--small c-btn--secondary">
                Cancel
              </button>
            </div>
            <div class="row u-mt-small">
              <div class="col-md-3">
                <div class="c-field u-mb-small">
                  <label class="c-field__label" for="location_id">Goods Id</label>
                  <p id="location_id">{{item.goods_id}}</p>
                </div>
              </div>
            </div>
            <div class="row u-mt-small">
              <div v-for="field in fields" :class="field.col">
                <div v-if="field.field_name" class="c-field u-mb-small">
                  <label class="c-field__label">{{field.title}}</label>
                  <div v-if="!edit">
                    <p v-if="field.type==='v-select'">{{getSelValue(field.field_name, item)}}</p>
                    <p v-else="">{{item[field.field_name]}}</p>
                  </div>
                  <div v-if="edit">
                    <div v-if="field.type==='v-select'">
                      <v-select v-model="upd[field.field_name]"
                                :label="field.label"
                                :options="selOptions[field.field_name]"></v-select>
                    </div>
                    <div v-else="">
                      <input class="c-input" id="field.field_name" type="text" placeholder="GLN"
                             v-model="upd[field.field_name]">
                      <small v-show="errors.has('field.field_name')" class="c-field__message u-color-success">
                        <i class="fa fa-times-circle"></i>{{ errors.first('field.field_name') }}
                      </small>
                    </div>
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
  import Service from "../../services/GoodsService";
  import ToastedService from "../../services/ToastedService";

  export default {
    name: 'GoodsDetails',
    data: function () {
      return {
        ids: [],
        items: [],
        edit: false,
        error: false,
        upd: {},
        fields: [],
        selOptions: {supplier_ref: []}
      }
    },
    mounted: function () {
      this.$store.commit('sidebar', this.$route.meta.mini);
      this.$store.commit('heading', "Goods Receipt Details");
    },
    created: function () {
      this.getVDef();
      this.getData();
    },
    methods: {
      getVDef: async function () {
        const response = await Service.getVDef();
        this.fields = response.data;
        this.getSelectOptions();
      },
      getSelectOptions: async function () {
        var _this = this;
        this.fields.forEach(function (field) {
          if (field.type === 'v-select') {
            Service.selectOptions(field.field_name).then(resp => {
              _this.selOptions[field.field_name] = resp.data.data;
            });
          }
        });
      },
      editForm: function (item) {
        this.edit = true;
        this.upd = JSON.parse(JSON.stringify(item));
      },
      getSelValue: function (field, item) {
        var val = '';
        if (item[field] != null) {
          Object.keys(item[field]).forEach(function (key) {
            if (key.indexOf('name') > 0) {
              val = item[field][key]
            }
          });
        }
        return val;
      },
      deleteForm: async function (item) {
        Service.delete(item.goods_id).then(resp => {
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
      cancelEdit: function () {
        this.upd = {};
        this.edit = false;
      },
      tabChanged: function () {
        this.edit = false;
      },
      getData: function () {
        this.items = [];
        this.ids = [];
        this.ids = this.$route.query.ids.split(',');
        this.ids.forEach(id => {
          this.items.push({goods_id: id});
        });
        Service.getByIds(this.ids).then(resp => {
          this.items = resp.data
        }).catch(ex => {
          console.log(ex)
        });
      },
      saveForm: function (item) {
        this.edit = false;
        Service.update(item.goods_id, this.upd).then(resp => {
          ToastedService.showInfo("Location Updated", 2000);
          this.getData();
        }).catch(err => {
          if (err.response) {
            ToastedService.showError("Could not update this Location." + err.response.data.message, 2000)
          } else {
            ToastedService.showError("Could not update this Location." + err.message, 2000)
          }
        })
      }
    }
  }
</script>
<style></style>
