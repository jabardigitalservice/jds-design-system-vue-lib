<template>
  <div :class="badgeClasses">
    <div class="jds-badge__body">
      <!-- 
        @slot Default slot.
      -->
      <slot></slot>
    </div>
    <i
      class="jds-badge__indicator"
      :style="indicatorStyles"
    >
      <span>
        <!--
          @slot Slot inside badge indicator.
        -->
        <slot name="indicator">
          {{ value }}
        </slot>
      </span>
    </i>
  </div>
</template>

<script>
import { isCSSUnit } from '../../utils/css-units'
export default {
  model: {
    prop: 'show',
  },
  props: {
    /**
     * Show badge.
     * @name show
     * @model
     */
    show: {
      type: Boolean,
      default: true,
    },
    /**
     * Set value inside badge indicator.
     * Won't be shown if `dot` equals true.
     */
    value: {
      type: [String, Number],
      default: ''
    },
    /**
     * Badge position. One of `left,right`.
     */
    position: {
      type: String,
      default: 'right'
    },
    /**
     * Set badge indicator as inline element.
     */
    inline: {
      type: Boolean,
    },
    /**
     * Show indicator as dot, without inner content.
     */
    dot: {
      type: Boolean,
    },
    /**
     * Set indicator size. Can be one of:
     * 
     * - `xs,sm,md,lg,xs`
     * 
     * - CSS unit, e.g. `1rem`;
     * 
     * Default to `xs` when `dot` equals true, otherwise `md`.
     */
    size: {
      type: String,
      default: null
    },
    /**
     * Set indicator color. Can be one of `red,green,blue`,
     * or a CSS color.
     */
    color: {
      type: String,
      default: 'red'
    },
  },
  computed: {
    defaultSize () {
      return this.dot ? 'xs' : 'md'
    },
    isCustomSize () {
      return isCSSUnit(this.size)
    },
    isCustomColor () {
      if (!this.color) {
        return false
      }
      return !['red', 'green', 'blue'].includes(this.color)
    },
    badgeClasses () {
      const classes = {
        'jds-badge font-sans-2': true,
        'jds-badge--inline': this.inline,
        'jds-badge--dot': this.dot,
        'jds-badge--hidden': !this.show,
        'jds-badge--left': this.position === 'left',
        'jds-badge--right': this.position === 'right'
      }

      if (!this.isCustomSize) {
        const is = (size) => {
          return this.size
            ? this.size === size
            : this.defaultSize === size
        }
        Object.assign(classes, {
          'jds-badge--xs': is('xs'),
          'jds-badge--sm': is('sm'),
          'jds-badge--md': is('md'),
          'jds-badge--lg': is('lg'),
          'jds-badge--xl': is('xl'),
        })
      }

      if (!this.isCustomColor) {
        const is = (color) => {
          return this.color
            ? this.color === color
            : this.$options.props.color.default === color
        }
        Object.assign(classes, {
          // default is red
          'jds-badge--red': is('red'),
          'jds-badge--green': is('green'),
          'jds-badge--blue': is('blue'),
        })
      }

      return classes
    },
    indicatorStyles () {
      const styles = {}
      if (this.isCustomSize) {
        Object.assign(styles, {
          width: this.size,
          height: this.size,
          bottom: `calc(100% - (${this.size} / 2))`,
        })
      }
      if (this.isCustomColor) {
        Object.assign(styles, {
          backgroundColor: this.color,
        })
      }
      return styles
    },
  }
}
</script>

<style lang="scss">
@use "./Badge.scss";
</style>
