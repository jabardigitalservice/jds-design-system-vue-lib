<template>
  <jds-popover
    v-clickaway="onClickaway"
    :class="{
      'jds-select': true,
      'jds-select--filterable': filterable,
      'jds-select--has-header': !!optionsHeader,
      'jds-select--opened': isDropdownOpen,
      'jds-select--error': showErrorMsg & !isDropdownOpen
    }"
    :value="isDropdownOpen" 
    :options="popperOptions"
    @click.native.capture="onClickCaptured"
    @input="toggleDropdown"
  >
    <template #activator>
      <div>
        <jds-input-text
          ref="selectInputText"
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
            />
          </template>
        </jds-input-text>
        <jds-form-control-error-message
          class="jds-select__error-message"
        >
          {{ errorMessage }}
        </jds-form-control-error-message>
      </div>
    </template>
    <jds-popover-dropdown class="jds-select__dropdown">
      <div class="jds-select__header">
        <strong>{{ optionsHeader }}</strong>
      </div>
      <div class="jds-select__filter">
        <jds-input-text
          :value="mFilter"
          ref="filterInputText"
          class="jds-select__filter__input-text"
          @input="onFilterInput"
          @keydown.native.capture.passive="onKeydownFilterInput"
        >
          <template #prefix-icon>
            <jds-icon
              name="magnifier"
              size="14px"
              fill="#BDBDBD"
            />
          </template>
        </jds-input-text>
      </div>
      <ul
        class="jds-select__options"
        ref="optionList"
      >
        <li
          v-for="(opt, index) in availableOptions"
          :key="index"
          :data-index="index"
          ref="optionItemsEl"
          tabindex="0"
          :class="{
            'jds-select__option': true,
            'jds-select__option--selected': isOptionSelected(opt)
          }"
          @click="onClickOptionItem(opt)"
          @keydown.stop.enter="onKeydownEnterOptionItem(opt)"
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
    localCopy('filter', 'mFilter'),
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
      default: true
    },

    /**
     * Set options as filterable by typing.
     * Options will be filtered based on its label.
     */
    filterable: {
      type: Boolean
    },
    /**
     * One of `start,contain`.
     * <br>
     * start: filter using `String#startsWith`
     * <br>
     * contain: filter using `String#includes`
     */
    filterType: {
      type: String,
      default: 'start',
    },
    /**
     * Initial filter value
     */
    filter: {
      type: String
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

    /**
     * Set header text on options dropdown
     */
    optionsHeader: {
      type: String
    }
  },
  data () {
    return {
      popperOptions: {
        ...popperOptions,
        placement: 'bottom-start',
      },
      isDropdownOpen: false,
      mValue: undefined,
      mFilter: undefined,
      inputElementValue: undefined,

      // a hint that user is still focusing within
      // JdsSelect, whether element is focusable or not
      capturedClickedElement: null
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
      return this.availableOptions.findIndex((opt) => {
        return getOptionValue(opt, this.valueKey) === this.mValue
      })
    },
    filterMatcher () {
      if (this.filterType === 'start') {
        return (actual, expected) => actual
          .toLowerCase()
          .startsWith(expected.toLowerCase())
      }
      return (actual, expected) => actual
        .toLowerCase()
        .includes(expected.toLowerCase())
    },
    availableOptions () {
      const canFilter = this.filterable
        && typeof this.mFilter === 'string'
        && this.mFilter.length
      if (!canFilter) {
        return this.options
      }
      const expected = this.mFilter.toLowerCase()
      return this.options.filter((opt) => {
        const actual = `${getOptionLabel(opt, this.labelKey)}`.toLowerCase()
        return this.filterMatcher(actual, expected)
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
      return this.availableOptions.find((opt) => {
        return getOptionLabel(opt, this.labelKey) === label
      })
    },
    listenToKeydownEvent (e) {
      const activeEl = document.activeElement
      const isWithinThisPopover = !!this.capturedClickedElement
        || this.$el?.contains?.(activeEl)
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
      if (this.filterable) {
        // TODO: find how to move focus from clicked element
        // to another
        setTimeout(() => {
          this.focusOnFilterInput()
        }, 50)
      } else {
        this.focusOnSelectInput()
      }
      this.isDropdownOpen = true
    },
    closeDropdown ({ retainFocus = false } = {}) {
      this.isDropdownOpen = false
      this.capturedClickedElement = null
      this.$nextTick(() => {
        if (retainFocus) {
          this.focusOnSelectInput()
        }
      })
    },
    // END: DROPDOWN STATE

    // START: NAVIGATION
    getFocusableElements () {
      const focusables = [
        ...this.$refs.optionItemsEl
      ]
      if (this.filterable) {
        focusables.unshift(this.$refs.filterInputText?.$refs?.inputEl)
      }
      return focusables
    },
    getCurrentFocusedElementIndex () {
      if (!(document?.hasFocus())) {
        return -1
      }
      const focusables = this.getFocusableElements()
      return focusables.findIndex((el) => {
        return document.activeElement === el
      })
    },
    moveFocus (focusableIndex) {
      const focusables = this.getFocusableElements()
      if (focusableIndex >= 0 && focusableIndex < focusables.length) {
        focusables[focusableIndex]?.focus()
      }
    },
    focusOnSelectInput () {
      this.$refs.selectInputText?.$refs?.inputEl?.focus?.()
    },
    focusOnFilterInput () {
      this.$refs.filterInputText?.$refs?.inputEl?.focus?.()
    },
    handleKeyboardNavigation(e) {
      const isEnter = keyCode.isEnter(e)
      const isTab = keyCode.isTab(e)
      const isEscape = keyCode.isEscape(e)
      const isGoingUp = keyCode.isArrow('Up', e)
      const isGoingDown = keyCode.isArrow('Down', e)

      // when dropdown is not open
      // arrow navigation will select option item
      if (!this.isDropdownOpen) {
        if (isEnter) {
          e.preventDefault()
          this.openDropdown()
        } else if (isGoingUp) {
          this.selectPreviousOption()
        } else if (isGoingDown) {
          this.selectNextOption()
        }
        return
      }

      // when dropdown is open,
      // navigation will move without selecting option item.
      let currentFocusedIndex = this.getCurrentFocusedElementIndex()
      
      const shouldClose = this.capturedClickedElement
        && currentFocusedIndex < 0
        && (isTab || isEscape)

      const forwardFocusToFilterInput = this.filterable
          && this.capturedClickedElement
          && currentFocusedIndex < 0
          && (isEnter || isGoingUp || isGoingDown)

      if (shouldClose) {
        e.preventDefault()
        this.closeDropdown({ retainFocus: true })
      } else if (forwardFocusToFilterInput) {
        this.focusOnFilterInput()
      } else if (isGoingUp) {
        this.moveFocus(currentFocusedIndex - 1)
      } else if (isGoingDown) {
        this.moveFocus(currentFocusedIndex + 1)
      }
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
    selectPreviousOption() {
      const i = Math.max(this.currentOptionIndex - 1, 0)
      const opt = this.availableOptions[i]
      this.changeSelectedOption(opt)
    },
    selectNextOption() {
      const i = Math.min(
        this.currentOptionIndex + 1,
        this.availableOptions.length - 1
      )
      const opt = this.availableOptions[i]
      this.changeSelectedOption(opt)
    },
    // END: OPTION STATE

    onClickCaptured (e) {
      // only capture when dropdown is open
      if (this.isDropdownOpen) {
        this.capturedClickedElement = e.target
      }
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
    onKeydownEnterOptionItem(option) {
      this.changeSelectedOption(option)
      this.closeDropdown({ retainFocus: true })
    },
    onFilterInput(str) {
      this.mFilter = typeof str === 'string' && str.length
        ? str
        : null
    },
    onKeydownFilterInput (e) {
      if (keyCode.isEscape(e)) {
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
