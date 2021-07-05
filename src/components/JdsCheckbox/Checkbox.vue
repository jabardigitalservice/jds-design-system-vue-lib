<template>
  <component
    :is="tag" 
    :class="{
      'jds-checkbox font-sans-1': true,
      'jds-checkbox--error-line': showErrorLine,
      'jds-checkbox--checked': !indeterminate && mChecked,
      'jds-checkbox--indeterminate': indeterminate,
      'jds-checkbox--error': showErrorMsg,
      'jds-checkbox--focus': isFocused,
      'jds-checkbox--hover': isHovered,
    }"
  >
    <jds-form-control-label v-if="showLabel">
      {{ label }}
    </jds-form-control-label>
    <jds-form-control-helper-text v-if="showHelperText">
      {{ helperText }}
    </jds-form-control-helper-text>
    <div
      class="jds-checkbox__checkbox-wrapper"
      @mouseenter="isHovered = true"
      @mouseleave="isHovered = false"
    >
      <jds-checkbox-toggle
        :name="name"
        :checked="mChecked"
        :indeterminate="indeterminate"
        @change="onCheckboxChange"
      />
      <label class="jds-checkbox__option-label">
        {{ text }}
      </label>
    </div>
    <jds-form-control-error-message v-if="showErrorMsg">
      {{ errorMessage }}
    </jds-form-control-error-message>
  </component>
</template>

<script>
import {
  JdsFormControlLabel,
  JdsFormControlHelperText,
  JdsFormControlErrorMessage
} from '../JdsFormControl'

import JdsCheckboxToggle from '../JdsCheckboxToggle'

// TODO: move to utils
function isStringDefined(val) {
  return typeof val === 'string' && !!val.length
}

export default {
  name: 'jds-checkbox',
  components: {
    JdsFormControlLabel,
    JdsFormControlHelperText,
    JdsFormControlErrorMessage,
    JdsCheckboxToggle
  },
  model: {
    prop: 'checked',
    event: 'change',
  },
  props: {
    /**
     * Define checkbox root element tag.
     * @private
     * @ignore
     */
    tag: {
      type: String,
      default: 'div'
    },
    /**
     * Input checkbox value.
     */
    value: {
      type: [String, Number],
    },
    /**
     * Displays text next to checkbox input.
     */
    text: {
      type: [String, Number],
    },
    /**
     * Checkbox name attribute.
     */
    name: {
      type: String
    },
    /**
     * Bound model. Display check mark icon if equals true.
     * @name checked
     * @model
     */
    checked: {
      type: [String, Number, Boolean]
    },
    /**
     * Set checkbox as indeterminate (nor true or false).
     * Override currently displayed icon, if any.
     */
    indeterminate: {
      type: Boolean,
    },
    /**
     * Checkbox label.
     */
    label: {
      type: String,
    },
    /**
     * Checkbox hint.
     */
    helperText: {
      type: String,
    },
    /**
     * Displays error message.
     */
    errorMessage: {
      type: String,
    }
  },
  data () {
    return {
      isFocused: false,
      isHovered: false,
      mChecked: undefined,
    }
  },
  computed: {
    showLabel () {
      return isStringDefined(this.label)
    },
    showHelperText () {
      return isStringDefined(this.helperText)
    },
    showErrorMsg () {
      return isStringDefined(this.errorMessage)
    },
    showErrorLine () {
      return this.showLabel && this.showHelperText && this.showErrorMsg
    },
    hasInputValue () {
      return this.value !== null && typeof this.value !== 'undefined'
    }
  },
  watch: {
    checked: {
      immediate: true,
      handler (v) {
        if (!this.hasInputValue) {
          this.mChecked = !!v
          return
        }
        if (v === true) {
          this.mChecked = true
          return
        }
        this.mChecked = v === this.value
      }
    }
  },
  methods: {
    onCheckboxChange (checked) {
      this.mChecked = checked
      this.emitInput(this.mChecked)
      this.emitChange(this.mChecked)
    },
    emitInput (checked) {
      /**
       * Emitted when checkbox checked state is changed.
       * @param {any} value
       */
      this.$emit('input', checked ? this.value : undefined)
    },
    emitChange (checked) {
      if (this.hasInputValue) {
        this.$emit('change', this.mChecked ? this.value : undefined)
      } else {
        /**
         * Emitted when checkbox checked state is changed.
         * @param {boolean} checked
         */
        this.$emit('change', checked)
      }
    }
  }
}
</script>

<style lang="scss">
@use "./Checkbox.scss";
</style>
