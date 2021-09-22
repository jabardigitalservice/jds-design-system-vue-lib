<template>
  <div
    tabindex="0"
    :class="{
      'jds-chip': true,
      'jds-chip--has-figure': hasImage,
      'jds-chip--has-icon': hasIcon,
      'jds-chip--has-text-only': hasTextOnly,
      'jds-chip--selected': mSelected,
      'jds-chip--expanded': mExpanded,
      'jds-chip--multiple': multiple,
    }"
    @click="onClickChip"
    @keydown.enter.exact="onKeydownEnter"
    @keydown.delete.exact="onKeydownDelete"
  >
    <!--
      @slot Figure/image slot
    -->
    <slot name="figure">
      <img
        class="jds-chip__figure"
        :src="image"
      />
    </slot>

    <!-- 
      @slot Default slot. Will replace chip's badge and/or chip's label.
    -->
    <slot>
      <JdsBadge
        v-bind="badgeProps"
        class="jds-chip__badge"
        align="middle"
        inline
      >
        <span class="font-sans-1 jds-chip__label jds-chip__label--badge">
          {{ label }}
        </span>
      </JdsBadge>
    </slot>

    <!--
      @slot Icon slot.
    -->
    <slot name="icon">
      <i
        class="jds-chip__icon-wrapper"
      >
        <JdsIcon
          name="check-mark-circle"
          class="jds-chip__icon jds-chip__icon--check-mark"
        />
      </i>
      <JdsIcon
        name="chevron-down"
        class="jds-chip__icon jds-chip__icon--chevron-down"
      />
    </slot>
  </div>
</template>

<script>
import JdsIcon from '../JdsIcon'
import JdsBadge from '../JdsBadge'
import localCopy from '../../mixins/local-copy'

export default {
  model: {
    prop: 'selected',
    event: 'change'
  },
  mixins: [localCopy('expanded', 'mExpanded')],
  components: {
    JdsBadge,
    JdsIcon
  },
  props: {
    /**
     * Bound model.
     * 
     * Set selected state. Requires `selectable` to be true.
     * @name selected
     * @model
     */
    selected: {
      // intentionally set without type
      default: false,
    },
    /**
     * NOTES: ON DEVELOPMENT
     * A flag indicating that a chip holds an array of values.
     * Badge will then show the length of values.
     * @ignore
     */
    multiple: {
      type: Boolean,
    },
    /**
     * NOTES: ON DEVELOPMENT
     * Set chevron-down icon to rotate.
     * Requires `multiple` to equals true.
     * @ignore
     */
    expanded: {
      type: Boolean
    },
    /**
     * Chip value.
     */
    value: {
      type: [String, Number, Boolean, Object, Array],
      default: undefined
    },
    /**
     * Set image src.
     */
    image: {
      type: String,
    },
    /**
     * Chip label
     */
    label: {
      type: String
    },
    /**
     * Props of JdsBadge. Set to falsy to hide badge.
     * 
     * If defined, chip won't automatically manage badge
     * appearance.
     */
    badge: {
      type: [Boolean, Object],
      default: false
    },

    /**
     * Show check mark icon, reflecting selected state.
     */
    checkMark: {
      type: Boolean,
    },
  },
  data () {
    return {
      mSelected: false,
      mExpanded: false,
    }
  },
  computed: {
    hasImage () {
      return !!this.image
    },
    hasIcon () {
      if (this.$slots.icon) {
        return true
      }
      return this.checkMark || this.multiple
    },
    hasTextOnly () {
      return !this.hasImage && !this.hasIcon
    },
    showBadge () {
      return this.multiple && Array.isArray(this.v) && !!this.v.length
    },
    badgeProps () {
      const def = {
        size: 'md',
        color: 'red',
        position: 'right',
        inline: true,
        align: 'middle',
        show: this.showBadge,
      }
      // eslint-disable-next-line no-unused-vars
      const { inline, align, ...props } = this.badge ?? {}
      return { ...def, ...props}
    },
  },
  watch: {
    selected: {
      immediate: true,
      handler (v) {
        if (this.multiple) {
          return
        }
        if (v === this.value) {
          this.mSelected = true
          return
        }
        if (typeof v === 'boolean') {
          this.mSelected = v
          return
        }
        this.mSelected = !!v
      }
    },
    value: {
      immediate: true,
      handler (v) {
        if (this.multiple) {
          if (!Array.isArray(v)) {
            console.error('value must be an array when multiple equals true')
          } else {
            this.mSelected = v.length > 0
          }
        }
      }
    }
  },
  methods: {
    onKeydownEnter (e) {
      this.toggleChipState()
      this.emitKeydown(e)
    },
    onKeydownDelete (e) {
      if (!this.multiple) {
        this.toggleChipState(false)
      }
      this.emitKeydown(e)
    },
    onClickChip () {
      this.toggleChipState()
      this.emitClick()
    },
    toggleChipState (toggled) {
      if (this.multiple) {
        return this.toggleExpansionState(toggled)
      }
      return this.toggleSelectedState()
    },
    toggleExpansionState (expanded) {
      this.mExpanded = typeof expanded === 'boolean'
        ? expanded
        : !this.mExpanded

      /**
       * Emit on chip `expanded` is changed.
       * Support `.sync` modifier.
       */
      this.$emit('update:expanded', this.mExpanded)

      /**
       * Emit on chip `expanded` is changed.
       */
      this.$emit('expand', this.mExpanded)
    },
    toggleSelectedState (selected) {
      this.mSelected = typeof selected === 'boolean'
        ? selected
        : !this.mSelected
      /**
       * Emit when chip `selected` state is changed
       */
      this.$emit('change', this.mSelected ? this.value : undefined)
    },
    emitKeydown (e) {
      /**
       * Emit on chip is click.
       */
      this.$emit('keydown', e)
    },
    emitClick () {
      /**
       * Emit on chip is click.
       */
      this.$emit('click')
    },
  }
}
</script>

<style lang="scss" scoped>
@use "./Chip.scss";
</style>
