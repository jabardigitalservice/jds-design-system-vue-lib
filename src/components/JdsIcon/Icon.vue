<template>
  <i
    :class="iconClasses"
    v-on="$listeners"
  >
    <component
      :is="iconComponent"
      class="jds-icon__svg"
      :style="svgStyles"
      v-bind="$attrs"
    />
  </i>
</template>

<script>
import { isCSSUnit } from '../../utils/css-units'
export default {
  props: {
    /**
     * Icon name
     */
    name: {
      type: String,
      required: true,
    },
    /**
     * Icon size. Can be one of `xs,sm,md,lg,xl` or a CSS unit, e.g "16px", "1rem".
     * @values xs,sm,md,lg,xl,'cssUnit'
     */
    size: {
      type: String,
      default: 'md'
    },
    /**
     * Rotate icon. Unit in degrees.
     */
    rotate: {
      type: [String, Number],
      default: 0,
    },
  },
  data() {
    return {
      iconComponent: null,
    }
  },
  computed: {
    isCustomSize () {
      return isCSSUnit(this.size)
    },
    iconClasses () {
      const classes = {
        'jds-icon': true,
      }

      // size modifier classes should not be assigned
      // if `size` prop is defined using CSS unit.
      if (!this.isCustomSize) {
        Object.assign(classes, {
          'jds-icon--xs': this.size === 'xs',
          'jds-icon--sm': this.size === 'sm',
          'jds-icon--md': this.size === 'md',
          'jds-icon--lg': this.size === 'lg',
          'jds-icon--xl': this.size === 'xl',
        })
      }
      return classes
    },
    svgStyles () {
      const styles = {}
      if (this.isCustomSize) {
        styles.width = this.size
        styles.height = this.size
      }
      const rotate = parseInt(this.rotate)
      if (!Number.isNaN(rotate)) {
        styles.transform = `rotate(${rotate}deg)`
      }
      // if `fill` attribute is nil,
      // fallback inherited css `color` attribute
      if (!this.$attrs.fill) {
        styles.fill = 'currentColor'
      }
      return styles
    }
  },
  watch: {
    name: {
      immediate: true,
      handler: 'loadIcon'
    }
  },
  methods: {
    async loadIcon (name) {
      if (typeof name !== 'string' || !name.length) {
        this.iconComponent = null
        return
      }
      // dynamic import component based on provided `name` prop
      const iconComponent = await import(`@jabardigitalservice/jds-design-system/icons/${name}`)
        .then((m) => m.default || m)
        // return null on import error
        .catch(() => null)
      this.iconComponent = iconComponent || null
    }
  }
}
</script>


<style lang="scss">
@use "./Icon.scss";
</style>
