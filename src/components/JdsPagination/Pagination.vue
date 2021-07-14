<template>
  <div :class="{
      'jds-pagination font-sans-1': true,
      'jds-pagination--disabled': disabled,
    }"
  >
    <div class="jds-pagination__wrapper">
      <!-- left section -->
      <div class="jds-pagination__page-control--left">
        <div class="jds-pagination__page-control__select">
          <span>
            Tampilkan
          </span>
          <select
            :value="mItemsPerPage" 
            @change="onItemsPerPageChange"
            :disabled="disabled"
          >
            <option :value="item" v-for="item in itemsPerPageOptions" :key="item" >
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

      <!-- rigth section -->
      <div class="jds-pagination__page-control--right">
        <button class="jds-pagination__navigation-button" :disabled="disabled" @click="onPreviousPage">
          <jds-icon name="chevron-left" size="sm"/>
        </button>
        <i class="jds-pagination__divider" />
        <div class="jds-pagination__page-control__select">
          <span>Halaman</span>
          <select 
            :value="mCurrentPage"
            @change="onPageChange"
            :disabled="disabled"
          >
            <option 
            :value="page" 
            v-for="page in generatedPageNumbers" 
            :key="page"
            >
              {{ page }}
            </option>
          </select>
          <span>dari <strong>{{ pages }}</strong></span>
        </div>
        <i class="jds-pagination__divider"/>
        <button class="jds-pagination__navigation-button" :disabled="disabled" @click="onNextPage">
          <jds-icon name="chevron-right" size="sm"/>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import JdsIcon from '../JdsIcon'
import localCopy from '../../mixins/local-copy'

export default {
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
      // pageOptions: [5, 10, 20, 25, 50, 100]
    }
  },
  props: {
    /**
     * Pagination is disabled
     */
    disabled: {
      type: Boolean,
    },

    /**
     *  Current page
     */
    currentPage: {
      type: Number,
      default: 1
    },

    /**
     * Total page available
     */
    length: {
      type: Number,
      default: 1
    },

    /**
     * 
     */
    totalRows: {
      type: Number,
    },

    /**
     * How many row will shown inside the Table
     */
    itemsPerPage: {
      type: Number,
      default: 5
    },

    /**
     * 
     */
    itemsPerPageOptions: {
      type: Array,
      default: () => [5, 10, 20, 50, 100]
    },

    

   
  },
  methods: {
    onPreviousPage() {
      this.$emit('previous-page')
    },
    onNextPage() {
      this.$emit('next-page')
    },
    onPageChange(e) {
      this.mCurrentPage = e.target.value
      this.$emit('page-change', this.mCurrentPage)
    },
    onItemsPerPageChange(e) {
      this.mItemsPerPage = e.target.value
      this.$emit('per-page-change', this.mItemsPerPage)
    }
  },
  computed: {
    generatedPageNumbers() {
      const array = []
      for (let index = 0; index < this.length; index++) {
        array.push(index + 1)
      }
      return array
    },
    pages() {
      return Math.ceil(parseInt(this.totalRows)/parseInt(this.mItemsPerPage))
    }
  }
}
</script>

<style lang="scss" scoped>
@use "./Pagination.scss";
</style>
