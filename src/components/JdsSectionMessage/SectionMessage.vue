<template>
  <div :class="[{
    'jds-section-message font-sans-1': true,
    'jds-section-message--show': mShow,
    }, classVariant]">
    <jds-icon 
      name="check-mark-circle-outline" 
      size="18px"
      class="jds-section-message__icon"
      />  
    <div class="jds-section-message__content">
      <p class="jds-section-message__content__text">
        {{ message }}
      </p>
      <div class='jds-section-message__content__actions'>
        <slot></slot>
      </div>
    </div>
    <template v-if="dismissible">
      <jds-icon 
        name="times" 
        size="18px"
        class="jds-section-message__icon"
        @click="closeMessage" 
      />
    </template>
  </div>
</template>

<script>
import JdsIcon from '../JdsIcon'
import localCopy from '../../mixins/local-copy' 

export default {
  name: 'jds-section-message',
  mixins: [
    localCopy('show', 'mShow')
  ],
  model: {
    prop: 'show',
    event: 'change',
  },
  components: {
    JdsIcon
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    variant: {
      type: String,
    },
    dismissible: {
      type: Boolean
    },
    message: {
      type: String
    }
  },
  data() {
    return {
      mShow: true,
    }
  },
  computed: {
    classVariant() {
      const variant = {
        warning: 'jds-section-message--warning',
        success: 'jds-section-message--success',
        error: 'jds-section-message--error',
      }
      return variant[this.variant.toLowerCase()] ?? ''
    }
  },
  methods: {
    closeMessage() {
      this.$emit('change', false)
    }
  }
}
</script>

<style lang="scss" scoped>
@use "./SectionMessage.scss";
</style>
