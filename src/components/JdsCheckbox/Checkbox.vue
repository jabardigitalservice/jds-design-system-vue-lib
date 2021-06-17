<template>
  <div :class="{
    'jds-checkbox font-sans-1': true,
    'has-error-line': showErrorLine,
    'is-checked': !indeterminate && mChecked,
    'is-indeterminate': indeterminate,
    'is-error': showErrorMsg,
    'is-focus': isFocused,
    'is-hover': isHovered,
  }">
    <jds-form-control-label v-if="showLabel">
      {{ label }}
    </jds-form-control-label>
    <jds-form-control-helper-text v-if="showHelperText">
      {{ helperText }}
    </jds-form-control-helper-text>
    <div
      class="jds-checkbox__checkbox-wrapper"
      @click="onClickCheckbox"
      @mouseenter="isHovered = true"
      @mouseleave="isHovered = false"
    >
      <div class="jds-checkbox__controls-input">
        <input
          type="checkbox"
          style="display: none;"
          :tabIndex="-1"
          :checked="mChecked"
        >
        <i
          role="checkbox"
          class="jds-checkbox__option-checkbox"
          :tabIndex="1"
          @focus="isFocused = true"
          @blur="isFocused = false"
        >
          <img
            class="jds-checkbox__icon"
            alt="checked"
            :src="iconCheckMark">
          <img
            class="jds-checkbox__icon"
            alt="indeterminate"
            :src="iconMinus">
        </i>
      </div>
      <label class="jds-checkbox__option-label">
        {{ text }}
      </label>
    </div>
    <jds-form-control-error-message v-if="showErrorMsg">
      {{ errorMessage }}
    </jds-form-control-error-message>
  </div>
</template>

<script>
import {
  JdsFormControlLabel,
  JdsFormControlHelperText,
  JdsFormControlErrorMessage
} from '../JdsFormControl'

import iconCheckMark from '../../assets/icon/check-mark.svg'
import iconMinus from '../../assets/icon/minus.svg'
import localCopy from '../../mixins/local-copy'

// TODO: move to utils
function isStringDefined(val) {
  return typeof val === 'string' && !!val.length
}

export default {
  name: 'jds-checkbox',
  components: {
    JdsFormControlLabel,
    JdsFormControlHelperText,
    JdsFormControlErrorMessage
  },
  mixins: [
    localCopy('checked', 'mChecked')
  ],
  model: {
    prop: 'checked',
    event: 'change',
  },
  props: {
    /**
     * Input checkbox value.
     */
    value: {
      type: String,
    },
    /**
     * Displays text next to checkbox input.
     */
    text: {
      type: String,
    },
    /**
     * Bound model. Display check mark icon if equals true.
     * @name checked
     * @model
     */
    checked: {
      type: Boolean
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
      iconCheckMark,
      iconMinus,
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
    }
  },
  methods: {
    onClickCheckbox () {
      this.mChecked = !this.mChecked
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
      /**
       * Emitted when checkbox checked state is changed.
       * @param {boolean} checked
       */
      this.$emit('change', checked)
    }
  }
}
</script>

<style lang="scss">
@use "./Checkbox.scss";
</style>
