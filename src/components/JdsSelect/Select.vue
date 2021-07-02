<template>
  <jds-popover
    v-model="isDropdownOpen" 
    :options="popperOptions"
  >
    <template #activator="{ on }">
      <div :class="{
        'jds-select font-sans-1': true,
        'jds-select--hovered': isHovered,
        'jds-select--focused': isFocused,
        'jds-select--error': showErrorMsg,
      }">
        <jds-input-text
          v-bind="{ label, placeholder, helperText }"
          :value="currentOptionLabel"
          @click.native="on.click"
          @keydown.native="on.keydown"
        />
        <jds-form-control-error-message
          v-if="showErrorMsg && !isDropdownOpen"
          class="jds-select__error-message">
          {{ errorMessage }}
        </jds-form-control-error-message>
      </div>
    </template>
    <jds-popover-dropdown>
      <ul
        class="jds-select__options"
      >
        <li
          v-for="(opt, index) in options"
          :key="index"
          :class="{
            'jds-select__option': true,
            'jds-select__option--selected': isOptionSelected(opt)
          }"
          @click="onClickOptionItem(opt)"
        >
          <span class="jds-select__option__text">
            {{ getOptionLabel(opt, labelKey) }}
          </span>
        </li>
      </ul>
    </jds-popover-dropdown>
  </jds-popover>
</template>

<script>
import localCopy from '../../mixins/local-copy'
import JdsFormControlErrorMessage from '../JdsFormControl/FormControlErrorMessage'
import JdsInputText from '../JdsInputText'
import JdsPopover from '../JdsPopover'
import JdsPopoverDropdown from '../JdsPopoverDropdown'
import popperOptions from '../JdsPopoverDropdown/options'

import {
  getOptionLabel,
  getOptionValue,
  findMatchedOption,
} from '../../utils/options-handler'

function isStringDefined(val) {
  return typeof val === 'string' && !!val.length
}

export default {
  name: 'jds-select',
  model: {
    prop: 'value',
    event: 'change',
  },
  components: {
    JdsPopover,
    JdsPopoverDropdown,
    JdsInputText,
    JdsFormControlErrorMessage,
  },
  mixins: [
    localCopy('value', 'mValue'),
    localCopy('filterValue', 'mFilterValue')
  ],
  props: {
    /**
     * Bound model.
     * @name value
     * @model
     */
    value: {
      type: [String, Number, Boolean, Array],
      default: undefined,
    },
    /**
     * Available options to select from.
     * Can be array of primitives or objects.
     */
    options: {
      type: Array,
      default: () => [],
    },
    /**
     * Required if options consist of objects.
     * Defined option value.
     */
    valueKey: {
      type: String,
      default: 'value',
    },
    /**
     * Required if options consist of objects.
     * Defined option label.
     */
    labelKey: {
      type: String,
      default: 'label',
    },

    /**
     * Close options dropdown on option clicked.
     */
    autoClose: {
      type: Boolean,
      default: false,
    },

    /**
     * Select label.
     */
    label: {
      type: String,
    },
    /**
     * Select placeholder. 
     */
    placeholder: {
      type: String,
    },
    /**
     * Select hint.
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
  },
  data () {
    return {
      popperOptions: {
        ...popperOptions,
        placement: 'bottom-start',
      },
      isDropdownOpen: false,
      isFocused: false,
      isHovered: false,
      mValue: undefined,
      mFilterValue: undefined,
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
    currentOptionLabel () {
      const opt = findMatchedOption(this.mValue, this.options, this.valueKey)
      if (!opt) {
        return ''
      }
      return getOptionLabel(opt, this.labelKey)
    },
  },
  methods: {
    getOptionLabel,
    getOptionValue,
    findMatchedOption,
    onClickOptionItem(option) {
      if (this.isOptionSelected(option)) {
        this.mValue = undefined
      } else {
        this.mValue = getOptionValue(option, this.valueKey)
      }
      if (this.autoClose) {
        this.isDropdownOpen = false
      }
      this.emitChange(this.mValue)
    },
    isOptionSelected(option) {
      const val = getOptionValue(option, this.valueKey)
      return this.mValue === val
    },
    emitChange (value) {
      /**
       * Emitted when value changed
       */
      this.$emit('change', value)
    },
  }
}
</script>

<style lang="scss">
@use "./Select.scss";
</style>
