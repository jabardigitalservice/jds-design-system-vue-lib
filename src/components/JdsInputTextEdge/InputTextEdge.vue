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
        {{ value }}
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
        <a @click="onClickOptionItem(opt, index)">
          { opt }
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import chevronDownIcon from '../../assets/icon/chevron-down.svg'
export default {
  name: 'jds-input-text-edge',
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
    dataId: {
      type: String,
    },
    dataValue: {
      type: String,
    },
  },
  data() {
    return {
      chevronDownIcon
    }
  },
  computed: {
    hasOptions () {
      return Array.isArray(this.options) && this.options.length
    }
  },
  methods: {
    onToggleDropdown () {
      this.isDropdownOpen = !this.isDropdownOpen
    },
    onClickOptionItem (option, index) {
      this.$emit('click:option-item', option, index)
    }
  }
}
</script>

<style lang="scss">
@import "./InputTextEdge.scss";
</style>
