<template>
  <div class="font-sans-1">
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
    <ul v-if="radioButtonItems.length">
      <template v-for="(cb, index) in radioButtonItems">
        <component
          :key="index" 
          :is="cb.Ctor"
          v-bind="cb.propsData"
          @change="onRadioButtonChange($event, cb.propsData)"
        />
      </template>
    </ul>
  </div>
</template>
<script>
import {
  JdsFormControlLabel,
  JdsFormControlHelperText,
  JdsFormControlErrorMessage
} from '../JdsFormControl'
import localCopy from '../../mixins/local-copy'

// TODO: move to utils
function isStringDefined(val) {
  return typeof val === 'string' && !!val.length
}

export default {
  name: 'jds-radio-button-group',
  components:{
    JdsFormControlLabel,
    JdsFormControlHelperText,
    JdsFormControlErrorMessage
  },
  mixins: [localCopy('value','mValue')],
  model: {
    prop: 'value',
    event: 'change',
  },
  props:{
    /**
     * Bound model. 
     * Radio button value
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
    }
  },
  data () {
    return{
      radioButtonItems: [],
      mValue: undefined,
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
  },
  created () {
    this.renderDefaultSlot()
  },
  methods:{
    async renderDefaultSlot() {
      await this.$nextTick()
      try {
        const children = this.$scopedSlots
          .default({})
          .reduce((arr, child) => {
            if (!!child.tag && typeof child.componentOptions?.Ctor === 'function') {
              const { componentOptions } = child
              
              /* eslint-disable no-unused-vars */
              // remove label, helperText, errorMessage from each radio button
              const {
                label,
                helperText,
                errorMessage,
                ...rest
              } = componentOptions.propsData
              /* eslint-enable no-unused-vars */

              componentOptions.propsData = {
                ...rest,
                name: this.name,
                tag: 'li',
              }
              arr.push(componentOptions)
            }
            return arr
          }, [])
        this.radioButtonItems = children
      } catch (e) {
        console.error(e)
      }
    },
    onRadioButtonChange(checked) {
      this.emitChange(checked)
    },
    emitChange (value) {
      this.$emit('change',value)
    }
  }
}
</script>

<style lang="scss">
@use './RadioButtonGroup.scss'
</style>