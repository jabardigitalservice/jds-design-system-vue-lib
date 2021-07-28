<template>
  <table :class="[{ 'jds-data-table font-sans-1': true }]">
    <thead class="jds-data-table__head">
      <tr>
        <th v-for="(header, index) in tableHeaders" :key="index">
          <div class="jds-data-table__column-wrapper">
            <!-- <button v-if="isSelectable(header)">
              <jds-checkbox></jds-checkbox>
            </button> -->
            <span>
              {{ header.text }}
            </span>
            <button v-if="isSortable(header)" :id="header.key" @click="onSort(header.key)">
              <jds-icon
                name="arrow-up"
                size="14px"
                fill="#fff"
                :rotate="isSorted(header.key) ? 180 : 0"
              />
            </button>
          </div>
        </th>
        <th v-if="withAction">
          <div class="jds-data-table__column-wrapper">
            <span>{{actionHeader}}</span>
          </div>
        </th>
      </tr>
    </thead>
    <tbody class="jds-data-table__body">
      <tr v-for="(item, i) in mItems" :key="i">
        <td v-for="(col, j) in item" :key="j">
          {{ col }}
        </td>
        <td v-if="withAction" class="jds-data-table__body__actions">
          <jds-button :label="actionLabel" @click="onClick(i)"/>
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
import {sort, action} from './mixins'

export default {
  name: 'jds-data-table',
  data() {
    return {
      mItems: null,
      sortObject: [],
    }
  },
  mixins: [
    localCopy('items', 'mItems'), 
    sort,
    action
    ],
  props: {
    /**
     * Define header label and key using this structure:
     * { key: 'someKey', label: 'someLabel', sortable: true | false (Optional) }
     */
    tableHeaders: {
      type: Array,
      default: () => [],
    },

    /**
     * Define table data.
     */
    items: {
      type: Array,
      default: () => [],
    }
  }
}
</script>

<style lang="scss" scoped>
@use './DataTable.scss';
</style>
