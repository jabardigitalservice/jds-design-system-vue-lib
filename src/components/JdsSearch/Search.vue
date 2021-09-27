<template>
  <form 
    @submit.prevent="submitFormData" 
    class="jds-search font-sans-1"
    :class="{ 
      'jds-search--has-icon': hasIcon,
      'jds-search--small': isSmall
    }"
  >
    <jds-icon v-if="hasIcon" name="magnifier" size="18px" class="jds-search__icon" fill="#BDBDBD" />
    <input 
      :value="value"
      type="text"
      :placeholder="placeholder"
      :name="name"
      @input="setInputValue"
      class="jds-search__input"
    >
    <div class="jds-search__reset-wrapper" @click="clearInputValue">
      <jds-icon v-show="hasValue" name="times-circle" size="16px" class="jds-search__reset" />
    </div>
    <jds-button 
      v-if="hasButton" 
      class="jds-search__button"
      :class="{'jds-search__button--small' : isSmall}"
    >
      <template v-if="isSmall">
        <jds-icon name="magnifier" size="16px" fill="#FFFFFF" />
      </template>
      <template v-else>
        Cari
      </template>
    </jds-button>
  </form>
</template>

<script>
import JdsIcon from '../JdsIcon'

export default {
  name: 'jds-search',
  components: {
    JdsIcon
  },
  props: {
    value: {
      type: String,
      required: true
    },
    placeholder: {
      type: [String, Number],
      required: false,
      default: null
    },
    name: {
      type: String,
      required: false,
      default: null
    },
    icon: {
      type: Boolean,
      required: false,
      default: true
    },
    button: {
      type: Boolean,
      required: false,
      default: true
    },
    small: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    hasValue () {
      return this.value !== ''
    },
    hasIcon () {
      return this.icon
    },
    hasButton () {
      return this.button
    },
    isSmall () {
      return this.small
    }
  },
  methods: {
    submitFormData () {
      if (this.hasValue) {
        this.$emit('submit', this.value)
        this.clearInputValue()
      }
    },
    setInputValue (event) {
      this.$emit('input', event.target.value)
    },
    clearInputValue () {
      this.$emit('input', '')
    }
  }
}
</script>

<style lang="scss">
@import "./Search.scss";
</style>
