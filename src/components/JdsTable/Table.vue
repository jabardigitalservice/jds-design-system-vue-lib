<template>
  <table class="jds-table font-sans-1">
    <slot></slot>
  </table>
</template>

<script>
export default {
  name: 'jds-table',
}
</script>

<style lang="scss">
@use "./Table.scss";
</style>
