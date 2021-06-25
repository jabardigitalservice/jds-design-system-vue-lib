<template>
  <div :class="{
    'jds-checkbox-group font-sans-1': true,
    'is-error': showErrorMsg,
    'is-focus': isFocused,
    'is-hover': isHovered,
    'is-horizontal': isHorizontal,
    'is-vertical': isVertical,
  }">
    <jds-form-control-label v-if="showLabel">
      {{ label }}
    </jds-form-control-label>
    <jds-form-control-helper-text v-if="showHelperText">
      {{ helperText }}
    </jds-form-control-helper-text>
    <div
      class="jds-checkbox-group__checkbox-items"
      role="list"
    >
      <jds-checkbox
        v-for="(opt, i) in options"
        :key="i"
        :value="getOptionValue(opt)"
        :text="getOptionLabel(opt)"
        @change="onCheckboxItemChange($event, opt)"
      />
    </div>
    <jds-form-control-error-message v-if="showErrorMsg">
      {{ errorMessage }}
    </jds-form-control-error-message>
  </div>
</template>

<script>
import JdsCheckbox from '../JdsCheckbox'
import {
  JdsFormControlLabel,
  JdsFormControlHelperText,
  JdsFormControlErrorMessage
} from '../JdsFormControl'
import localCopy from '../../mixins/local-copy'
import {
  getOptionValue,
  getOptionLabel
} from '../../utils/options-handler'

// TODO: move to utils
function isStringDefined(val) {
  return typeof val === 'string' && !!val.length
}

export default {
  name: 'jds-checkbox-group',
  components: {
    JdsFormControlLabel,
    JdsFormControlHelperText,
    JdsFormControlErrorMessage,
    JdsCheckbox,
  },
  mixins: [localCopy('value', 'mValue')],
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    options: {
      type: Array,
      default: () => []
    },
    valueKey: {
      type: String,
      default: 'value',
    },
    labelKey: {
      type: String,
      default: 'text',
    },
    /**
     * Bound model.
     * @name value
     * @model
     */
    value: {
      type: Array,
      default: () => []
    },
    /**
     * Set grouped checkboxes name attribute.
     */
    name: {
      type: String,
    },
    /**
     * Set list orientation.
     * @values horizontal,vertical
     */
    orientation: {
      type: String,
      default: 'vertical'
    },
    /**
     * Checkbox group label.
     */
    label: {
      type: String,
    },
    /**
     * Checkbox group hint.
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
      mValue: [],
    }
  },
  computed: {
    isHorizontal () {
      return this.orientation === 'horizontal'
    },
    isVertical () {
      return this.orientation === 'vertical'
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
  },
  methods: {
    getOptionValue(option) {
      return getOptionValue(option, this.valueKey)
    },
    getOptionLabel(option) {
      return getOptionLabel(option, this.labelKey)
    },
    onCheckboxItemChange (checked, option) {
      const val = this.getOptionValue(option)
      if (checked && !this.mValue.includes(val)) {
        this.mValue.push(val)
      } else if (!checked && this.mValue.includes(val)) {
        this.mValue = this.mValue.filter((v) => v !== val)
      }
      this.emitChange(this.mValue)
    },
    emitChange (value) {
      /**
       * Emitted when bound model changed.
       * Order of values is not guaranteed.
       * @param {Array<any>} value
       */
      this.$emit('change', value)
    }
  }
}
</script>

<style lang="scss">
@use "./CheckboxGroup.scss";
</style>
