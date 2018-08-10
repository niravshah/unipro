<template>
  <div class="container-fluid u-p-large">
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
      <div v-for="field in fields" :class="field.col">
        <div v-if="field.field_name" class="c-field u-mb-small">
          <label class="c-field__label">{{field.title}}</label>
          <input class="c-input" :name="field.field_name" :type="field.type"
                 v-model="item[field.field_name]" v-validate="field.rules">
          <small v-show="errors.has(field.field_name)" class="c-field__message u-color-danger">
            <i class="fa fa-times-circle"></i>{{ errors.first(field.field_name) }}
          </small>
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
  import Service from "../../services/GoodsService";
  import ToastedService from "../../services/ToastedService";

  export default {
    name: 'AddGoods',
    components: {BounceLoader},
    data: function () {
      return {
        item: {},
        errorMessage: '',
        loader: {size: '60px', color: '#5dc596', loading: false},
        fields: []
      }
    },
    mounted: function () {
      this.$store.commit('sidebar', this.$route.meta.mini);
      this.$store.commit('heading', "Receive Goods");
    },
    created: function () {
      this.getVDef();
    },
    methods: {
      getVDef: async function () {
        const response = await Service.getVDef();
        this.fields = response.data
      },
      saveForm: function () {
        this.$validator.validateAll().then(result => {
          if (!result) {
            ToastedService.showError("Form not valid", 4000)
          } else {
            this.loader.loading = true;
            Service.add(this.item).then(resp => {
              this.loader.loading = false;
              ToastedService.showInfo("Good Receipt Successful", 4000)
              this.$router.push({name: 'Goods'})
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
    }
  }
</script>
<style></style>
