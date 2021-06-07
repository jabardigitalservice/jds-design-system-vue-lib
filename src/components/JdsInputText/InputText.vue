<template>
  <input type="text" :placeholder="placeholder" @click="onClick">
</template>
<script>
export default {
  name: 'jds-text-input',
  props:{
    placeholder:{
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