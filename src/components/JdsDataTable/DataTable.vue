<template>
  <table :class="[{ 'jds-data-table font-sans-1': true }]">
    <thead class="jds-data-table__head">
      <tr>
        <th 
          v-if="showSelect"
          class="jds-data-table__select"
        >
          <jds-checkbox-toggle 
            size="sm"
          />
        </th>
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
      <template v-if="loading">
        <tr>
          <td :colspan="headers.length">
            <div class="jds-data-table__loading">
              <jds-spinner
                size="56"
                background="#E0E0E0"
                foreground="#069550"
              />
            </div>
          </td>
        </tr>
      </template>
      <template v-else-if="isDataEmpty">
        <tr valign="top">
          <td :colspan="headers.length">
            <!-- 
              @slot use this slot for any content you want
              to show when data is not available.
             -->
            <slot name="empty">
              <div class="jds-data-table__empty">
                {{ emptyText || 'No data available' }}
              </div>
            </slot>
          </td>
        </tr>
      </template>
      <template v-else>
        <tr v-for="(item, rowIndex) in mItems" :key="rowIndex">
          <td 
            v-if="showSelect"
            class="jds-data-table__select"
          >
            <jds-checkbox-toggle 
              size="sm"
            />
          </td>
          <td v-for="(header, colIndex) in headers" :key="colIndex">
            <!-- 
              @slot dynamic scoped slots 
            -->
            <slot :name="`item.${header.key}`" :item="item">
              {{ item[header.key] }}
            </slot>
          </td>
        </tr>
      </template>
    </tbody>
    <tfoot class="jds-data-table__footer">
      <!-- 
        @slot use this slot for any footer content you want.
      -->
      <slot name="footer"></slot>
    </tfoot>
  </table>
</template>

<script>
import JdsIcon from '../JdsIcon'
import JdsSpinner from '../JdsSpinner'
import JdsCheckboxToggle from '../JdsCheckboxToggle'
import localCopy from '../../mixins/local-copy'
import { sort, select } from './mixins'

export default {
  name: 'jds-data-table',
  components: {
    JdsIcon, 
    JdsSpinner, 
    JdsCheckboxToggle
  },
  data() {
    return {
      mItems: null,
    }
  },
  mixins: [
    localCopy('items', 'mItems'), 
    sort,
    select
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
     * Show loading spinner when value is `true`
     */
    loading: {
      type: Boolean,
      default: false
    },

    /**
     * Text shown when data is empty
     */
    emptyText: {
      type: String,
      default: ''
    },

    /**
     * Allow DataTable to sort items locally
     */
    localSort: {
      type: Boolean,
      default: false
    },

    /**
     * Allow DataTable to do row selection
     */
    showSelect: {
      type: Boolean,
      default: false
    },

    /**
     * Define what key or property used
     * when item is being selected.
     */
    itemKey: {
      type: String,
      default: 'id'
    }
  },
  computed: {
    isDataEmpty() {
      if (Array.isArray(this.items) && this.items.length === 0) {
        return true
      }
      return false
    }
  }
}
</script>

<style lang="scss" scoped>
@use './DataTable.scss';
</style>
