<template>
  <table :class="[{ 'jds-data-table font-sans-1': true }]">
    <thead class="jds-data-table__head">
      <tr>
        <th v-for="(header, index) in headers" :key="index">
          <div class="jds-data-table__column-wrapper">
            <span>
              {{ header.text }}
            </span>
            <button 
              v-if="isSortable(header)" 
              :id="header.key" 
              @click="onSort(header.key)"
            >
              <jds-icon
                :class="[{
                  'jds-data-table__sort-icon': true,
                  'jds-data-table__sort-icon--transparent': sortObject[header.key] === 'no-sort'
                }]"
                name="arrow-up"
                size="14px"
                fill="#fff"
                :rotate="sortObject[header.key] === 'desc' ? 180 : 0"
              />
            </button>
          </div>
        </th>
      </tr>
    </thead>
    <tbody class="jds-data-table__body">
      <tr v-for="(item, rowIndex) in mItems" :key="rowIndex">
        <td v-for="(header, colIndex) in headers" :key="colIndex">
          <slot :name="`item.${header.key}`" :item="item">
            {{ item[header.key] }}
          </slot>
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
import { sort } from './mixins'

export default {
  name: 'jds-data-table',
  data() {
    return {
      mItems: null,
    }
  },
  mixins: [
    localCopy('items', 'mItems'), 
    sort
    ],
  props: {
    /**
     * Define header text and key using this structure:
     * { key: 'someKey', text: 'someLabel', sortable: true | false (Optional) }
     */
    headers: {
      type: Array,
      default: () => [],
    },

    /**
     * Define table data.
     */
    items: {
      type: Array,
      default: () => [],
    },

    /**
     * Allow DataTable to sort items locally
     */
    localSort: {
      type: Boolean,
      default: false
    },
  }
}
</script>

<style lang="scss" scoped>
@use './DataTable.scss';
</style>
