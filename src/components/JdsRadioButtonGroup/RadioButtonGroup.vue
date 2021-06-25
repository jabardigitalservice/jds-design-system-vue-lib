<template>
  <div class="jds-radio-button-group font-sans-1">
    <div>
      <jds-form-control-label v-if="showLabel">
        {{ label }}
      </jds-form-control-label>
      <jds-form-control-helper-text v-if="showHelperText">
        {{ helperText }}
      </jds-form-control-helper-text>
      <jds-form-control-error-message v-if="showErrorMsg">
        {{ errorMessage }}
      </jds-form-control-error-message>
    </div>
    <div :class="{
      'jds-radio-button-group__list jds-radio-button-group__list--horizontal': isHorizontal,
      'jds-radio-button-group__list jds-radio-button-group__list--vertical': isVertical,
    }" role="list">
      <jds-radio-button 
        v-for="(item, i) in items"
        :key="i"
        :name="name"
        :checked="getChecked(item)"
        :value="getOptionValue(item)"
        :placeholder="getOptionLabel(item)"
        @change="onRadioButtonChange"
      />
    </div>
  </div>
</template>
<script>
import JdsRadioButton from '../JdsRadioButton'
import {
  JdsFormControlLabel,
  JdsFormControlHelperText,
  JdsFormControlErrorMessage
} from '../JdsFormControl'
import {
  getOptionValue,
  getOptionLabel
} from '../../utils/options-handler'


// TODO: move to utils
function isStringDefined(val) {
  return typeof val === 'string' && !!val.length
}

export default {
  name: 'jds-radio-button-group',
  components:{
    JdsFormControlLabel,
    JdsFormControlHelperText,
    JdsFormControlErrorMessage,
    JdsRadioButton,
  },
  model: {
    prop: 'value',
    event: 'change',
  },
  props:{
    /**
     * Array Object contain lists of radio button properties
     * 
     */
    items: {
      type: Array,
      default: () => []
    },
    /**
     * Option property name of value for item
     */
    valueKey: {
      type: String,
      default: 'value',
    },
    /**
     * Option property name of placeholder for item
     */
    placeholderKey: {
      type: String,
      default: 'placeholder',
    },
    /**
     * Bound model. 
     * Radio button group value
     * @name value
     * @model
     */
    value: {
      type: String,
    },
    /**
     * The name identity for grouping radio button items
     */
    name: {
      type: String,
    },
    /**
     * Radio button group label
     */
    label: {
      type: String,
    },
    /**
     * Radio button group hint
     */
    helperText: {
      type: String,
    },
    /**
     * Radio button group error message
     */
    errorMessage: {
      type: String
    },
    /**
     * Set list orientation.
     * @values horizontal,vertical
     */
    orientation: {
      type: String,
      default: 'vertical'
    },
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
  methods:{
    getChecked(value){
      return this.value === this.getOptionValue(value)
    },
    getOptionValue(option) {
      return getOptionValue(option, this.valueKey)
    },
    getOptionLabel(option) {
      return getOptionLabel(option, this.placeholderKey)
    },
    onRadioButtonChange(value) {
      this.emitChange(value)
    },
    emitChange (value) {
     /**
       * Emitted when bound model changed.
       * @param {string} value
       */
      this.$emit('change',value)
    }
  }
}
</script>

<style lang="scss">
@use './RadioButtonGroup.scss'
</style>
