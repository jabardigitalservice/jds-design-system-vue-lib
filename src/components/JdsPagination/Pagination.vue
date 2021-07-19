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
          <select :value="mItemsPerPage" @change="onItemsPerPageChange" :disabled="disabled">
            <option :value="item" v-for="item in itemsPerPageOptions" :key="item">
              {{ item }}
            </option>
          </select>
          <span>
            item
          </span>
          <i class="jds-pagination__divider" />
          <span>dari total <strong>{{ totalRows }}</strong></span>
          <i class="jds-pagination__divider" />
        </div>
      </div>

      <div class="jds-pagination__page-control--right">
        <button
          class="jds-pagination__navigation-button"
          :disabled="disabled"
          @click="onPreviousPage"
        >
          <jds-icon 
            name="chevron-left" 
            class="text-green-800"
            size="16px" 
          />
        </button>
        <i class="jds-pagination__divider" />
        <div class="jds-pagination__page-control__select">
          <span>Halaman</span>
          <select :value="mCurrentPage" @change="onPageChange" :disabled="disabled">
            <option :value="page" v-for="page in generatedPageNumbers" :key="page">
              {{ page }}
            </option>
          </select>
          <span>dari <strong>{{ pages }}</strong></span>
        </div>
        <i class="jds-pagination__divider" />
        <button class="jds-pagination__navigation-button" :disabled="disabled" @click="onNextPage">
          <jds-icon 
            name="chevron-right" 
            class="text-green-800"
            size="16px"
          />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import JdsIcon from '../JdsIcon'
import localCopy from '../../mixins/local-copy'

export default {
  model: {
    prop: 'currentPage',
    event: 'page-change',
  },
  name: "jds-pagination",
  components: {
    JdsIcon
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
      /**
       * Emitted on previous button is clicked.
       */
      this.$emit('previous-page')
    },
    onNextPage() {
      /**
       * Emitted on next button is clicked.
       */
      this.$emit('next-page')
    },
    onPageChange(e) {
      this.mCurrentPage = +e.target.value
      /**
       * Emitted on page is changed.
       * @param {number} currentPage
       */
      this.$emit('page-change', this.mCurrentPage)
    },
    onItemsPerPageChange(e) {
      this.mItemsPerPage = +e.target.value
      /**
       * Emitted on item per page is changed.
       * @param {number} itemsPerPage
       */
      this.$emit('per-page-change', this.mItemsPerPage)
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
    }
  }
}
</script>

<style lang="scss" scoped>
@use "./Pagination.scss";
</style>

