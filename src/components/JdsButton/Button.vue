<template>
  <div class="jds-button" @click="onClick">
    {{ placeholder }}
  </div>
</template>
<script>
export default {
  name: 'jds-button',
  props: {
    placeholder: {
      type: String,
      default: 'Placeholder'
    }
  },
  methods: {
    onClick () {
      this.$emit('onClick')
    }
  }
}
</script>
