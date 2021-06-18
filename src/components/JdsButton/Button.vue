<template>
  <button 
  class="jds-button font-sans-1"
  :class="[getClassVariant]">
    {{ label }}
    <!-- 
      @slot Use this slot for label or anything you want 
    -->
    <slot></slot>
  </button>
</template>
<script>
export default {
  name: 'jds-button',
  props: {
    /**
     * The type for the button
     * value is `button | submit`
     */
    type: {
      type: String,
      default: 'button'
    },
    /**
     * The label for the button
     */
    label: {
      type: String,
    },
    /**
     * The variant for the button
     */
    variant:{
      type: String,
      default: 'primary',
    }
  },
  computed:{
    // getclass variant
    getClassVariant(){
      return 'jds-button--'+this.variant;
    }
  },
  methods: {
  }
}
</script>

<style lang="scss">
@import "./Button.scss";
</style>
