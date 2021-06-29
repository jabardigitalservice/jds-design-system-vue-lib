<template>
  <div :class="{
    'jds-date-input': true,
    'font-sans-1': true
  }">
    <jds-form-control-label v-if="showLabel">
      {{ label }}
    </jds-form-control-label>
    <div>
      <input
        id="date"
        ref="input"
        :value="mValue"
        @accept="onAccept"
        @complete="onComplete"
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
  JdsFormControlErrorMessage
} from '../JdsFormControl'

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
     */
    min: {
      type: String,
    },
    /**
     * You can set maximal date for
     * the latest acceptable date
     */
    max: {
      type: String,
    },
    /**
     * Bound model.
     * @name value
     * @model
     * The value for the date 
     * format date following `DD/MM/YYYY` pattern
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
      maskRef: {},
      mValue: undefined,
      options : {}
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
      this.initialMask()
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
      const maskRef = imask.initMask(this.$refs.input,this.options)
      maskRef.value = this.mValue
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