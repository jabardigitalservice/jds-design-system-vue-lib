<template>
  <div
    :class="{
      'jds-options': true,
      'jds-options--filterable': filterable,
      'jds-options--has-header': !!header,
    }"
    @keydown="handleKeyboardNavigation"
  >
    <div tabindex="0" class="jds-options__header">
      <strong>{{ header }}</strong>
    </div>
    <jds-input-text
      tabindex="0"
      :value="mFilter"
      ref="filterInputText"
      class="jds-options__filter"
      @input="onFilterInput"
    >
      <template #prefix-icon>
        <jds-icon
          name="magnifier"
          size="14px" 
          fill="#BDBDBD"
        />
      </template>
    </jds-input-text>
    <ul
      ref="optionList"
      tabindex="0"
      class="jds-options__option-list"
    >
      <li
        v-for="(opt, index) in availableOptions"
        :key="index"
        :data-index="index"
        ref="optionListItems"
        tabindex="0"
        :class="{
          'jds-options__option-list-item': true,
          'jds-options__option-list-item--selected': isOptionSelected(opt),
        }"
        @click="onClickOptionItem(opt)"
        @keydown.enter="onKeydownEnterOptionItem(opt)"
        @keydown.delete="onKeydownDeleteOptionItem(opt)"
        @mouseover="focusOnOption(index)"
      >
        <span class="jds-options__option-list-item__text">
          {{ getOptionLabel(opt, labelKey) }}
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
import * as keyCode from "../../utils/key-code"
import localCopy from "../../mixins/local-copy"
import JdsIcon from "../JdsIcon"
import JdsInputText from "../JdsInputText"

import {
  getOptionLabel,
  getOptionValue,
} from "../../utils/options-handler"

export default {
  name: "jds-options",
  model: {
    prop: "value",
    event: "change",
  },
  components: {
    JdsIcon,
    JdsInputText,
  },
  mixins: [
    localCopy("value", "mValue"),
    localCopy("filter", "mFilter")
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

    /**
     * Set header text
     */
    header: {
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

    /**
     * Enable options navigation using keyboard arrows.
     */
    kbdNavigation: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      mValue: undefined,
      mFilter: undefined,
    }
  },
  computed: {
    currentOptionIndex() {
      return this.availableOptions.findIndex((opt) => {
        return getOptionValue(opt, this.valueKey) === this.mValue
      })
    },
    filterMatcher() {
      if (this.filterType === "start") {
        return (actual, expected) =>
          actual.toLowerCase().startsWith(expected.toLowerCase())
      }
      return (actual, expected) =>
        actual.toLowerCase().includes(expected.toLowerCase())
    },
    availableOptions() {
      const canFilter =
        this.filterable &&
        typeof this.mFilter === "string" &&
        this.mFilter.length
      if (!canFilter) {
        return this.options
      }
      const expected = this.mFilter.toLowerCase()
      return this.options.filter((opt) => {
        const actual = `${getOptionLabel(opt, this.labelKey)}`.toLowerCase()
        return this.filterMatcher(actual, expected)
      })
    },
  },
  methods: {
    // START: OPTION STATE AND METHODS
    getOptionLabel,
    getOptionValue,
    isOptionSelected(option) {
      const val = getOptionValue(option, this.valueKey)
      return this.mValue === val
    },
    changeSelectedOption(newOption) {
      this.mValue = getOptionValue(newOption, this.valueKey)
      this.emitChange(this.mValue)
    },
    /**
     * @public
     */
    resetSelectedOption() {
      this.mValue = undefined
      this.emitChange(this.mValue)
    },
    /**
     * @public
     */
    selectFirstOption() {
      const opt = this.availableOptions[0]
      this.changeSelectedOption(opt)
    },
    /**
     * @public
     */
    selectPreviousOption() {
      const i = Math.max(this.currentOptionIndex - 1, 0)
      const opt = this.availableOptions[i]
      this.changeSelectedOption(opt)
    },
    /**
     * @public
     */
    selectNextOption() {
      const i = Math.min(
        this.currentOptionIndex + 1,
        this.availableOptions.length - 1
      )
      const opt = this.availableOptions[i]
      this.changeSelectedOption(opt)
    },
    /**
     * @public
     */
    selectLastOption() {
      const len = this.availableOptions.length
      const opt = this.availableOptions[len - 1]
      this.changeSelectedOption(opt)
    },
    // END: OPTION STATE AND METHODS

    // START: NAVIGATION
    initFocus () {
      if (this.currentOptionIndex >= 0) {
        this.focusOnOption(this.currentOptionIndex)
      } else {
        this.focusOnFirstFocusable()
      }
    },
    focusOnFirstFocusable() {
      if (this.filterable) {
        this.focusOnFilterInput()
      } else {
        this.focusOnFirstOption()
      }
    },
    /**
     * Set focus on filter input
     * @public
     */
    focusOnFilterInput() {
      this.$refs.filterInputText?.$refs?.inputEl?.focus()
    },
    isFocusingOnFilterInput() {
      return document?.hasFocus()
        && document.activeElement === this.$refs.filterInputText?.$refs.inputEl
    },
    getCurrentFocusedOptionIndex() {
      if (!document?.hasFocus()) {
        return -1
      }
      return this.$refs?.optionListItems?.findIndex((el) => {
        return el === document.activeElement
          || el.contains(document.activeElement)
      })
    },
    /**
     * Set focus to specific option using index
     * @public
     */
    focusOnOption(index) {
      if (index >= 0 && index < this.availableOptions.length) {
        this.$refs.optionListItems?.[index]?.focus()
      }
    },
    focusOnSelectedOption() {
      const index = this.currentOptionIndex
      if (index >= 0 && index < this.availableOptions.length) {
        this.$refs.optionListItems?.[index]?.focus()
      } else {
        this.$refs.optionListItems?.[0]?.focus()
      }
    },
    /**
     * Set focus to first option
     * @public
     */
    focusOnFirstOption() {
      this.focusOnOption(0)
    },
    /**
     * Set focus to previous option,
     * based on latest focused option
     * @public
     */
    focusOnPrevOption() {
      const i = this.getCurrentFocusedOptionIndex()
      this.focusOnOption(i - 1)
    },
    /**
     * Set focus to next option,
     * based on latest focused option
     * @public
     */
    focusOnNextOption() {
      const i = this.getCurrentFocusedOptionIndex()
      this.focusOnOption(i + 1)
    },
    /**
     * Set focus to last option
     * @public
     */
    focusOnLastOption() {
      this.focusOnOption(this.availableOptions.length - 1)
    },
    handleKeyboardNavigation(e) {
      if (!this.kbdNavigation) {
        return
      }
      const isGoingUp = keyCode.isArrow("Up", e)
      const isGoingDown = keyCode.isArrow("Down", e)
      const filterInputHasFocus = this.isFocusingOnFilterInput()
      const currentFocusedOptionIndex = this.getCurrentFocusedOptionIndex()

      const isRetainingFocus = !filterInputHasFocus
        && currentFocusedOptionIndex < 0
        && (isGoingUp || isGoingDown)

      if (isRetainingFocus) {
        this.focusOnFirstFocusable()
      } else if (currentFocusedOptionIndex === 0 && isGoingUp) {
        this.focusOnFirstFocusable()
      } else if (isGoingUp) {
        this.focusOnPrevOption()
      } else if (isGoingDown) {
        this.focusOnNextOption()
      }
    },
    // END: NAVIGATION

    onClickOptionItem(option) {
      if (this.isOptionSelected(option)) {
        this.resetSelectedOption()
      } else {
        this.changeSelectedOption(option)
      }
      this.emitClickOption(option)
    },
    onKeydownEnterOptionItem(option) {
      this.changeSelectedOption(option)
      this.emitKeydownEnter(option)
    },
    onKeydownDeleteOptionItem(option) {
      if (this.isOptionSelected(option)) {
        this.resetSelectedOption()
        this.emitKeydownDelete(option)
      }
    },
    onFilterInput(str) {
      this.mFilter = typeof str === "string" && str.length ? str : null
      this.$emit('change:filter', this.mFilter)
    },
    emitChange(value) {
      /**
       * Emitted when value changed
       */
      this.$emit("change", value)
    },
    emitClickOption(option) {
      /**
       * Emitted when option changed via click
       */
      this.$emit('click:option', option)
    },
    emitKeydownEnter(option) {
      /**
       * Emitted when option selected via keydown enter
       */
      this.$emit('keydown-enter:option', option)
    },
    emitKeydownDelete(option) {
      /**
       * Emitted when option unselected via keydown delete or backspace
       */
      this.$emit('keydown-delete:option', option)
    },
  },
}
</script>

<style lang="scss">
@use "./Options.scss";
</style>
