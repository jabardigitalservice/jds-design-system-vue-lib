<template>
  <div :class="badgeClasses">
    <!-- 
      @slot Default slot.
    -->
    <slot></slot>
    <i
      v-show="show"
      class="jds-badge__dot"
      :style="dotStyles"
    />
  </div>
</template>

<script>
import { isCSSUnit } from '../../utils/css-units'
export default {
  props: {
    /**
     * Show badge.
     */
    show: {
      type: Boolean,
      default: true,
    },
    /**
     * Set dot color. Can be one of `red,green,blue`,
     * or a CSS color.
     */
    color: {
      type: String,
      default: 'red'
    },
    /**
     * Badge position. One of `left,right`.
     */
    position: {
      type: String,
      default: 'right'
    },
    /**
     * Set dot size. Can be one of:
     * <br>
     * - `xs,sm,md,lg,xs'
     * <br>
     * - CSS unit, e.g. 1rem;
     */
    size: {
      type: String,
      default: 'xs'
    }
  },
  computed: {
    isCustomSize () {
      return isCSSUnit(this.size)
    },
    isCustomColor () {
      return !['red', 'green', 'blue'].includes(this.color)
    },
    badgeClasses () {
      const classes = {
        'jds-badge font-sans-2': true,
        'jds-badge--active': this.show,
        'jds-badge--left': this.position === 'left',
        'jds-badge--right': this.position === 'right'
      }

      if (!this.isCustomSize) {
        const is = (size) => this.size === size
        Object.assign(classes, {
          'jds-badge--xs': is('xs'),
          'jds-badge--sm': is('sm'),
          'jds-badge--md': is('md'),
          'jds-badge--lg': is('lg'),
          'jds-badge--xl': is('xl'),
        })
      }

      if (!this.isCustomColor) {
        const is = (color) => this.color === color
        Object.assign(classes, {
          // default is red
          'jds-badge--red': is('red') || !this.color,
          'jds-badge--green': is('green'),
          'jds-badge--blue': is('blue'),
        })
      }

      return classes
    },
    dotStyles () {
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
    }
  }
}
</script>

<style lang="scss">
@use "./Badge.scss";
</style>
