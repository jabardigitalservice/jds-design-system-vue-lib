<template>
  <div :class="{
    'jds-input-text-edge': true,
    'jds-input-text-edge--selectable': hasOptions,
    'jds-input-text-edge--dropdown-opened': isDropdownOpen,
    'jds-input-text-edge--prefix': type === 'prefix',
    'jds-input-text-edge--suffix': type === 'suffix',
  }">
    <div
      class="jds-input-text-edge__dropdown-trigger"
      @click="onToggleDropdown">
      <label>
        {{ label }}
      </label>
      <JdsIcon
        v-if="hasOptions"
        name="chevron-down"
        size="16px"
        class="jds-input-text-edge__dropdown-trigger__icon"
      />
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
          {{ getOptionLabel(opt, labelKey) }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import JdsIcon from '../JdsIcon'
import {
  getOptionLabel,
  getOptionValue,
  findMatchedOption
} from '../../utils/options-handler'
import localCopy from '../../mixins/local-copy'

export default {
  name: 'jds-input-text-edge',
  mixins: [localCopy('value', 'mValue')],
  components: {
    JdsIcon
  },
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
      return matched ? getOptionLabel(matched, this.labelKey) : null
    }
  },
  methods: {
    getOptionLabel,
    getOptionValue,
    onToggleDropdown () {
      this.isDropdownOpen = !this.isDropdownOpen
    },
    onClickOptionItem (option) {
      const value = getOptionValue(option, this.valueKey)
      this.isDropdownOpen = false
      this.mValue = value
      this.$emit('change', value)
    }
  }
}
</script>

<style lang="scss">
@use "./InputTextEdge.scss";
</style>
