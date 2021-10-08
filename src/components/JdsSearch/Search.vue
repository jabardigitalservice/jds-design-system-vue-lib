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
      :value="mValue"
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
import JdsButton from '../JdsButton'
import localCopy from '../../mixins/local-copy'

export default {
  model: {
    prop: 'value',
    event: 'input',
  },
  name: 'jds-search',
  mixins: [
    localCopy('value', 'mValue')
  ],
  data () {
    return {
      mValue: null
    }
  },
  components: {
    JdsIcon,
    JdsButton
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
    }
  },
  computed: {
    hasValue () {
      return this.mValue !== ''
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
        /**
         * Emmited on button click and/or
         * keyboard enter.
         * @param {string} value - updated bound model
         */
        this.$emit('submit', this.mValue)
        this.clearInputValue()
      }
    },

    setInputValue (event) {
      this.mValue = event.target.value
      /**
      * Emmited on input.
      * @param {string} value - updated bound model
      */
      this.$emit('input', this.mValue)
    },

    clearInputValue () {
      this.mValue = ''
      /**
       * Emmited on reset button clicked.
       */
      this.$emit('input', '')
    }
  }
}
</script>

<style lang="scss">
@import "./Search.scss";
</style>
