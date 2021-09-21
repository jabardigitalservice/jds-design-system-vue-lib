<template>
  <button 
  :class="[{
    'jds-button': true,
    'font-sans-1': true,
  }, classVariant]"
  v-on="$listeners"
  >
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
    // class variant
    classVariant(){
      return {
        'jds-button--primary': this.variant === 'primary',
        'jds-button--secondary': this.variant === 'secondary',
        'jds-button--tertiary': this.variant === 'tertiary',
        'jds-button--tertiary-paddingless': this.variant === 'tertiary-paddingless',
        'jds-button--danger': this.variant === 'danger'
      }
    }
  },
}
</script>

<style lang="scss">
@use "./Button.scss";
</style>
