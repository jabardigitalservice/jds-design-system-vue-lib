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
    <jds-options 
      v-if="hasSuggestions" class="jds-search__suggestions" 
      :options="suggestionsItems" 
      :header="suggestionsHeader"
      @click:option="setSelectedSuggestion"
    />
  </form>
</template>

<script>
import debounce from 'lodash/debounce'
import JdsIcon from '../JdsIcon'

export default {
  model: {
    prop: 'value',
    event: 'input',
  },
  name: 'jds-search',
  components: {
    JdsIcon
  },
  props: {
    /**
     * Bound model.
     * @name value
     * @model
     */
    value: {
      type: String,
      required: true
    },

    /**
     * Placeholder Attribute
     */
    placeholder: {
      type: [String, Number],
      required: false,
      default: null
    },

    /**
     * Name Attribute
     */
    name: {
      type: String,
      required: false,
      default: null
    },

    /**
     * Allow JdsSearch to show 
     * prefix icon
     */
    icon: {
      type: Boolean,
      required: false,
      default: false
    },

    /**
     * Allow JdsSearch to show
     * search button
     */
    button: {
      type: Boolean,
      required: false,
      default: true
    },

    /**
     * Show small variant of
     * JdsSearch
     */
    small: {
      type: Boolean,
      required: false,
      default: false
    },

    /**
     * Allow Jds Search to show
     * suggestions based on this data
     */
    suggestionsItems: {
      type: Array,
      required: false,
      default: () => []
    },

    /**
     * Suggestions header label
     */
    suggestionsHeader: {
      type: String,
      required: false,
      default: null
    },

    /**
     * The number in millisecond to 
     * debounce the value update
     */
    debounce: {
      type: Number,
      required: false,
      default: 0
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
    },
    hasSuggestions () {
      return !!this.suggestionsItems.length
    }
  },
  created() {
    this.setInputValue = debounce(this.setInputValue, this.debounce);
  },
  methods: {
    /**
     * Emmited on button click and/or
     * keyboard enter.
     * @param {string} value - updated bound model
     */
    submitFormData () {
      if (this.hasValue) {
        this.$emit('submit', this.value)
        this.clearInputValue()
      }
    },

    /**
     * Emmited on input.
     * @param {string} value - updated bound model
     */
    setInputValue (event) {
      this.$emit('input', event.target.value)
    },

    /**
     * Emmited on reset button clicked.
     */
    clearInputValue () {
      this.$emit('input', '')
    },

    /**
     * Emmited on suggestion option clicked.
     */
    setSelectedSuggestion (data) {
      this.$emit('click:suggestions', data)
    }
  }
}
</script>

<style lang="scss">
@import "./Search.scss";
</style>
