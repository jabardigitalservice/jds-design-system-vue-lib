<template>
  <div
    :class="{
      'jds-checkbox-toggle': true,
      'jds-checkbox-toggle--indeterminate': mIndeterminate,
      'jds-checkbox-toggle--checked': !mIndeterminate && mChecked,
      'jds-checkbox-toggle--hovered': isHovered,
      'jds-checkbox-toggle--focused': isFocused
    }"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
    @click="onClick"
  >
    <input
      :name="name"
      type="checkbox"
      style="display: none;"
      :tabIndex="-1"
      :checked="mChecked"
    >
    <i
      role="checkbox"
      :class="{
        'jds-checkbox-toggle__icon-wrapper': true,
        'jds-checkbox-toggle__icon-wrapper--sm': size === 'sm'
      }"
      :tabIndex="1"
      @focus="onFocus"
      @blur="onBlur"
    >
      <jds-icon
        name="check-mark"
        alt="checked"
        class="jds-checkbox-toggle__icon"
        fill="white"
      />
      <jds-icon
        v-show="mIndeterminate"
        name="minus"
        alt="indeterminate"
        class="jds-checkbox-toggle__icon"
        fill="white"
      />
    </i>
  </div>
</template>

<script>
import JdsIcon from '../JdsIcon'
import localCopy from '../../mixins/local-copy'

export default {
  name: 'jds-checkbox-toggle',
  mixins: [
    localCopy('indeterminate', 'mIndeterminate')
  ],
  model: {
    prop: 'checked',
    event: 'change'
  },
  components: {
    JdsIcon
  },
  props: {
    /**
     * Checkbox name attribute.
     */
    name: {
      type: String,
    },
    /**
     * Checkbox value.
     */
    value: {
      type: [String, Number, Boolean],
      default: null,
    },
    /**
     * Bound model. Display check mark icon if equals true.
     * @name checked
     * @model
     */
    checked: {
      type: [String, Number, Boolean]
    },
    /**
     * Set checkbox as indeterminate (nor true or false).
     * Override currently displayed icon, if any.
     */
    indeterminate: {
      type: Boolean,
    },
    /**
     * Determine checkbox size.
     * @values sm,md
     */
    size: {
      type: String,
      default: 'md'
    }
  },
  data () {
    return {
      isHovered: false,
      isFocused: false,
      mChecked: false,
      mIndeterminate: false
    }
  },
  computed: {
    hasInputValue () {
      return this.value !== null && typeof this.value !== 'undefined'
    }
  },
  watch: {
    checked: {
      immediate: true,
      handler (v) {
        if (!this.hasInputValue) {
          this.mChecked = !!v
          return
        }
        if (v === true) {
          this.mChecked = true
          return
        }
        this.mChecked = v === this.value
      }
    }
  },
  methods: {
    onClick () {
      if (this.mIndeterminate) {
        this.mIndeterminate = !this.mIndeterminate
        this.emitIndeterminateUpdate()
      }
      this.mChecked = !this.mChecked
      this.emitClick()
      this.emitInput(this.mChecked)
      this.emitChange(this.mChecked)
    },
    emitClick () {
      /**
       * Emitted when checkbox is clicked.
       */
      this.$emit('click')
    },
    emitInput (checked) {
      /**
       * Emitted when checkbox checked state is changed.
       * @param {any} value
       */
      this.$emit('input', checked ? this.value : undefined)
    },
    emitChange (checked) {
      if (this.hasInputValue) {
        this.$emit('change', this.mChecked ? this.value : undefined)
      } else {
        /**
         * Emitted when checkbox checked state is changed.
         * @param {boolean} checked
         */
        this.$emit('change', checked)
      }
    },
    emitIndeterminateUpdate() {
      /**
       * Emitted when checkbox indeterminate state is changed.
       * Support `.sync` modifier.
       * @param {boolean} indeterminate
       */
      this.$emit('update:indeterminate', this.mIndeterminate)
    },
    onFocus () {
      this.isFocused = true
      this.$emit('focus')
    },
    onBlur () {
      this.isFocused = false
      this.$emit('blur')
    }
  }
}
</script>

<style lang="scss" scoped>
@use "./CheckboxToggle.scss";
</style>
