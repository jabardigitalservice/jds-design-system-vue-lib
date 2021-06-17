/**
 * Use to reactively copy `[prop]` value into local component `[state]`,
 * so value can be updated without having to rely on `v-model` directive
 * or `.sync` modifier.
 * @param {string} prop   - prop name
 * @param {string} state  - local copy of prop in data() 
 * @returns 
 */
export default function (prop, state) {
  return {
    created () {
      this.$watch(
        function target () {
          return this[prop]
        },
        function handler (v) {
          if (typeof v === 'undefined') {
            this[state] = undefined
          } else if (v && typeof v === 'object') {
            this[state] = JSON.parse(JSON.stringify(v))
          } else {
            this[state] = v
          }
        },
        { immediate: true, deep: true }
      )
    }
  }
}