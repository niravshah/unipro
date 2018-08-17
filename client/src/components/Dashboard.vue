<template>
  <div class="container-fluid">
    <div class="row u-mt-small">
      <div class="col-sm-12 col-lg-6 col-xl-3">
        <div class="c-state-card" data-mh="state-cards">
          <div class="c-state-card__icon c-state-card__icon--info">
            <i class="fa fa-box"></i>
          </div>

          <div class="c-state-card__content">
            <h5 class="c-state-card__number">47
              <span class="c-state-card__status u-bg-green">
                                        <i class="fa fa-caret-up"></i>
                                    </span>
            </h5>
            <p class="c-state-card__meta">Outstanding Orders</p>
          </div>
        </div>
      </div><!-- // .col-md-3 -->
      <div class="col-sm-12 col-lg-6 col-xl-3">
        <div class="c-state-card" data-mh="state-cards">
          <div class="c-state-card__icon c-state-card__icon--fancy">
            <i class="fa fa-exclamation-triangle"></i>
          </div>

          <div class="c-state-card__content">
            <h5 class="c-state-card__number">53
              <span class="c-state-card__status u-bg-green">
                                        <i class="fa fa-caret-down"></i>
                                    </span>
            </h5>
            <p class="c-state-card__meta">Critical Level Stock</p>
          </div>
        </div>
      </div><!-- // .col-md-3 -->
      <div class="col-sm-12 col-lg-6 col-xl-3">
        <div class="c-state-card" data-mh="state-cards">
          <div class="c-state-card__icon c-state-card__icon--warning">
            <i class="fa fa-people-carry"></i>
          </div>

          <div class="c-state-card__content">
            <h5 class="c-state-card__number">12
              <span class="c-state-card__status u-bg-red">
                                       <i class="fa fa-caret-down"></i>
                                    </span>
            </h5>
            <p class="c-state-card__meta">Stock Moved</p>
          </div>
        </div>
      </div><!-- // .col-md-3 -->
      <div class="col-sm-12 col-lg-6 col-xl-3">
        <div class="c-state-card" data-mh="state-cards">
          <div class="c-state-card__icon c-state-card__icon--success">
            <i class="fa fa-plane-departure"></i>
          </div>

          <div class="c-state-card__content">
            <h5 class="c-state-card__number">16
              <span class="c-state-card__status u-bg-green">
                                        <i class="fa fa-caret-up"></i>
                                    </span>
            </h5>
            <p class="c-state-card__meta">Items on Loan</p>
          </div>
        </div>
      </div><!-- // .col-md-3 -->
    </div>
    <div class="row">
      <div class="col-xl-8">
        <div class="c-card u-p-medium u-mb-medium">
          <div class="u-flex u-justify-between u-align-items-center">
            <h3 class="c-card__title">Year To Date Spend</h3>
            <span class="u-text-small u-text-uppercase u-text-mute">August 2018</span>
          </div>
          <div class="u-mt-medium">
            <line-chart :data=spendData></line-chart>
          </div>
        </div>
      </div>

      <div class="col-xl-4">
        <div class="c-card u-p-medium u-mb-small">
          <h4 class="u-h5">Supplier Lead Times</h4>
          <div class="u-mt-medium">
            <pie-chart :data="[['Under 20 days', '20%'], ['20-40 days', '70%'],['Over 40 days', '10%']]"></pie-chart>
          </div>
        </div>
      </div>
    </div><!-- // .row -->

    <div class="row">
      <div class="col-lg-8">
        <div class="c-card c-card--responsive u-mb-medium">
          <div class="c-card__header c-card__header--transparent o-line">
            <h5 class="c-card__title">Latest Requisitions</h5>
            <div class="c-card__meta">
              <a href="#">View All</a>
            </div>
          </div>

          <table class="c-table u-border-zero">
            <tbody>
            <tr class="c-table__row u-border-top-zero">
              <td class="c-table__cell">
                <div class="u-flex u-align-items-center">
                  <div class="c-avatar c-avatar--xsmall u-mr-xsmall">
                    <img class="c-avatar__img" src="/static/img/avatar1-72.jpg" alt="Adam's face">
                  </div>
                  <span class="u-text-bold">Minnie Ferguson</span>
                </div>
              </td>
              <td class="c-table__cell">Itm 67</td>
              <td class="c-table__cell u-text-right">
                <span class="u-text-bold">£63000</span>
              </td>
              <td class="c-table__cell u-text-right">
                <span class="u-text-mute">2 Days ago</span>
              </td>
            </tr>

            <tr class="c-table__row">
              <td class="c-table__cell">
                <div class="u-flex u-align-items-center">
                  <div class="c-avatar c-avatar--xsmall u-mr-xsmall">
                    <img class="c-avatar__img" src="/static/img/avatar2-72.jpg" alt="Adam's face">
                  </div>
                  <span class="u-text-bold">Ann Hunter</span>
                </div>
              </td>
              <td class="c-table__cell">Item 4789</td>
              <td class="c-table__cell u-text-right">
                <span class="u-text-bold">£28000</span>
              </td>
              <td class="c-table__cell u-text-right">
                <span class="u-text-mute">3 Days ago</span>
              </td>
            </tr>

            <tr class="c-table__row">
              <td class="c-table__cell">
                <div class="u-flex u-align-items-center">
                  <div class="c-avatar c-avatar--xsmall u-mr-xsmall">
                    <img class="c-avatar__img" src="/static/img/avatar3-72.jpg" alt="Adam's face">
                  </div>
                  <span class="u-text-bold">Ralf Schumer</span>
                </div>
              </td>
              <td class="c-table__cell">Item 4859</td>
              <td class="c-table__cell u-text-right">
                <span class="u-text-bold">£57000</span>
              </td>
              <td class="c-table__cell u-text-right">
                <span class="u-text-mute">7 Days ago</span>
              </td>
            </tr>

            <tr class="c-table__row">
              <td class="c-table__cell">
                <div class="u-flex u-align-items-center">
                  <div class="c-avatar c-avatar--xsmall u-mr-xsmall">
                    <img class="c-avatar__img" src="/static/img/avatar4-72.jpg" alt="Adam's face">
                  </div>
                  <span class="u-text-bold">Caleb Castillo</span>
                </div>
              </td>
              <td class="c-table__cell">Item 6789</td>
              <td class="c-table__cell u-text-right">
                <span class="u-text-bold">£7000</span>
              </td>
              <td class="c-table__cell u-text-right">
                <span class="u-text-mute">8 Days ago</span>
              </td>
            </tr>
            </tbody>
          </table>

        </div>
      </div>
    </div>

  </div><!-- // .container -->

</template>
<script>
  export default {
    name: 'Dashboard',
    data: function () {
      return {
        spendData: [
          {
            name: 'Actual',
            data: {
              '2018-01-01': 100000,
              '2018-02-01': 200000,
              '2018-03-01': 250000,
              '2018-04-01': 350000,
              '2018-05-01': 550000,
              '2018-06-01': 750000,
              '2018-07-01': 850000,
              '2018-08-01': 900000
            }
          },
          {
            name: 'Forecast', data: {
            '2018-01-01': 125000, '2018-02-01': 150000, '2018-03-01': 200000, '2018-04-01': 250000,
            '2018-05-01': 300000, '2018-06-01': 350000, '2018-07-01': 400000, '2018-08-01': 500000,
            '2018-09-01': 600000, '2018-10-01': 650000, '2018-11-01': 800000, '2018-12-01': 1200000
          }
          }
        ]
      }
    },
    mounted: function () {
      this.$store.commit('sidebar', this.$route.meta.mini);
      this.$store.commit('heading', "Dashboard");
    }
  }
</script>
<style></style>
