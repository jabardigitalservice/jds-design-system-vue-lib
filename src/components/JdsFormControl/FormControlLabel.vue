<template>
  <label class="jds-form-control-label">
    <slot></slot>
  </label>  
</template>

<style lang="scss">
@use ".~/styles/scss/variables" as V;

.jds-form-control-label {
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
  font-size: 15px;
  line-height: 23px;
  margin: 0;
  padding: 0;
  color: V.$gray-800;
}

</style>