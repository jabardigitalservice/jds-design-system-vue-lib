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
      const iconComponent = await import(`../../assets/icon/${name}.svg?vue`)
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
