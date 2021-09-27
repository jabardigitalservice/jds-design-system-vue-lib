<template>
  <table :class="{ 
    'jds-data-table font-sans-1': true
  }">
    <thead class="jds-data-table__head">
      <tr ref="tableHeader">
        <th 
          v-if="showSelect"
          class="jds-data-table__select"
        >
          <jds-checkbox-toggle 
            size="sm"
            @click="onSelectAll"
            :indeterminate="isIndeterminate"
            v-model="selectAll"
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
          <td :colspan="columnLength">
            <div 
              class="jds-data-table__loading" 
              :style="loadingHeight"
            >
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
          <td :colspan="columnLength">
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
              @click="onRowSelectChange(item, true)"
              :checked="isSelected(item)"
              @change="emitChanges"
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
      <slot name="footer">
        <tr>
          <td :colspan="columnLength">
            <jds-pagination
              v-bind="pagination"
              @next-page="$emit('next-page', $event)"
              @previous-page="$emit('previous-page', $event)"
              @page-change="$emit('page-change', $event)"
              @per-page-change="$emit('per-page-change', $event)"
            />
          </td>
        </tr>
      </slot>
    </tfoot>
  </table>
</template>

<script>
import JdsIcon from '../JdsIcon'
import JdsSpinner from '../JdsSpinner'
import JdsCheckboxToggle from '../JdsCheckboxToggle'
import JdsPagination from '../JdsPagination'
import localCopy from '../../mixins/local-copy'
import sortMixin from './mixins/sort'
import selectMixin from './mixins/select'

const paginationDefault = {
  currentPage: 1,
  totalRows: 0,
  itemsPerPage: 10
}

export default {
  name: 'jds-data-table',
  components: {
    JdsIcon, 
    JdsSpinner, 
    JdsCheckboxToggle,
    JdsPagination
  },
  data() {
    return {
      mItems: null
    }
  },
  mixins: [
    localCopy('items', 'mItems'), 
    sortMixin,
    selectMixin
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
     * <br><br>
     * NOTE:
     * For the row selection feature to work correctly, 
     * please make sure all items have the 
     * `itemKey` property defined.
     */
    itemKey: {
      type: String,
      default: 'id'
    }, 

   /**
    * Pagination property
    * <br><br>
    * for more information, check
    * `JdsPagination` component documentation
    */
    pagination: {
      type: Object,
      validator: pagination => Object.keys(paginationDefault).every(key => {
        const bool = key in pagination
        if (!bool) {
          console.warn(`JdsDataTable: Expected ${key} property on pagination props`)
        }
        return bool
      }),
      default: () => ({
        ...paginationDefault
      })
    }
  },

  computed: {
    isDataEmpty() {
      if (Array.isArray(this.items) && this.items.length === 0) {
        return true
      }
      return false
    },

    columnLength() {
      let length = this.headers?.length || 0
      this.showSelect ? length++ : null
      return length
    },

    loadingHeight() {
    /**
     * 42px is the minimum height
     * of the table rows
     * 
     * 10 is the default value of
     * items per page
     */
      return { height: `${(this.pagination?.itemsPerPage || 10) * 42}px` }
    }
  }
}
</script>

<style lang="scss">
@use './DataTable.scss';
</style>
