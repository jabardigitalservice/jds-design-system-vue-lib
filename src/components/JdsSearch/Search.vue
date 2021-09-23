<template>
  <form 
    @submit.prevent="submitFormData" 
    class="jds-search font-sans-1"
    :class="{ 'jds-search--has-icon': hasIcon }"
  >
    <jds-icon v-if="hasIcon" name="magnifier" size="16px" class="jds-search__icon" fill="#BDBDBD" />
    <input 
      :value="value"
      type="text"
      placeholder="Text Placeholder"
      @input="setInputValue"
      class="jds-search__input"
      :class="{
        'jds-search__input--has-icon': hasIcon,
        'jds-search__input--has-button': hasButton
      }"
    >
    <div class="jds-search__reset-wrapper" @click="clearInputValue">
      <jds-icon v-show="hasValue" name="times-circle" size="16px" class="jds-search__reset" />
    </div>
     <jds-button v-if="hasButton" class="jds-search__button">Cari</jds-button>
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
    icon: {
      type: Boolean,
      required: false,
      default: true
    },
    button: {
      type: Boolean,
      required: false,
      default: true
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
