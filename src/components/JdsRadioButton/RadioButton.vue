<template>
  <component
  :is="tag"
  :class="['jds-radio-button font-sans-1']"
  >
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
    <label :class="['jds-radio-button__label jds-radio-button__placeholder']">
      <input
        type="radio"
        :name="name"
        :checked="checked"
        :value="mValue"
        @change="onChangeRadio"
      />
      {{ placeholder }}
    </label>
    <!-- 
      @slot Use this slot for anything put in
    -->
    <slot></slot>
  </component>
</template>
<script>
import {
  JdsFormControlLabel,
  JdsFormControlHelperText,
  JdsFormControlErrorMessage
} from '../JdsFormControl'


// TODO: move to utils
function isStringDefined(val) {
  return typeof val === 'string' && !!val.length
}

export default {
  name: 'jds-radio-button',
  components: {
    JdsFormControlLabel,
    JdsFormControlHelperText,
    JdsFormControlErrorMessage
  },
  model:{
    prop: 'checked',
    event: 'change',
  },
  props:{
    /**
     * Define radio root element tag.
     * @private
     * @ignore
     */
    tag: {
      type: String,
      default: 'div'
    },
    /**
     * Radio button name
     */
    name:{
      type: String,
    },
    /**
     * Bound model, Return value when radio button is checked
     * @name checked
     * @model
     */
    checked: {
      type: [String, Number, Array, Boolean, Object],
    },
    /**
     * Radio button label
     */
    label: {
      type: String
    },
    /**
     * Radio button hint
     */
    helperText: {
      type: String,
    },
    /**
     * Displays error message
     */
    errorMessage: {
      type: String,
    },
    /**
     * Radio button placeholder 
     */
    placeholder: {
      type: String,
    },
    /**
     * Radio button value
     */
    value: {
      type: [String,Boolean,Number,Array,Object],
    }
  },
  data () {
    return{
      mValue: undefined,
      mChecked: undefined,
    }
  },
  watch:{
    value: {
      handler: 'handleEmptyValue',
      immediate: true,
    },
    checked: {
      handler (v){
        if (!this.hasInputValue) {
          this.mChecked = !!v
          return
        }
        // handle when `checked` property is hardcoded (set as initial value)
        if (v === true) {
          this.mChecked = true
          return
        }
        this.mChecked = v === this.mValue
      },
      immediate: true,
    }
  },
  computed:{
    showLabel () {
      return isStringDefined(this.label)
    },
    showHelperText () {
      return isStringDefined(this.helperText)
    },
    showErrorMsg () {
      return isStringDefined(this.errorMessage)
    },
    hasInputValue () {
      return typeof this.value === 'string' && !!this.value
    }
  },
  methods:{
    handleEmptyValue(newValue){
      if(newValue){
        this.mValue = newValue
      }else if (typeof this.mValue === 'undefined' && typeof this.placeholder !== 'undefined') {
        this.mValue = this.placeholder
      }else{
        this.mValue = 'on'
      }
    },
    onChangeRadio(){
      this.emitInput(this.mValue)
      this.emitChange(this.mValue)
    },
    emitInput(value){
       /**
       * Emitted when radio button checked state is changed.
       * @param {any} value
       */
      this.$emit('input',value)
    },
    emitChange(value){
      /**
       * Emitted when radio button checked state is changed.
       * @param {any} value
       */
      this.$emit('change', value)
    }
  }
}
</script>

<style lang="scss">
@use './RadioButton.scss';
</style>