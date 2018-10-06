<template>
  <div>
    <div class="c-state-card" data-mh="state-cards">
      <div class="c-state-card__icon c-state-card__icon--info">
        <i class="fa" :class=faclass></i>
      </div>
      <div class="c-state-card__content">
        <h5 class="c-state-card__number" style="color: black">
          {{value}}
        </h5>
        <p class="c-state-card__meta">{{description}}</p>
      </div>
      <div class="c-state-card__counters" v-if="counters==1">
        <div v-on:click="counterUp" class="c-state-card__counter"><i class="fa fa-chevron-up"></i></div>
        <div v-on:click="counterDown" class="c-state-card__counter down"><i class="fa fa-chevron-down"></i></div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'Stats',
    props: ['description', 'value', 'faclass', 'counters', 'inv_id'],
    methods: {
      counterUp: function () {
        this.$emit("counterUp", this.inv_id)
      },
      counterDown: function () {
        this.$emit("counterDown", this.inv_id)
      }
    }
  }
</script>
<style>
  .c-state-card__counters {
    position: absolute;
    top: 0;
    right: 20px;
    font-size: 20px;
  }

  .c-state-card__counter:hover {
    color: green;
    cursor: pointer;
  }

  .c-state-card__counter.down:hover {
    color: red;
  }
</style>
