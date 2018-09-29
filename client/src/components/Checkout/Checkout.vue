<template>
  <div class="container-fluid">
    <div class="row u-mt-large u-mb-large">
      <div class="col-md-12">
        <div class="c-field">
          <input :disabled=checkoutDisabled ref="barcode" v-model="barcode" class="c-input" id="input3" type="text" placeholder="Scan Your Items"
                 v-on:textInput="textInput">
        </div>
      </div>
    </div>

    <div v-if="items.length>0" class="row">
      <div class="col-md-12 u-mb-large">
        <div class="c-table-responsive@wide">
          <table class="c-table">
            <caption class="c-table__title">
              Items
            </caption>
            <thead class="c-table__head c-table__head--slim">
            <tr class="c-table__row">
              <th class="c-table__cell c-table__cell--head">Product Code</th>

              <th class="c-table__cell c-table__cell--head">Product</th>
              <th class="c-table__cell c-table__cell--head text-center">Quantity</th>
              <th class="c-table__cell c-table__cell--head">Current Level</th>
              <th class="c-table__cell c-table__cell--head">Min Level</th>

            </tr>
            </thead>

            <tbody>

            <tr v-for="item in items" class="c-table__row">
              <td class="c-table__cell">{{item.Item.product_code}}</td>
              <td class="c-table__cell">{{item.Item.description}}</td>
              <td class="c-table__cell">
                <div class="qty">
                  <span v-on:click="downQty(item)" class="minus bg-dark"> <i class="fa fa-chevron-down"></i></span>
                  <input v-model="item.qty" type="number" class="count" name="qty">
                  <span v-on:click="upQty(item)" class="plus bg-dark"><i class="fa fa-chevron-up"></i></span>
                </div>
              </td>
              <td class="c-table__cell">{{item.current_level}}</td>
              <td class="c-table__cell">{{item.min_level}}</td>
            </tr><!-- // .table__row -->
            </tbody>
          </table>
        </div><!-- // .c-card -->
      </div>
      <div class="col-md-12 text-center">
        <button :disabled=checkoutDisabled v-on:click="checkout" class="c-btn c-btn--large c-btn--success">Checkout
        </button>
      </div>
    </div><!-- // .row -->

    <div v-if="checkoutMessage" class="row u-mt-medium text-center">
      <div class="col-md-12">
        <h2>{{checkoutMessage}}</h2>
        <p v-if="checkoutError">{{checkoutError}}</p>
      </div>
    </div>

  </div>
</template>
<script>
  import Service from "@/services/StockService";
  export default {
    name: 'Checkout',
    data: function () {
      return {
        timeout: null,
        barcode: null,
        items: [],
        checkoutDisabled: false,
        checkoutMessage: null,
        checkoutError: null
      }
    },
    mounted: function () {
      this.$store.commit('sidebar', this.$route.meta.mini);
      this.$store.commit('heading', "Checkout");
      this.$refs['barcode'].focus();
    },
    methods: {
      textInput: function () {
        var _this = this;
        clearTimeout(this.timeout);
        this.timeout = setTimeout(function () {
          _this.getDetails();
          _this.barcode = "";
        }, 500);
      },
      getDetails: function () {
        var _this = this;
        Service.getByGtin(this.barcode).then(resp => {
          resp.data.rows.forEach(row => {
            row.qty = 1;
            _this.items.push(row);

          });
        }).catch(err => {
          console.log("Item Add Error", err);
        })
      },
      upQty: function (item) {
        item.qty = item.qty + 1;
      },
      downQty: function (item) {
        item.qty = item.qty - 1;
      },
      checkout: function () {
        this.checkoutDisabled = true;
        var sendObj = {};
        this.items.forEach(item => {
          sendObj[item.id] = item.qty;
        });

        Service.checkout(sendObj).then(resp => {
          this.items = [];
          this.checkoutMessage = "Checkout Successful !"
        }).catch(err => {
          this.checkoutMessage = "Error. Could not Checkout.";
          this.checkoutError = err.message;
        })
      }

    }
  }
</script>
<style>

  .c-input {
    width: 50%;
    margin: auto
  }

  .qty .count {
    color: #000;
    display: inline-block;
    vertical-align: top;
    font-size: 20px;
    line-height: 30px;
    padding: 0 2px;
    min-width: 35px;
    text-align: center;
  }

  .qty .plus {
    cursor: pointer;
    display: inline-block;
    color: #005EB8;
    text-align: center;
    line-height: 30px;
    vertical-align: middle;
  }

  .qty .minus {
    cursor: pointer;
    display: inline-block;
    color: #005EB8;
    text-align: center;
    line-height: 30px;
    vertical-align: middle;

  }

  .qty {
    text-align: center;
  }

  .minus:hover {
    color: #78BE20 !important;
  }

  .plus:hover {
    color: #78BE20 !important;
  }

  span.plus, span.minus {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
  }

  input.count {
    border: 0;
    width: 2%;
  }

  input.count::-webkit-outer-spin-button,
  input.count::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input:disabled {
    background-color: white;
  }

</style>
