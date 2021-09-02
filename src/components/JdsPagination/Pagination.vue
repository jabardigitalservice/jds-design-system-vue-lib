<template>
  <div
    :class="{
      'jds-pagination font-sans-1': true,
      'jds-pagination--disabled': disabled,
    }"
  >
    <div class="jds-pagination__wrapper">
      <div class="jds-pagination__page-control--left">
        <div class="jds-pagination__page-control__select">
          <span>
            Tampilkan
          </span>
          <JdsSelect
            class="jds-pagination__page-control__select__input"
            tile
            max-height="200px"
            :disabled="disabled"
            :options="itemsPerPageOptions"
            :value="mItemsPerPage"
            @change="onItemsPerPageChange"
          />
          <span>
            Item
          </span>
          <i class="jds-pagination__divider" />
          <span>dari total <strong>{{ totalRows }}</strong></span>
          <i class="jds-pagination__divider" />
        </div>
      </div>

      <div class="jds-pagination__page-control--right">
        <button
          class="jds-pagination__navigation-button"
          :disabled="disabled || !hasPreviousPage"
          @click="onPreviousPage"
        >
          <jds-icon 
            name="chevron-left" 
            class="jds-pagination__navigation-button__icon"
            size="16px" 
          />
        </button>
        <i class="jds-pagination__divider" />
        <div class="jds-pagination__page-control__select">
          <span>Halaman</span>
          <JdsSelect
            class="jds-pagination__page-control__select__input"
            tile
            filterable
            reset-filter-on-open
            max-height="200px"
            options-header="Halaman"
            :disabled="disabled"
            :options="generatedPageNumbers"
            :value="mCurrentPage"
            @change="onPageChange"
          />
          <span>dari <strong>{{ pages }}</strong></span>
        </div>
        <i class="jds-pagination__divider" />
        <button
          class="jds-pagination__navigation-button"
          :disabled="disabled || !hasNextPage"
          @click="onNextPage"
        >
          <jds-icon 
            name="chevron-right" 
            class="jds-pagination__navigation-button__icon"
            size="16px"
          />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import JdsIcon from '../JdsIcon'
import JdsSelect from '../JdsSelect'
import localCopy from '../../mixins/local-copy'

export default {
  model: {
    prop: 'currentPage',
    event: 'page-change',
  },
  name: 'jds-pagination',
  components: {
    JdsIcon,
    JdsSelect,
  },
  mixins: [
    localCopy('currentPage', 'mCurrentPage'),
    localCopy('itemsPerPage', 'mItemsPerPage')
  ],
  data() {
    return {
      mCurrentPage: null,
      mItemsPerPage: null,
    }
  },
  props: {
    /**
     * Bound model.
     * @name currentPage
     * @model
     */
    currentPage: {
      type: [Number, String],
      default: 1
    },

     /**
     * How many rows are shown per page.
     */
    itemsPerPage: {
      type: [Number, String],
      default: 5,
    },

    /**
     * Toggle pagination disabled state.
     */
    disabled: {
      type: Boolean,
      default: false
    },

    /**
     *  Total of data rows.
     */
    totalRows: {
      type: [Number, String],
      default: 0
    },

    /**
     *  Options to show how many rows or data per page.
     */
    itemsPerPageOptions: {
      type: Array,
      default: () => [5, 10, 20, 50, 100]
    },
  },
  methods: {
    onPreviousPage() {
      this.mCurrentPage = Math.max(1, this.mCurrentPage - 1)
      /**
       * Emitted on previous button is clicked.
       */
      this.$emit('previous-page', this.mCurrentPage)
    },
    onNextPage() {
      this.mCurrentPage = Math.min(this.pages, this.mCurrentPage + 1)
      /**
       * Emitted on next button is clicked.
       */
      this.$emit('next-page', this.mCurrentPage)
    },
    onPageChange(page) {
      this.mCurrentPage = +page
      /**
       * Emitted on page is changed.
       * @param {number} currentPage
       */
      this.$emit('page-change', this.mCurrentPage)
    },
    onItemsPerPageChange(itemsPerPage) {
      this.mItemsPerPage = +itemsPerPage
      /**
       * Emitted on item per page is changed.
       * @param {number} itemsPerPage
       */
      this.$emit('per-page-change', this.mItemsPerPage)

      /**
       * The expected behavior when user change items per page 
       * is to reset the current page value back to 1.
       */
      this.mCurrentPage = 1
      this.$emit('page-change', this.mCurrentPage)
    }
  },
  computed: {
    generatedPageNumbers() {
      const pageNumbers = []
      for (let index = 0; index < this.pages; index++) {
        pageNumbers.push(index + 1)
      }
      return pageNumbers
    },
    pages() {
      if (!!this.totalRows && !!this.mItemsPerPage) {
        return Math.ceil(parseInt(this.totalRows)/parseInt(this.mItemsPerPage)) 
      }
      return 1
    },
    hasPreviousPage () {
      return this.mCurrentPage > 1
    },
    hasNextPage () {
      return this.mCurrentPage < this.pages
    },
  }
}
</script>

<style lang="scss">
@use "./Pagination.scss";
</style>
