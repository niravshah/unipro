<template>
  <div class="c-state-card" data-mh="state-cards">
    <div class="c-state-card__icon c-state-card__icon--info">
      <i class="fa" :class=faclass></i>
    </div>
    <div class="c-state-card__content">
      <h5 class="c-state-card__number" style="color: black">{{value}}
      </h5>
      <p class="c-state-card__meta">{{description}}</p>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'Stats',
    props: ['description', 'value', 'faclass'],
    methods: {}
  }
</script>
