<template>
  <table class="jds-simple-table font-sans-1">
    <slot></slot>
  </table>
</template>

<script>
export default {
  name: 'jds-simple-table',
}
</script>

<style lang="scss" scoped>
@use "./SimpleTable.scss";
</style>
