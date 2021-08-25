<template>
  <p class="jds-form-control-helper-text">
    <slot></slot>
  </p>  
</template>

<style lang="scss">
@use '../../../styles/scss/variables' as V;

.jds-form-control-helper-text {
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
  font-size: 13px;
  line-height: 23px;
  margin: 0;
  padding: 0;
  color: V.$gray-700;
}
</style>
