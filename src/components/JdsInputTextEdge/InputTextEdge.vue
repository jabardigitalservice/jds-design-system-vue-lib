<template>
  <div :class="{
    'jds-input-text-edge': true,
    'is-clickable': hasOptions,
    'is-dropdown-open': isDropdownOpen,
    'is-prefix': type === 'prefix',
    'is-suffix': type === 'suffix',
  }">
    <div
      class="jds-input-text-edge__dropdown-trigger"
      @click="onToggleDropdown">
      <label>
        {{ label }}
      </label>
      <img
        v-if="hasOptions"
        :src="chevronDownIcon">
    </div>
    <ul
      v-if="hasOptions"
      role="dropdown"
      class="jds-input-text-edge__dropdown">
      <li
        v-for="(opt, index) in options"
        :key="index"
        role="dropdown-item"
        class="jds-input-text-edge__dropdown-item"
      >
        <a @click="onClickOptionItem(opt)">
          {{ getOptionLabel(opt) }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import chevronDownIcon from '../../assets/icon/chevron-down.svg'
import {
  getOptionLabel,
  getOptionValue,
  findMatchedOption
} from '../../utils/options-handler'
import localCopy from '../../mixins/local-copy'

export default {
  name: 'jds-input-text-edge',
  mixins: [localCopy('value', 'mValue')],
  props: {
    type: {
      validator: (v) => {
        return typeof v === 'string'
          && ['prefix', 'suffix'].includes(v)
      }
    },
    value: {
      type: [String, Number, Boolean]
    },
    options: {
      type: Array,
    },
    valueKey: {
      type: String,
    },
    labelKey: {
      type: String,
    },
  },
  data() {
    return {
      chevronDownIcon,
      mValue: undefined,
      isDropdownOpen: false,
    }
  },
  computed: {
    hasOptions () {
      return Array.isArray(this.options) && this.options.length
    },
    label () {
      if (!Array.isArray(this.options)) {
        return this.mValue
      }
      const matched = findMatchedOption(this.mValue, this.options, this.valueKey)
      return matched ? getOptionLabel(matched) : null
    }
  },
  methods: {
    getOptionLabel,
    getOptionValue,
    onToggleDropdown () {
      this.isDropdownOpen = !this.isDropdownOpen
    },
    onClickOptionItem (option) {
      this.isDropdownOpen = false
      this.mValue = getOptionValue(option, this.valueKey)
      this.$emit('click:option', option)
    }
  }
}
</script>

<style lang="scss">
@use "./InputTextEdge.scss";
</style>
