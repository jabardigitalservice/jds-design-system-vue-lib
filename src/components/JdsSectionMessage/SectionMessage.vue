<template>
  <div :class="{
    'jds-section-message font-sans-1': primary,
    'jds-section-message--warning': warning,
    'jds-section-message--success': success,
    'jds-section-message--error': error
  }">
    <jds-icon 
      name="check-mark-circle-outline" 
      size="18px"
      class="jds-section-message__icon"
      />  
    <div class="jds-section-message__content">
      <p class="jds-section-message__content__text">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. 
        Aliquid quis sapiente expedita ullam suscipit harum asperiores quia porro libero pariatur.
      </p>
      <div class="jds-section-message__content__actions">
        <slot></slot>
      </div>
    </div>
    <jds-icon 
      name="times" 
      size="18px"
      class="jds-section-message__icon" 
    />
  </div>
</template>

<script>
import JdsIcon from '../JdsIcon'
export default {
  name: 'jds-section-message',
  components: {
    JdsIcon
  },
  props: {
    primary: {
      type: Boolean,
      default: true
    },
    warning: {
      type: Boolean
    },
    success: {
      type: Boolean
    },
    error: {
      type: Boolean
    }
  }
}
</script>

<style lang="scss" scoped>
@use "./SectionMessage.scss";
</style>
