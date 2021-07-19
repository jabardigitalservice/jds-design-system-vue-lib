<template>
  <i class="jds-spinner" v-on="$listeners">
    <svg
      :width="size"
      :height="size"
      v-bind="$attrs"
      viewBox="0 0 56 56"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        class="jds-spinner__background"
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M28 56C43.464 56 56 43.464 56 28C56 12.536 43.464 0 28 0C12.536 0 0 12.536 0 28C0 43.464 12.536 56 28 56ZM28 49C39.598 49 49 39.598 49 28C49 16.402 39.598 7 28 7C16.402 7 7 16.402 7 28C7 39.598 16.402 49 28 49Z"
        :fill="background"
      />
      <path
        class="jds-spinner__foreground"
        d="M56 28C56 12.536 43.464 0 28 0V7C39.598 7 49 16.402 49 28H56Z"
        :fill="foreground"
        :style="{
          animationDuration: `${cycle}ms`
        }"
      />
    </svg>
  </i>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    /**
     * Size in pixels.
     */
    size: {
      type: [String, Number],
      default: '56'
    },
    /**
     * Background color
     */
    background: {
      type: String,
      default: '#E0E0E0'
    },
    /**
     * Foreground color
     */
    foreground: {
      type: String,
      default: '#069550'
    },
    /**
     * Rotation cycle in milliseconds.
     */
    cycle: {
      type: Number,
      default: 1000
    }
  }
}
</script>

<style lang="scss">
@use "./Spinner.scss";
</style>
