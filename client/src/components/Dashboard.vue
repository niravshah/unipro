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
    <!--<div class="row u-mt-small">-->
    <!--<div class="col-lg-6">-->
    <!--<h3 class="u-mb-small">Dashboard Overview</h3>-->
    <!--<div class="c-card c-overview-card u-p-medium u-mb-medium">-->
    <!--<div class="row">-->
    <!--<div class="col-4 u-border-right">-->
    <!--<div class="c-overview-card__section">-->
    <!--<h3 class="u-mb-zero">801, 523</h3>-->
    <!--<p class="u-text-mute u-mb-small">Newsletters Sent</p>-->
    <!--<canvas id="js-chart-newsletters" width="300" height="250"></canvas>-->
    <!--</div>-->
    <!--</div>-->

    <!--<div class="col-4 u-border-right">-->
    <!--<div class="c-overview-card__section">-->
    <!--<h3 class="u-mb-zero">801, 523</h3>-->
    <!--<p class="u-text-mute u-mb-small">Newsletters Sent</p>-->
    <!--<canvas id="js-chart-subscribers" width="300" height="250"></canvas>-->
    <!--</div>-->

    <!--</div>-->

    <!--<div class="col-4">-->
    <!--<div class="c-overview-card__section">-->
    <!--<h3 class="u-mb-zero">801, 523</h3>-->
    <!--<p class="u-text-mute u-mb-small">Newsletters Sent</p>-->
    <!--<canvas id="js-chart-conversion" width="300" height="250"></canvas>-->
    <!--</div>-->
    <!--</div>-->
    <!--</div>-->

    <!--<span class="c-divider u-mv-medium u-opacity-medium"></span>-->

    <!--<div class="row">-->
    <!--<div class="col-6 col-md-3 u-border-right">-->
    <!--<div class="c-overview-card__section">-->
    <!--<p class="u-text-mute u-nospace">Open Rate</p>-->
    <!--<h3 class="u-nospace">32.21%</h3>-->

    <!--<div class="c-progress c-progress&#45;&#45;info c-progress&#45;&#45;small u-mb-zero">-->
    <!--<div class="c-progress__bar" style="width:15%;"></div>-->
    <!--</div>-->
    <!--</div>-->
    <!--</div>-->

    <!--<div class="col-6 col-md-3 u-border-right">-->
    <!--<div class="c-overview-card__section">-->
    <!--<p class="u-text-mute u-nospace">Read Rate</p>-->
    <!--<h3 class="u-nospace">75.21%</h3>-->

    <!--<div class="c-progress c-progress&#45;&#45;info c-progress&#45;&#45;small u-mb-zero">-->
    <!--<div class="c-progress__bar" style="width:75.21%;"></div>-->
    <!--</div>-->
    <!--</div>-->
    <!--</div>-->

    <!--<div class="col-6 col-md-3">-->
    <!--<div class="c-overview-card__section">-->
    <!--<p class="u-text-mute u-nospace">Attachments</p>-->
    <!--<h3 class="u-nospace">63.45%</h3>-->

    <!--<div class="c-progress c-progress&#45;&#45;info c-progress&#45;&#45;small u-mb-zero">-->
    <!--<div class="c-progress__bar" style="width:63.45%;"></div>-->
    <!--</div>-->
    <!--</div>-->
    <!--</div>-->

    <!--<div class="col-6 col-md-3 u-border-left">-->
    <!--<div class="c-overview-card__section">-->
    <!--<p class="u-text-mute u-nospace">New Subs</p>-->
    <!--<h3 class="u-nospace">72.4%</h3>-->

    <!--<div class="c-progress c-progress&#45;&#45;success c-progress&#45;&#45;small u-mb-zero">-->
    <!--<div class="c-progress__bar" style="width:72.4%;"></div>-->
    <!--</div>-->
    <!--</div>-->
    <!--</div>-->
    <!--</div>-->

    <!--</div>-->
    <!--</div>-->
    <!--<div class="col-lg-6">-->
    <!--<div class="u-flex u-justify-between">-->
    <!--<h3 class="u-mb-small">Recently Opened</h3>-->

    <!--<div class="c-field u-width-25 u-mb-small">-->
    <!--<label class="c-field__label u-hidden-visually" for="select-recently">Recently Opened</label>-->

    <!--&lt;!&ndash; Select2 jquery plugin is used &ndash;&gt;-->
    <!--<select class="c-select" name="recently-opened" id="select-recently">-->
    <!--<option value="value1">All Types</option>-->
    <!--<option value="value2">This day</option>-->
    <!--<option value="value3">Last Week</option>-->
    <!--</select>-->
    <!--</div>-->
    <!--</div>-->

    <!--<div class="c-card u-p-medium">-->
    <!--<div class="c-fileitem">-->
    <!--<div class="c-fileitem__content">-->
    <!--<div class="c-fileitem__img">-->
    <!--<img src="/static/img/recent1.jpg" alt="File's image">-->
    <!--</div>-->

    <!--<p class="c-fileitem__name">-->
    <!--<img src="/static/img/icon-pdf.svg" alt="PDF icon">Santorini.pdf-->
    <!--</p>-->
    <!--</div>-->

    <!--<div class="c-fileitem__date">-->
    <!--25MB <span class="u-hidden-down@mobile"> <i>|</i> Edited 1 minute ago</span>-->
    <!--</div>-->
    <!--</div>&lt;!&ndash; // .c-fileitem &ndash;&gt;-->

    <!--<div class="c-fileitem">-->
    <!--<div class="c-fileitem__content">-->
    <!--<div class="c-fileitem__img">-->
    <!--<img src="/static/img/recent2.jpg" alt="File's image">-->
    <!--</div>-->

    <!--<p class="c-fileitem__name">-->
    <!--<img src="/static/img/icon-pdf.svg" alt="PDF icon">Sea Presentation.pdf-->
    <!--</p>-->
    <!--</div>-->

    <!--<div class="c-fileitem__date">-->
    <!--12MB <span class="u-hidden-down@mobile"> <i>|</i> Edited 3 minute ago</span>-->
    <!--</div>-->
    <!--</div>&lt;!&ndash; // .c-fileitem &ndash;&gt;-->

    <!--<div class="c-fileitem">-->
    <!--<div class="c-fileitem__content">-->
    <!--<div class="c-fileitem__img">-->
    <!--<img src="/static/img/recent3.jpg" alt="File's image">-->
    <!--</div>-->

    <!--<p class="c-fileitem__name">-->
    <!--<img src="/static/img/icon-doc.svg" alt="PDF icon">Lakes in Austria.doc-->
    <!--</p>-->
    <!--</div>-->

    <!--<div class="c-fileitem__date">-->
    <!--25MB <span class="u-hidden-down@mobile"> <i>|</i> Edited 1 minute ago</span>-->
    <!--</div>-->
    <!--</div>&lt;!&ndash; // .c-fileitem &ndash;&gt;-->

    <!--<div class="c-fileitem">-->
    <!--<div class="c-fileitem__content">-->
    <!--<div class="c-fileitem__img">-->
    <!--<img src="/static/img/recent4.jpg" alt="File's image">-->
    <!--</div>-->

    <!--<p class="c-fileitem__name">-->
    <!--<img src="/static/img/icon-pdf.svg" alt="PDF icon">Mountain.pdf-->
    <!--</p>-->
    <!--</div>-->

    <!--<div class="c-fileitem__date">-->
    <!--54MB <span class="u-hidden-down@mobile"> <i>|</i> Edited on 11/02/2017</span>-->
    <!--</div>-->
    <!--</div>&lt;!&ndash; // .c-fileitem &ndash;&gt;-->

    <!--<div class="c-fileitem">-->
    <!--<div class="c-fileitem__content">-->
    <!--<div class="c-fileitem__img">-->
    <!--<img src="/static/img/recent5.jpg" alt="File's image">-->
    <!--</div>-->

    <!--<p class="c-fileitem__name">-->
    <!--<img src="/static/img/icon-doc.svg" alt="PDF icon">Mountains in US.doc-->
    <!--</p>-->
    <!--</div>-->

    <!--<div class="c-fileitem__date">-->
    <!--8MB <span class="u-hidden-down@mobile"> <i>|</i>Edited on 09/01/2017</span>-->
    <!--</div>-->
    <!--</div>&lt;!&ndash; // .c-fileitem &ndash;&gt;-->
    <!--</div>-->
    <!--</div>-->
    <!--</div>-->
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
