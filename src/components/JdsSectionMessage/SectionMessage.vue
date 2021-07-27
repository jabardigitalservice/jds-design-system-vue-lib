<template>
  <div :class="[{
    'jds-section-message font-sans-1': true,
    'jds-section-message--show': mShow,
    }, classVariant]">
    <!-- <jds-icon 
      name="check-mark-circle-outline" 
      size="18px"
      class="jds-section-message__icon"
      />   -->
    <div class="jds-section-message__content">
      <p class="jds-section-message__content__text">
        {{ message }}
      </p>
      <div class='jds-section-message__content__actions'>
        <!-- 
          @slot Default slot. 
          You can insert button or link to this slot.
        -->
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
    event: 'click:close',
  },
  components: {
    JdsIcon
  },
  props: {
    /**
     * Bound model. Display the component when the value is `true`.
     * @name show
     * @model
     */
    show: {
      type: Boolean,
      default: false
    },
    /**
     * Variant of this component.
     * <br/>
     * You can use either the `primary`, `warning`, `error`, or `success`.
     */
    variant: {
      type: String,
      default: "primary"
    },
    /**
     * Add close button to the component.
     */
    dismissible: {
      type: Boolean
    },
    /**
     * Text for section message
     */
    message: {
      type: String
    }
  },
  data() {
    return {
      mShow: null
    }
  },
  computed: {
    classVariant() {
      const variant = {
        primary: 'jds-section-message--primary',
        warning: 'jds-section-message--warning',
        success: 'jds-section-message--success',
        error: 'jds-section-message--error',
      }
      return variant[this.variant?.toLowerCase()] ?? ''
    }
  },
  methods: {
    closeMessage() {
      /**
       * Emitted on click close button
       * @param {boolean} show
       */
      this.$emit('click:close', false)
    }
  }
}
</script>

<style lang="scss" scoped>
@use "./SectionMessage.scss";
</style>
