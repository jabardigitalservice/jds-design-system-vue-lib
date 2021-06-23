<template>
  <button 
  :class="['jds-button font-sans-1', classVariant]"
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
      return 'jds-button--'+this.variant;
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
