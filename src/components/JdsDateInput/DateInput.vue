<template>
  <div :class="{
    'jds-date-input': true,
    'font-sans-1': true,
  }">
    <jds-form-control-label v-if="showLabel">
      {{ label }}
    </jds-form-control-label>
    <div :class="{
      'jds-date-input__input': true,
      'jds-date-input__input--error': showErrorMsg,
      'jds-date-input__input--focus': isFocused,
      }">
      <input
        type="text"
        id="date"
        ref="input"
        :value="mValue"
        @accept="onAccept"
        @complete="onComplete"
        @focus="isFocused = true"
        @blur="isFocused = false"
      />
      <icon-calendar 
      :class="{
        'jds-date-input__input-suffix-icon': true,
        'jds-date-input__input-suffix-icon--focus': isFocused,
      }"/>
    </div>
    <jds-form-control-error-message v-if="showErrorMsg">
      {{ errorMessage }}
    </jds-form-control-error-message>
  </div>
</template>
<script>
import {
  JdsFormControlLabel,
  JdsFormControlErrorMessage
} from '../JdsFormControl'

import IconCalendar from './IconCalendar'

import { fnDate, imask } from '../../utils/date-input'

// TODO: move to utils
function isStringDefined(val) {
  return typeof val === 'string' && !!val.length
}

export default {
  name: 'jds-date-input',
  components: {
    JdsFormControlLabel,
    JdsFormControlErrorMessage,
    IconCalendar
  },
  model: {
    prop: 'value',
    event: 'input',
  },
  props:{
    /**
     * The name for date input
     */
    name: {
      type: String
    },
    /**
     * Type of date input
     * Value is `picker | range`
     */
    type: {
     type: String,
     default: 'picker'
    },
    /**
     * You can set minimal date for
     * the earliest acceptable date
     * The value of the min date format follows the pattern `DD/MM/YYYY`.
     */
    min: {
      type: String,
      default: '01/01/1900'
    },
    /**
     * You can set maximal date for
     * the latest acceptable date
     * The value of the max date format follows the pattern `DD/MM/YYYY`.
     */
    max: {
      type: String,
      default: '31/12/9999'
    },
    /**
     * Bound model.
     * @name value
     * @model
     * The value of the input date format follows the pattern `DD/MM/YYYY`.
     * if value not set the value will be current date
     */
    value: {
      type: String,
    },
    /**
     * Label for Date Input
     */
    label:{
      type: String,
    },
    /**
     * Error Message for Date Input
     */
    errorMessage: {
      type: String
    },
  },
  data(){
    return{
      isFocused: null,
      maskRef: {},
      mValue: undefined,
      options : {
        min: this.min ? fnDate.parseDate(this.min) : undefined,
        max: this.max ? fnDate.parseDate(this.max) : undefined,
      },
    }
  },
  watch: {
    value : {
      handler: 'syncPropValue'
    }
  },
  computed:{
    showLabel () {
      return isStringDefined(this.label)
    },
    showErrorMsg () {
      return isStringDefined(this.errorMessage)
    },
  },
  methods: {
    syncPropValue(v){
      if(typeof v === 'undefined'){
        this.mValue = fnDate.formatDate(new Date())
      }else{
        this.mValue = v
      }
      this.updateValue()
    },
    updateValue(){
      this.maskRef.value = this.mValue
    },
    onAccept(e){
      const maskRef = e.detail;
      this.mValue = maskRef.value;
    },
    onComplete (e) {
      const maskRef = e.detail;
      this.emitInput(maskRef.unmaskedValue)
    },
    async initialMask(){
      await this.$nextTick()
      this.maskRef = imask.initMask(this.$refs.input,this.options)
    },
    emitInput(value){
      /**
       * Emitted when date value is changed.
       * @param {any} value
       */
      this.$emit('input', value)
    }
  },
  mounted(){
    this.mValue = this.value
    this.initialMask()
  },
  beforeDestroy(){
    imask.destroyMask(this.$refs.input)
  }
}
</script>

<style lang="scss">
@use './DateInput.scss'
</style>