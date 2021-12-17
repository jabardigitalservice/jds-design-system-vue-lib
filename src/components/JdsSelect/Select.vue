<template>
  <jds-popover
    ref="popover"
    v-clickaway="onClickaway"
    :value="isDropdownOpen" 
    :options="popperOptions"
    @input="toggleDropdown"
    @keydown.native="handleKeydown"
  >
    <template #activator>
      <!--
        @slot internal use only
        @ignore
      -->
      <slot name="activator" v-bind="activatorSlotProps">
        <div :class="{
          'jds-select font-sans-1': true,
          'jds-select--opened': isDropdownOpen,
          'jds-select--tile': tile,
          'jds-select--disabled': disabled
        }">
          <jds-input-text
            :value="`${selectedOptionLabel}`"
            readonly
            :disabled="disabled"
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
      </slot>
    </template>
    <jds-options
      ref="optionsRef"
      class="jds-select__options"
      :style="{
        maxHeight, 
      }"
      v-bind="{
        options,
        valueKey,
        labelKey,
        header: optionsHeader,
        filterable,
        filter: mFilter,
        filterType,
      }"
      :value="mValue"
      :kbd-navigation="optionsKbdNavigation"
      @click:option="onOptionClicked"
      @change="onOptionsValueChanged"
      @change:filter="onOptionsFilterChanged"
    />
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
import JdsOptions from '../JdsOptions'
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
    JdsInputText,
    JdsFormControlErrorMessage,
    JdsOptions
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

    // START: JdsOptions related props ========================================
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
      default: "value",
    },
    /**
     * Required if options consist of objects.
     * Defined option label.
     */
    labelKey: {
      type: String,
      default: "label",
    },
    // END: JdsOptions related props ========================================

    /**
     * Set header text
     */
    optionsHeader: {
      type: String,
    },

    /**
     * Set options as filterable by typing.
     * Options will be filtered based on its label.
     */
    filterable: {
      type: Boolean,
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
      default: "start",
    },
    /**
     * Initial filter value
     */
    filter: {
      type: String,
    },
    // END: JdsOptions related props ========================================

    /**
     * Close options dropdown on option clicked.
     */
    autoClose: {
      type: Boolean,
      default: true
    },

    /**
     * Remove border radius from input text element
     */
    tile: {
      type: Boolean,
      default: false,
    },

    /**
     * Set maximum height of options dropdown.
     * Must be a valid CSS unit.
     */
    maxHeight: {
      type: String,
      default: 'unset',
    },

    /**
     * Reset filter each time dropdown is opened
     */
    resetFilterOnOpen: {
      type: Boolean,
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
     * Internal use only
     * @private
     * @ignore
     */
    disabled: {
      type: Boolean,
    },

    /**
     * Enable options navigation using keyboard arrows.
     * One of:
     * 
     * - `always`
     * <br>
     * Enable navigation even when dropdown is closed.
     * Should only be used when the activator is able
     * to show the selected value(s) within itself,
     * e.g InputText, Textarea, etc.
     * 
     * - `opened`
     * <br>
     * Enable navigation only when dropdown is opened.
     */
    optionsNavigation: {
      type: String,
      default: 'always'
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
    }
  },
  computed: {
    activatorSlotProps () {
      return {
        on: {
          click: this.toggleDropdown,
        },
        isOpened: this.isDropdownOpen,
        open: this.openDropdown,
        close: this.closeDropdown,
        toggle: this.toggleDropdown,
      }
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
    selectedOptionLabel () {
      if (!Array.isArray(this.options)) {
        return ''
      }
      const matched = this.options.find((opt) => {
        return getOptionValue(opt, this.valueKey) === this.mValue
      })
      if (!matched) {
        return ''
      }
      return getOptionLabel(matched, this.labelKey)
    },
    currentOptionIndex () {
      return this.options.findIndex((opt) => {
        const val = this.getOptionValue(opt, this.valueKey)
        return val === this.mValue 
      })
    },
    optionsKbdNavigation () {
      if(this.optionsNavigation === 'always') {
        return true
      }
      return this.isDropdownOpen && this.optionsNavigation === 'opened'
    }
  },
  watch: {
    disabled: {
      immediate: true,
      handler (v) {
        if (v && this.isDropdownOpen) {
          this.closeDropdown()
        }
      }
    },
  },
  methods: {
    getOptionLabel,
    getOptionValue,
    findMatchedOption,
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
      if (this.resetFilterOnOpen) {
        this.mFilter = undefined
      }
    },
    /**
     * @param {object} options
     * @param {boolean} options.retainFocus - Keep focus on JdsSelect
     *     when closed.
     */
    closeDropdown ({ retainFocus = false } = {}) {
      this.isDropdownOpen = false
      this.$nextTick(() => {
        if (retainFocus) {
          this.focusOnActivator()
        }
        if (this.filterPosition === 'input') {
          this.mFilter = null
        }
      })
    },
    // END: DROPDOWN STATE

    // START: NAVIGATION
    handleKeydown(e) {
      const isGoingUp = keyCode.isArrow("Up", e)
      const isGoingDown = keyCode.isArrow("Down", e)
      const isEnter = keyCode.isEnter(e)
      const isTab = keyCode.isTab(e)
      const isEscape = keyCode.isEscape(e)
      const isFocusOnActivator = this.isFocusingOnActivator()
      const shouldPreventDefault = isGoingUp
        || isGoingDown
        || isEnter
        || isTab
        || isEscape
      
      if (shouldPreventDefault) {
        e.preventDefault()
      }

      // START: when options is closed
      if (!this.isDropdownOpen) {
        if (isEnter) {
          // open options on Enter
          this.openDropdown()
        }
        if (this.optionsNavigation === 'opened') {
          return
        }
        if (isGoingUp) {
          // auto select prev option on Arrow Up
          this.selectPreviousOption()
        } else if (isGoingDown) {
          // auto select next option on Arrow Up
          this.selectNextOption()
        }
        return
      }
      // END: when options is closed

      // START: move focus to JdsOptions
      // when options is open and focus is on JdsSelect <input> element,
      // move focus to JdsOptions
      const doMoveFocus = isFocusOnActivator
        && (isGoingUp || isGoingDown)
      if (doMoveFocus) {
        if (this.currentOptionIndex >= 0) {
          // move focus straight to selected option,
          // if any were selected
          this.focusOnSelectedOption()
        } else {
          // move focus to first focusable element on JdsOptions
          // can be either filter input or first option item
          this.focusOnOptionsComponent()
        }
        return
      }
      // END: move focus to JdsOptions

      // keys that trigger close:
      // 1. Tab
      // 2. Escape
      // 3. Enter (ignored when autoClose is false)
      const shouldClose = isTab
        || isEscape
        || (isEnter && this.autoClose)
      if (shouldClose) {
        // prevent focus from moving to next focusable element,
        // retain focus on input text element
        this.closeDropdown({ retainFocus: true })
      }
    },
    isFocusingOnActivator () {
      return this.$refs.popover.isFocusingOnActivator()
    },
    focusOnActivator () {
      return this.$refs.popover.focusOnActivator()
    },
    focusOnOptionsComponent () {
      this.$refs.optionsRef?.initFocus?.()
    },
    focusOnSelectedOption () {
      this.$refs.optionsRef?.focusOnSelectedOption?.()
    },
    selectPreviousOption () {
      this.$refs.optionsRef?.selectPreviousOption?.()
    },
    selectNextOption () {
      this.$refs.optionsRef?.selectNextOption?.()
    },
    // END: NAVIGATION

    onTriggerClicked () {
      this.focusOnActivator()
    },

    onInputClicked () {
      this.toggleDropdown()
    },
    onClickaway() {
      if (this.isDropdownOpen) {
        this.closeDropdown({ retainFocus: true })
      }
    },
    onOptionClicked() {
      // only determine whether dropdown needs to be closed or not.      
      if (this.autoClose) {
        this.closeDropdown({ retainFocus: true })
      }
    },
    onOptionsValueChanged (value) {
      this.mValue = value
      this.emitChange(this.mValue)
    },
    onOptionsFilterChanged (filter) {
      this.mFilter = filter
      /**
       * Support `.sync` modifier for `filter` prop.
       * Emitted when filter changed
       * @param {string} filter
       */
      this.$emit('update:filter', filter)

      /**
       * Emitted when filter changed
       * @param {string} filter
       */
      this.$emit('change:filter', filter)
    },
    emitChange (value) {
      /**
       * Emitted when value changed
       * @param {any} value
       */
      this.$emit('change', value)
    },
  }
}
</script>

<style lang="scss">
@use "./Select.scss";
</style>
