<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-xl-4">
        <div class="c-graph-card" data-mh="graph-cards">
          <div class="c-graph-card__content">
            <h3 class="c-graph-card__title">Next Payout</h3>
            <p class="c-graph-card__date">Activity from 4 Jan 2017 to 10 Jan 2017</p>
            <h4 class="c-graph-card__number">$2,190</h4>
            <p class="c-graph-card__status">You’ve made $230 Today</p>
          </div>

          <div class="c-graph-card__chart">
            <canvas id="js-chart-payout" width="300" height="74"></canvas>
          </div>
        </div>
      </div>

      <div class="col-xl-4">
        <div class="c-graph-card" data-mh="graph-cards">
          <div class="c-graph-card__content">
            <h3 class="c-graph-card__title">Total Earnings</h3>
            <p class="c-graph-card__date">In 15 Months</p>
            <h4 class="c-graph-card__number">$23,580</h4>
            <p class="c-graph-card__status">Last Month you’ve made $2,980</p>
          </div>

          <div class="c-graph-card__chart">
            <canvas id="js-chart-earnings" width="300" height="74"></canvas>
          </div>
        </div>
      </div>

      <div class="col-xl-4">
        <div class="c-progress-card" data-mh="graph-cards">
          <h3 class="c-progress-card__title">All Tasks Overview</h3>
          <p class="c-progress-card__date">Next 4 Weeks</p>

          <div class="c-progress-card__item">
            <div class="c-progress-card__label">Week 3</div>

            <div class="c-progress-card__progress c-progress c-progress--small">
              <div class="c-progress__bar u-bg-success" style="width:100%;">
                <div class="c-progress__bar u-bg-fancy" style="width: 70%">
                  <div class="c-progress__bar u-bg-info" style="width: 50%">
                  </div>
                </div>
              </div>
            </div>
          </div><!-- // .c-progress-card__item -->

          <div class="c-progress-card__item">
            <div class="c-progress-card__label">Week 4</div>

            <div class="c-progress-card__progress c-progress c-progress--small">
              <div class="c-progress__bar u-bg-success" style="width:100%;">
                <div class="c-progress__bar u-bg-fancy" style="width: 70%">
                  <div class="c-progress__bar u-bg-info" style="width: 50%">
                  </div>
                </div>
              </div>
            </div>
          </div><!-- // .c-progress-card__item -->

          <div class="c-progress-card__item">
            <div class="c-progress-card__label">Week 5</div>

            <div class="c-progress-card__progress c-progress c-progress--small">
              <div class="c-progress__bar u-bg-success" style="width:100%;">
                <div class="c-progress__bar u-bg-fancy" style="width: 70%">
                  <div class="c-progress__bar u-bg-info" style="width: 50%">
                  </div>
                </div>
              </div>
            </div>
          </div><!-- // .c-progress-card__item -->

          <div class="c-progress-card__item">
            <div class="c-progress-card__label">Week 6</div>

            <div class="c-progress-card__progress c-progress c-progress--small">
              <div class="c-progress__bar u-bg-success" style="width:100%;">
                <div class="c-progress__bar u-bg-fancy" style="width: 70%">
                  <div class="c-progress__bar u-bg-info" style="width: 50%">
                  </div>
                </div>
              </div>
            </div>
          </div><!-- // .c-progress-card__item -->

          <ul class="c-progress-card__legends">
            <li class="u-text-mute u-text-xsmall">
              <i class="c-progress-card__legend u-bg-fancy"></i>Progress
            </li>
            <li class="u-text-mute u-text-xsmall">
              <i class="c-progress-card__legend u-bg-info"></i>Due
            </li>
            <li class="u-text-mute u-text-xsmall">
              <i class="c-progress-card__legend u-bg-success"></i>OA
            </li>
            <li class="u-text-mute u-text-xsmall">
              <i class="c-progress-card__legend u-bg-danger"></i>Delegated
            </li>
          </ul>
        </div>
      </div>
    </div>

  </div><!-- // .container -->

</template>
<script>
  export default {
    name: 'Dashboard',
    mounted: function () {
      this.$store.commit('sidebar', this.$route.meta.mini);
      this.$store.commit('heading', "Dashboard");
    }
  }
</script>
<style></style>
