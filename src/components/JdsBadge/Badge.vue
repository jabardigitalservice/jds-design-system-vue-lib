<template>
  <div :class="badgeClasses">
    <div class="jds-badge__body">
      <!-- 
        @slot Default slot.
      -->
      <slot></slot>
    </div>
    <i
      ref="indicator"
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
     * Badge vertical alignment. One of `top,middle`.
     */
    align: {
      type: String,
      default: 'top'
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
        'jds-badge--right': this.position === 'right',
        'jds-badge--top': this.align === 'top',
        'jds-badge--middle': this.align === 'middle'
      }

      if (!this.isCustomSize) {
        const isSize = (size) => this.size === size
        Object.assign(classes, {
          'jds-badge--xs': isSize('xs'),
          'jds-badge--sm': isSize('sm'),
          'jds-badge--md': isSize('md'),
          'jds-badge--lg': isSize('lg'),
          'jds-badge--xl': isSize('xl'),
        })
      }

      if (!this.isCustomColor) {
        const isColor = (color) => this.color === color
        Object.assign(classes, {
          'jds-badge--red': isColor('red'),
          'jds-badge--green': isColor('green'),
          'jds-badge--blue': isColor('blue'),
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
