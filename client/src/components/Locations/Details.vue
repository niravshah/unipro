<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-12">

        <vue-tabs @tab-change="tabChanged">

          <v-tab class="u-p-medium" v-for="item in items" :title="'' + item.id" :key="item.id">

            <div align="right" class="u-mt-small">
              <button v-if="!edit" @click="editForm(item)" class="c-btn c-btn--small">
                Edit {{item.id}}
              </button>
              <button v-if="edit" @click="saveForm(item)" class="c-btn c-btn--small c-btn--success">
                Save {{item.id}}
              </button>
              <button v-if="edit" @click="cancelEdit(item.id)" class="c-btn c-btn--small c-btn--secondary">
                Cancel
              </button>
            </div>

            <div class="row u-mt-small">
              <div class="col-md-3">
                <div class="c-field u-mb-small">
                  <label class="c-field__label" for="location_id">Location Id</label>
                  <p id="location_id">{{item.id}}</p>
                </div>
              </div>
              <div class="col-md-3">
                <div class="c-field u-mb-small">
                  <label class="c-field__label" for="gs1_gln">GS1 GLN</label>
                  <p v-if="!edit">{{item.gs1_gln}}</p>
                  <input v-if="edit" class="c-input" id="gs1_gln" type="text" placeholder="GLN"
                         v-model="upd.gs1_gln">
                  <small v-show="errors.has('gs1_gln')" class="c-field__message u-color-success">
                    <i class="fa fa-times-circle"></i>{{ errors.first('gs1_gln') }}
                  </small>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-8">
                <div class="c-field">
                  <label class="c-field__label" for="input14">Item Description</label>
                  <p v-if="!edit">{{item.description}}</p>
                  <input v-if="edit" class="c-input" id="input14" type="text" placeholder="Description"
                         v-model="upd.description">
                  <small v-show="errors.has('description')" class="c-field__message u-color-success">
                    <i class="fa fa-times-circle"></i>{{ errors.first('description') }}
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
  import LocationService from "@/services/LocationService"
  import ToastedService from "../../services/ToastedService";

  export default {
    name: 'LocationDetails',
    data: function () {
      return {
        ids: [],
        items: [],
        edit: false,
        error: false,
        upd: {},
        fields: []
      }
    },
    mounted: function () {
      this.$store.commit('sidebar', this.$route.meta.mini);
      this.$store.commit('heading', "Location Details");
    },
    created: function () {
      this.getData();
    },
    methods: {
      editForm: function (item) {
        this.edit = true;
        this.upd = JSON.parse(JSON.stringify(item));
      },
      saveForm: function (item) {
        this.edit = false;
        LocationService.updateLocation(item.location_id, this.upd).then(resp => {
          ToastedService.showInfo("Location Updated", 2000);
          this.getData();
        }).catch(err => {
          if (err.response) {
            ToastedService.showError("Could not update this Location." + err.response.data.message, 2000)
          } else {
            ToastedService.showError("Could not update this Location." + err.message, 2000)
          }
        })
      },
      cancelEdit: function (location_id) {
        this.upd = {};
        this.edit = false;
      },
      tabChanged: function (parms) {
        console.log("tabChanged", parms);
        this.edit = false;
      },
      getData: function () {
        this.ids = this.$route.query.ids.split(',');
        this.ids.forEach(id => {
          this.items.push({location_id: id});
        });
        LocationService.getLocationDetailsByIds(this.ids).then(resp => {
          this.items = resp.data
        }).catch(ex => {
          console.log(ex)
        });

      }
    }
  }

</script>
<style>
</style>
