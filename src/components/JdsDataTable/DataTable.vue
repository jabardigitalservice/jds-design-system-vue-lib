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
              {{ header.title }}
            </span>
            <button v-if="isSortable(header.key)" :id="header.key" @click="onSort(header.key)">
              <jds-icon
                name="arrow-up"
                size="14px"
                fill="#fff"
                :rotate="isSorted(header.key) ? 180 : 0"
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
import sort from './mixins/sort'

export default {
  name: 'jds-data-table',
  data() {
    return {
      mItems: null,
      sortObject: [],
    }
  },
  mixins: [localCopy('items', 'mItems'), sort],
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
}
</script>

<style lang="scss" scoped>
@use './DataTable.scss';
</style>
