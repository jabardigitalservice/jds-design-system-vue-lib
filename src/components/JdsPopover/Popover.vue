<template>
  <div class="jds-popover font-sans-1">
    <div
      ref="activator"
      class="jds-popover__activator"
    >
      <!-- @slot When used, will activate the component when clicked or hovered. -->
      <slot name="activator" v-bind="activatorSlotProps"></slot>
    </div>
    <div
      ref="content"
      :class="{
        'jds-popover__content': true,
        'jds-popover__content--hidden': !mValue
      }"
    >
      <!-- @slot Popper content. `JdsPopoverDropdown` can be used for default dropdown styling. -->
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { createPopper } from '@popperjs/core'
import localCopy from '../../mixins/local-copy'

export default {
  mixins: [localCopy('value', 'mValue')],
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    /**
     * Bound model. Show popper content.
     * @name value
     * @model
     */
    value: {
      type: Boolean,
      default: false,
    },
    /**
     * Set popper.js constructor options.
     */
    options: {
      type: Object,
      default: null
    },
    /**
     * By default, popper.js will be constructed immediately
     * after mounted hooks. Set this to false, and use `JdsPopover#init`
     * to defer popper.js construction. 
     */
    immediate: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      popperInstance: null,
      mValue: false,
    }
  },
  computed: {
    activatorSlotProps () {
      return {
        on: {
          click: this.toggle
        }
      }
    },
  },
  mounted () {
    if (this.immediate) {
      this.init(this.options)
    }
  },
  methods: {
    /**
     * Construct `popper.js` instance.
     * @param {import("@popperjs/core/index").OptionsGeneric} options - `popper.js` constructor options
     * @public
     */
    async init(options) {
      await this.$nextTick()
      if (this.popperInstance) {
        this.popperInstance = null
      }
      this.popperInstance = createPopper(
        this.$refs.activator,
        this.$refs.content,
        options || {}
      )
    },
    destroy() {
      if (typeof this.popperInstance.destroy === 'function') {
        this.popperInstance.destroy()
      }
      this.popperInstance = null
    },
    /**
     * Get popper instance.
     * @public
     */
    getPopper() {
      return this.popperInstance
    },
    /**
     * Open popper.
     * @public
     */
    open () {
      this.mValue = true
    },
    /**
     * Close popper.
     * @public
     */
    close () {
      this.mValue = false
    },
    /**
     * Toggle popper between opened and closed.
     * @public
     */
    toggle () {
      this.mValue = !this.mValue
    }
  }
}
</script>

<style lang="scss">
@use "./Popover.scss";
</style>
