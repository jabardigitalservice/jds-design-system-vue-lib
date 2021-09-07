<template>
  <button 
  :class="[{
    'jds-button': true,
    'font-sans-1': true,
  }, classVariant, customClass]"
  @click="onButtonClick"
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
     * Class for custom style passed the component
     */
    classes: {
      type: Object
    },
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
    customClass(){
      const { button } = this.classes || {}
      if(button){
        return button
      }
      return ''
    },
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
  methods: {
    onButtonClick(e){
      this.emitClick(e)
    },
    emitClick(value){
      /**
       * Emitted when button is click
       */
      this.$emit('click', value)
    }
  }
}
</script>

<style lang="scss">
@import "./Button.scss";
</style>
