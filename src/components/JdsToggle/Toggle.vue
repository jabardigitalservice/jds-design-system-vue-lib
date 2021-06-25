<template>
  <div class="jds-toggle__wrapper font-sans-1" :class="{'is-inline': isInline}">
    <div v-if="hasLabel">
      <jds-form-control-label>
        {{ label }}
      </jds-form-control-label>
      <jds-form-control-helper-text>
        {{ helperText }}
      </jds-form-control-helper-text>
    </div>
    <label class="jds-toggle" :class="{'has-margin': hasMargin}">
      <input hidden :checked="mChecked" v-model="mChecked" @click="onClickCheckbox" type="checkbox" name="toggle" />
      <span class="jds-toggle__slider jds-toggle__circle"></span>
    </label>
  </div>
</template>

<script>
import { JdsFormControlLabel, JdsFormControlHelperText } from '../JdsFormControl'
import localCopy from '../../mixins/local-copy'

export default {
  name: 'jds-toggle',
  mixins: [
    localCopy('checked', 'mChecked')
  ],
  model: {
    prop: 'checked',
    event: 'change',
  },
  components: {
    JdsFormControlLabel,
    JdsFormControlHelperText
  },
  props: {
    /**
     * Bound model.
     * @name checked
     * @model
     */
    checked: {
      type: Boolean
    },
    /**
     * Label for the toggle
     */
    label: {
      type: String
    },
    /**
     * Helper text for the toggle
     */
    helperText: {
      type: String
    },
    /**
     * Display the toggle inline
     */
    inline: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      mChecked: undefined
    }
  },
  computed: {
    hasLabel () {
      return this.label
    },
    isInline () {
      return this.hasLabel && this.inline
    },
    hasMargin () {
      return this.hasLabel && !this.inline
    }
  },
  methods: {
    onClickCheckbox () {
      this.mChecked = !this.mChecked
      /**
       * Emitted on change
       * @param {boolean} checked
       */
      this.$emit('change', this.mChecked) 
    }
  }
}
</script>

<style lang="scss">
@import "./Toggle.scss";
</style>
