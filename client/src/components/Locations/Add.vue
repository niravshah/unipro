<template>
  <div class="container-fluid">
    <div v-if="loader.loading" class="loading">
      <bounce-loader :loading="loader.loading" :color="loader.color" :size="loader.size"></bounce-loader>
    </div>

    <div v-if="errorMessage" class="row u-mb-medium">
      <div class="col-md-8">
        <div class="well error-well">
          <p>{{errorMessage}}</p>
        </div>
      </div>
    </div>

    <div class="row u-mb-small">
      <div class="col-md-4">
        <div class="c-field u-mb-small">
          <label class="c-field__label">Description</label>
          <input class="c-input" name="description" type="text"
                 v-model="item.description" data-vv-delay="100" v-validate="'required'">
          <small v-show="errors.has('description')" class="c-field__message u-color-danger">
            <i class="fa fa-times-circle"></i>{{ errors.first('description') }}
          </small>
        </div>
      </div>
      <div class="col-md-4">
        <div class="c-field u-mb-small">
          <label class="c-field__label" for="gs1_gln">GS1 GLN</label>
          <input class="c-input" id="gs1_gln" type="text"
                 v-model="item.gs1_gln">
        </div>
      </div>
    </div>
    <div class="row u-mb-small">
      <div class="col-md-4">
        <div class="c-field u-mb-small">
          <label class="c-field__label">Building</label>
          <input class="c-input" id="building" type="text" v-model="item.building">
        </div>
      </div>
      <div class="col-md-4">
        <div class="c-field u-mb-small">
          <label class="c-field__label" for="floor">Floor</label>
          <input class="c-input" id="floor" type="text" v-model="item.floor">
        </div>
      </div>
    </div>
    <div class="row u-mb-small">
      <div class="col-md-4">
        <div class="c-field u-mb-small">
          <label class="c-field__label">Store</label>
          <input class="c-input" id="store" name="store" type="text" v-model="item.store" v-validate="'required'">
          <small v-show="errors.has('store')" class="c-field__message u-color-danger">
            <i class="fa fa-times-circle"></i>{{ errors.first('store') }}
          </small>
        </div>
      </div>
      <div class="col-md-4">
        <div class="c-field u-mb-small">
          <label class="c-field__label" for="shelf">Shelf</label>
          <input class="c-input" id="shelf" name="shelf" type="text" v-model="item.shelf" v-validate="'required'">
          <small v-show="errors.has('shelf')" class="c-field__message u-color-danger">
            <i class="fa fa-times-circle"></i>{{ errors.first('shelf') }}
          </small>
        </div>
      </div>
    </div>
    <div class="row u-mb-small">
      <div class="col-md-8">
        <div class="c-field">
          <label class="c-field__label" for="additional_details">Additional Details</label>
          <textarea v-model="item.details" class="c-input" id="additional_details"></textarea>
        </div>
      </div>
    </div>

    <div class="row u-mb-small">
      <div class="col-md-8">
        <div align="right" class="u-mt-medium">
          <button v-on:click.prevent="saveForm()" class="c-btn c-btn--success u-mr-small">
            Save
          </button>
          <router-link :to="{name:'Locations'}" class="c-btn c-btn--secondary">
            Cancel
          </router-link>
        </div>
      </div>
    </div>
  </div>

</template>
<script>
  import BounceLoader from "../../../node_modules/vue-spinner/src/BounceLoader";
  import LocationService from "../../services/LocationService";
  import ToastedService from "../../services/ToastedService";
  export default {
    components: {BounceLoader},
    name: 'AddLocation',
    mounted: function () {
      this.$store.commit('sidebar', this.$route.meta.mini);
      this.$store.commit('heading', "Add New Location");
    },
    methods: {
      saveForm: function () {
        this.$validator.validateAll().then(result => {
          if (!result) {
            ToastedService.showError("Form not valid", 4000)
          } else {
            this.loader.loading = true;
            LocationService.addLocation(this.item).then(resp => {
              this.loader.loading = false;
              ToastedService.showInfo("Location Successfully Added", 4000)
            }).catch(ex => {
              this.loader.loading = false;
              ToastedService.showError(ex.message, 4000)
              if (ex.response.data) {
                this.errorMessage = ex.response.data.message;
              }
            });
          }
        });
      }
    },
    data: function () {
      return {
        item: {},
        errorMessage: '',
        loader: {size: '60px', color: '#5dc596', loading: false}
      }
    }
  }
</script>
<style>

</style>
