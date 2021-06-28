<template>
  <div :class="{
    'jds-input-text font-sans-1': true,
    'jds-input-text--empty': isEmpty,
    'jds-input-text--error': showErrorMsg,
    'jds-input-text--focused': isFocused,
    'jds-input-text--hovered': isHovered,
  }">
    <jds-form-control-label v-if="showLabel">
      {{ label }}
    </jds-form-control-label>
    <jds-form-control-helper-text v-if="showHelperText">
      {{ helperText }}
    </jds-form-control-helper-text>
    <div
      class="jds-input-text__input-wrapper"
      @mouseenter="isHovered = true"
      @mouseleave="isHovered = false"
      >
      <jds-input-text-edge
        v-if="showPrefixEdge"
        v-bind="prefixConfig"
        type="prefix"
        :value="mPrefixText"
        @change="onPrefixTextChanged">
      </jds-input-text-edge>
      <input
        v-bind="inputAttributes"
        :value="mValue"
        type="text"
        @input="onInput"
        @focus="isFocused = true"
        @blur="isFocused = false">
      <jds-input-text-edge
        v-if="showSuffixEdge"
        v-bind="suffixConfig"
        type="suffix"
        :value="mSuffixText"
        @change="onSuffixTextChanged">
      </jds-input-text-edge>
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
import JdsInputTextEdge from '../JdsInputTextEdge'
import localCopy from '../../mixins/local-copy'

function isStringDefined(val) {
  return typeof val === 'string' && !!val.length
}

export default {
  model: {
    prop: 'value',
    event: 'input',
  },
  mixins: [
    localCopy('value', 'mValue'),
    localCopy('prefixText', 'mPrefixText'),
    localCopy('suffixText', 'mSuffixText')
  ],
  components: {
    JdsFormControlLabel,
    JdsFormControlHelperText,
    JdsFormControlErrorMessage,
    JdsInputTextEdge
  },
  name: 'jds-input-text',
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
     * Input name attribute.
     */
    name: {
      type: String,
    },
    /**
     * Input placeholder attribute.
     */
    placeholder: {
      type: String,
    },
    /**
     * Input label.
     */
    label: {
      type: String,
    },
    /**
     * Input hint.
     */
    helperText: {
      type: String,
    },
    /**
     * Displays error message.
     */
    errorMessage: {
      type: String,
    },

    /**
     * Displays prefix text.
     */
    prefixText: {
      type: String,
    },

    /**
     * Prefix can be set as selectable.
     */
    prefixConfig: {
      type: Object,
    },

    /**
     * Displays suffix text.
     */
    suffixText: {
      type: String,
    },
    /**
     * Suffix can be set as selectable.
     */
    suffixConfig: {
      type: Object,
    }
  },
  data () {
    return {
      isFocused: false,
      isHovered: false,
      mValue: undefined,
      mPrefixText: undefined,
      mSuffixText: undefined,
    }
  },
  computed: {
    inputAttributes () {
      const attrs = [
        'name',
        'placeholder',
      ]
      return attrs.reduce((obj, key) => {
        obj[key] = this[key]
        return obj
      }, {})
    },
    showLabel () {
      return isStringDefined(this.label)
    },
    showHelperText () {
      return isStringDefined(this.helperText)
    },
    showErrorMsg () {
      return isStringDefined(this.errorMessage)
    },
    showPrefixEdge () {
      return isStringDefined(this.mPrefixText)
    },
    showSuffixEdge () {
      return isStringDefined(this.mSuffixText)
    },
    isEmpty () {
      return isStringDefined(this.mValue)
    },
  },
  methods: {
    onInput (e) {
      this.mValue = e.target.value
      this.emitInput(e.target.value)
    },
    onPrefixTextChanged (value) {
      this.mPrefixText = value
      this.emitChangePrefixText(value)
    },
    onSuffixTextChanged (value) {
      this.mSuffixText = value
      this.emitChangeSuffixText(value)
    },
    emitInput(value) {
      /**
       * Emitted on input
       * @param {string} value - updated bound model
       */
      this.$emit('input', value)
    },
    emitChangePrefixText(value) {
      /**
       * Emitted on prefix text change (only applies when prefix is selectable).
       * @param {any} value - updated value
       */
      this.$emit('change:prefix-text', value)
    },
    emitChangeSuffixText(value) {
      /**
       * Emitted on suffix text change (only applies when suffix is selectable).
       * @param {any} value - updated value
       */
      this.$emit('change:suffix-text', value)
    }
  }
}
</script>

<style lang="scss">
@use "./InputText.scss";
</style>