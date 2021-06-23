<template>
  <div
    :class="{
      'jds-text-area font-sans-1': true,
      'is-empty': isEmpty,
      'is-error': showErrorMsg,
      'is-focus': isFocused,
      'is-hover': isHovered,
    }"
  >
    <jds-form-control-label v-if="showLabel">
      {{ label }}
    </jds-form-control-label>
    <jds-form-control-helper-text v-if="showHelperText">
      {{ helperText }}
    </jds-form-control-helper-text>
    <div
      class="jds-text-area__input-wrapper"
      @mouseenter="isHovered = true"
      @mouseleave="isHovered = false"
    >
      <textarea
        rows="7"
        :placeholder="placeholder"
        v-bind="inputAttributes"
        :value="value"
        @input="onInput"
        @focus="isFocused = true"
        @blur="isFocused = false"
      />
    </div>
    <jds-form-control-error-message v-if="showErrorMsg">
      {{ errorMessage }}
    </jds-form-control-error-message>
  </div>
</template>

<script>
import {
  JdsFormControlLabel,
  JdsFormControlErrorMessage,
  JdsFormControlHelperText,
} from '../JdsFormControl'
import localCopy from '../../mixins/local-copy'

function isStringDefined(val) {
  return typeof val === 'string' && !!val.length
}

export default {
  model: {
    prop: 'value',
    event: 'input',
  },
  mixins: [localCopy('value', 'mValue')],
  components: {
    JdsFormControlLabel,
    JdsFormControlErrorMessage,
    JdsFormControlHelperText,
  },
  name: 'jds-text-area',
  props: {
    /**
     * Bound model.
     * @name value
     * @model
     */
    value: {
      type: String,
    },
    /**
     * Text area name attribute.
     */
    name: {
      type: String,
    },
    /**
     * Textarea placeholder attribute.
     */
    placeholder: {
      type: String,
    },
    /**
     * Textarea label.
     */
    label: {
      type: String,
    },
    /**
     * Textarea Hint.
     */
    helperText: {
      type: String,
    },
    /**
     * Display error message.
     */
    errorMessage: {
      type: String,
    },
  },
  data() {
    return {
      isFocused: false,
      isHovered: false,
      mValue: undefined,
    }
  },
  methods: {
    onInput(e) {
      // this.mValue = e.target.value
      this.emitInput(e.target.value)
    },
    emitInput(value) {
      /**
       * Emitted on input
       * @param {string} value - updated bound model
       */
      this.$emit('input', value)
    },
  },
  computed: {
    inputAttributes() {
      const attrs = ['name', 'placeholder']
      return attrs.reduce((obj, key) => {
        obj[key] = this[key]
        return obj
      }, {})
    },
    showLabel() {
      return isStringDefined(this.label)
    },
    showHelperText() {
      return isStringDefined(this.helperText)
    },
    showErrorMsg() {
      return isStringDefined(this.errorMessage)
    },
    isEmpty() {
      // console.log(isStringDefined(this.mValue))
      return !isStringDefined(this.mValue)
    },
  },
}
</script>

<style lang="scss">
@use "./TextArea.scss";
</style>
