<template>
  <div class="c-field u-mb-small">
    <label class="c-field__label" :for="id">{{description}}</label>
    <p v-if="!edit">{{model}}</p>
    <input v-if="edit" class="c-input" :id="id" type="text"
           v-model="model">
    <small v-if="error" class="c-field__message u-color-success">
      <i class="fa fa-check-circle"></i>Positive Feedback
    </small>
  </div>
</template>
<script>
  export default {
    name: 'Formp',
    props: ['description', 'model', 'edit', 'error', 'id'],
    data: function () {
      return {
        selRows: []
      }
    }
  }
</script>
