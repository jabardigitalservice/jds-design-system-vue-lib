<template>
  <div class="jds-toggle__wrapper font-sans-1" :class="{'is-inline': isInline}">
    <div v-if="isLabel">
      <jds-form-control-label>
        {{ label }}
      </jds-form-control-label>
      <jds-form-control-helper-text>
        {{ helperText }}
      </jds-form-control-helper-text>
    </div>
    <label class="jds-toggle" :class="{'is-props': isProps}">
      <input hidden v-model="checked" type="checkbox" name="toggle" />
      <span class="jds-toggle__slider jds-toggle__circle"></span>
    </label>
  </div>
</template>

<script>
import { JdsFormControlLabel, JdsFormControlHelperText } from '../JdsFormControl'

export default {
  name: 'jds-toggle',
  components: {
    JdsFormControlLabel,
    JdsFormControlHelperText
  },
  props: {
    /**
     * Label for the toggle
     */
    label: {
      type: String
    },
    /**
     * Helper text for the toggle
     */
    helperText: {
      type: String
    },
    /**
     * Display the toggle inline
     */
    inline: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      checked: false
    }
  },
  watch: {
    checked () {
      /**
       * Emitted on click
       * @param {boolean} value
       */
      this.$emit('click', this.checked) 
    }
  },
  computed: {
    isLabel () {
      return this.label
    },
    isInline () {
      return this.label && this.inline
    },
    isProps () {
      return this.label && !this.inline
    }
  }
}
</script>

<style lang="scss">
@import "./Toggle.scss";
</style>
