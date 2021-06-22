<template>
  <div class="jds-popover-dropdown font-sans-1">
    <div
      v-if="$slots.header || headerText"
      class="jds-popover-dropdown__header"
    >
      <!-- @slot  Can be used to render custom header content.
                  When defined, this will replace text set in `header` props.
      -->
      <slot name="header">
        <span class="jds-popover-dropdown__header__text">
          {{ headerText }}
        </span>
      </slot>
    </div>
    <div class="jds-popover-dropdown__body">
      <i 
        v-if="arrow" 
        data-popper-arrow
        aria-hidden="true"
        class="jds-popover-dropdown__arrow">
      </i>
      <!-- @slot Dropdown content. -->
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    /**
     * Show arrow pointer. Can only be used if this component is part of `JdsPopover`.
     */
    arrow: {
      type: Boolean,
      default: false,
    },
    /**
     * Set dropdown header text.
     */
    headerText: {
      type: String,
    }
  }
}
</script>

<style lang="scss">
@use "./PopoverDropdown.scss";
</style>