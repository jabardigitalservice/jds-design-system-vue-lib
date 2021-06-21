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
    <ul
      v-if="checkboxItems.length" 
      class="jds-checkbox-group__checkbox-items"
    >
      <template v-for="(cb, index) in checkboxItems">
        <component
          :key="index" 
          :is="cb.Ctor"
          v-bind="cb.propsData"
          class="jds-checkbox-group__checkbox-item"
          @change="onCheckboxItemChange($event, cb.propsData)"
        />
      </template>
    </ul>
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
import localCopy from '../../mixins/local-copy'

// TODO: move to utils
function isStringDefined(val) {
  return typeof val === 'string' && !!val.length
}

export default {
  name: 'jds-checkbox-group',
  components: {
    JdsFormControlLabel,
    JdsFormControlHelperText,
    JdsFormControlErrorMessage
  },
  mixins: [localCopy('value', 'mValue')],
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
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
      checkboxItems: [],
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
  created () {
    this.renderDefaultSlot()
  },
  methods: {
    async renderDefaultSlot() {
      await this.$nextTick()
      try {
        const children = this.$scopedSlots
          .default({})
          .reduce((arr, child) => {
            if (!!child.tag && typeof child.componentOptions?.Ctor === 'function') {
              const { componentOptions } = child
              
              /* eslint-disable no-unused-vars */
              // remove label, helperText, errorMessage from each checkbox
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
        this.checkboxItems = children
      } catch (e) {
        console.error(e)
      }
    },
    onCheckboxItemChange (checked, option) {
      if (checked && !this.mValue.includes(option.value)) {
        this.mValue.push(option.value)
      } else if (!checked && this.mValue.includes(option.value)) {
        this.mValue = this.mValue.filter((v) => v !== option.value)
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
