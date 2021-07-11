<template>
  <jds-popover
    v-clickaway="onClickaway"
    :value="isDropdownOpen" 
    :options="popperOptions"
    @input="toggleDropdown"
  >
    <template #activator>
      <div :class="{
        'jds-select font-sans-1': true,
        'jds-select--opened': isDropdownOpen,
      }">
        <jds-input-text
          ref="inputText"
          v-model="inputElementValue"
          readonly
          :label="label"
          :placeholder="placeholder"
          :helper-text="helperText"
          :class="{
            'jds-input-text--error': showErrorMsg
          }"
          @click.native="onInputClicked"
        >
          <template #suffix-icon>
            <jds-icon
              class="jds-select__trigger-icon"
              name="chevron-down"
              size="1em"
              @click="onTriggerClicked"
            />
          </template>
        </jds-input-text>
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
        ref="optionList"
      >
        <li
          v-for="(opt, index) in mOptions"
          :key="index"
          ref="optionItemsEl"
          tabindex="0"
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
import { directive as clickaway } from 'vue-clickaway'
import * as keyCode from '../../utils/key-code'
import localCopy from '../../mixins/local-copy'
import JdsIcon from '../JdsIcon'
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
  directives: {
    clickaway,
  },
  components: {
    JdsIcon,
    JdsPopover,
    JdsPopoverDropdown,
    JdsInputText,
    JdsFormControlErrorMessage,
  },
  mixins: [
    localCopy('value', 'mValue'),
    localCopy('filterValue', 'mFilterValue'),
    localCopy('options', 'mOptions'),
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
      type: Boolean
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
      mValue: undefined,
      mFilterValue: undefined,
      inputElementValue: undefined,

      mOptions: [],
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
    currentOptionIndex () {
      return this.mOptions.findIndex((opt) => {
        return getOptionValue(opt, this.valueKey) === this.mValue
      })
    }
  },
  mounted () {
    window.addEventListener('keydown', this.listenToKeydownEvent)
  },
  beforeDestroy () {
    window.removeEventListener('keydown', this.listenToKeydownEvent)
  },
  methods: {
    getOptionLabel,
    getOptionValue,
    findMatchedOption,
    findMatchedOptionByLabel (label) {
      return this.mOptions.find((opt) => {
        return getOptionLabel(opt, this.labelKey) === label
      })
    },
    listenToKeydownEvent (e) {
      const activeEl = document.activeElement
      if (!activeEl) {
        return
      }
      const isWithinThisPopover = this.$el?.contains?.(activeEl)
      if (!isWithinThisPopover) {
        return
      }

      this.handleKeyboardNavigation(e)
    },

    // START: DROPDOWN STATE
    toggleDropdown (open) {
      // if argument is supplied,
      // force dropdown to open or close
      if (typeof open === 'boolean') {
        if (open) {
          this.openDropdown()
        } else {
          this.closeDropdown()
        }
        return
      }

      // switch between open or close
      // based on current state
      if (this.isDropdownOpen) {
        this.closeDropdown()
      } else {
        this.openDropdown()
      }
    },
    openDropdown () {
      this.isDropdownOpen = true
    },
    closeDropdown ({ retainFocus = false } = {}) {
      this.isDropdownOpen = false
      this.$nextTick(() => {
        if (retainFocus) {
          this.$refs.inputText.forceFocus()
        }
      })
    },
    // END: DROPDOWN STATE

    // START: NAVIGATION
    handleKeyboardNavigation(e) {
      if (keyCode.isArrow('Up', e) || keyCode.isArrow('Left', e)) {
        this.navigateToPrevOption()
      } else if (keyCode.isArrow('Down', e) || keyCode.isArrow('Right', e)) {
        this.navigateToNextOption()
      }

      if (!this.isDropdownOpen) {
        if (keyCode.isEnter(e)) {
          e.preventDefault()
          this.openDropdown()
        }
        return
      }

      const shouldClose = keyCode.isTab(e)
        || keyCode.isEscape(e)
        || keyCode.isEnter(e)
      if (shouldClose) {
        // prevent focus from moving to next focusable element,
        // retain focus on input text element
        e.preventDefault()
        this.closeDropdown({ retainFocus: true })
      }
    },
    navigateToPrevOption () {
      let i
      if (this.currentOptionIndex <= 0) {
        i = 0
      } else {
        i = this.currentOptionIndex - 1
      }
      const opt = this.mOptions[i]
      this.changeSelectedOption(opt)
      this.$refs.optionItemsEl[i].focus()
    },
    navigateToNextOption () {
      if (this.currentOptionIndex === this.mOptions.length - 1) {
        return
      }
      const i = this.currentOptionIndex + 1
      const opt = this.mOptions[i]
      this.changeSelectedOption(opt)
      this.$refs.optionItemsEl[i].focus()
    },
    // END: NAVIGATION

    // START: OPTION STATE
    isOptionSelected(option) {
      const val = getOptionValue(option, this.valueKey)
      return this.mValue === val
    },
    resetSelectedOption() {
      this.mValue = undefined
      this.inputElementValue = ''
      this.emitChange(this.mValue)
    },
    changeSelectedOption(option) {
      this.mValue = getOptionValue(option, this.valueKey)
      this.inputElementValue = getOptionLabel(option, this.labelKey)
      this.emitChange(this.mValue)
    },
    // END: OPTION STATE

    onTriggerClicked () {
      this.$refs.inputText.forceFocus()
    },

    onInputClicked () {
      this.toggleDropdown()
    },
    onPopperKeydown (e) {
      this.handleKeyboardNavigation(e)
    },
    onClickaway() {
      if (this.isDropdownOpen) {
        this.closeDropdown({ retainFocus: true })
      }
    },
    onClickOptionItem(option) {
      if (this.isOptionSelected(option)) {
        this.resetSelectedOption()
      } else {
        this.changeSelectedOption(option)
      }
      if (this.autoClose) {
        this.closeDropdown({ retainFocus: true })
      }
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
