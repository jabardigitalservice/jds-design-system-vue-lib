<template>
  <table :class="[{ 'jds-data-table font-sans-1': true }]">
    <thead class="jds-data-table__head">
      <tr>
        <th v-for="(header, index) in headers" :key="index">
          <div class="jds-data-table__column-wrapper">
            <!-- <button v-if="isSelectable(header)">
              <jds-checkbox></jds-checkbox>
            </button> -->
            <span>
              {{ header }}
            </span>
            <button v-if="isSortable(header)" :id="header" @click="onSort(header)">
              <jds-icon
                name="arrow-up"
                size="14px"
                fill="#fff"
                :rotate="isSorted(header) ? 180 : 0"
              />
            </button>
          </div>
        </th>
      </tr>
    </thead>
    <tbody class="jds-data-table__body">
      <tr v-for="(item, i) in mItems" :key="i">
        <td v-for="(col, j) in item" :key="j">
          {{ col }}
        </td>
      </tr>
    </tbody>
    <tfoot class="jds-data-table__footer">
      <!-- 
          @slot footer
          use this slot for any footer content you want.
        -->
      <slot name="footer"></slot>
    </tfoot>
  </table>
</template>

<script>
import localCopy from '../../mixins/local-copy'

export default {
  name: 'jds-data-table',
  data() {
    return {
      mItems: null,
      sortObject: [],
    }
  },
  mixins: [localCopy('items', 'mItems')],
  props: {
    /**
     *
     */
    headers: {
      type: Array,
      default: () => [],
    },
    /**
     *
     */
    items: {
      type: Array,
      default: () => [],
    },
    /**
     *
     */
    sort: {
      type: Array,
      default: () => [],
    },
    /**
     *
     */
    select: {
      type: Array,
      default: () => [],
    },
  },
  computed: {},
  methods: {
    isSorted(v) {
      return this.sortObject.find((obj) => (obj.id === v ? obj.toggle : false))
    },
    isSortable(v) {
      if (Array.isArray(this.sort)) {
        return this.sort.includes(v)
      }
      return false
    },
    isSelectable(v) {
      if (Array.isArray(this.select)) {
        return this.select.includes(v)
      }
      return false
    },
    onSort(id) {
      const newObject = this.sortObject.map((obj) =>
        obj.id === id
          ? {
              ...obj,
              toggle: !obj.toggle,
              sortBy: obj.toggle ? 'asc' : 'desc',
            }
          : {
            ...obj,
            toggle: false,
            sortBy: 'asc'
          }
      )

      this.sortObject = newObject

      const object = this.sortObject.find((obj) => obj.id === id)

      if (object.toggle) {
        this.sortByDescendingOrder(id)
      } else {
        this.sortByAscendingOrder(id)
      }
    },
    sortByAscendingOrder(property) {
      this.mItems = this.items.sort((a, b) => (a[property] > b[property]) - (a[property] < b[property]))
    },
    sortByDescendingOrder(property) {
      this.mItems = this.items.sort((a, b) => (b[property] > a[property]) - (b[property] < a[property]))
    },
  },
  mounted() {
    this.sortObject = this.headers.map((header) => {
      return { id: header, toggle: false, sortBy: 'asc' }
    })
  },
}
</script>

<style lang="scss" scoped>
@use './DataTable.scss';
</style>
