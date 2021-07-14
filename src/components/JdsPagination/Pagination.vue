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
          <select name="" id="" :disabled="disabled">
            <option :value="option" v-for="option in pageOptions" :key="option" >
              {{ option }}
            </option>
          </select>
          <span>
            item
          </span>
          <i class="jds-pagination__divider" />
          <span>dari total <strong>{{ itemsPerPage }}</strong></span>
          <i class="jds-pagination__divider" />
        </div>
      </div>

      <!-- rigth section -->
      <div class="jds-pagination__page-control--right">
        <button class="jds-pagination__navigation-button" :disabled="disabled" @click="clicked()">
          <jds-icon name="chevron-left" size="sm"/>
        </button>
        <i class="jds-pagination__divider" />
        <div class="jds-pagination__page-control__select">
          <span>Halaman</span>
          <select name="" id="" :disabled="disabled">
            <option 
            :value="page" 
            v-for="page in generatePageArray" 
            :key="page"
            >
              {{ page }}
            </option>
          </select>
          <span>dari <strong>{{ length }}</strong></span>
        </div>
        <i class="jds-pagination__divider"/>
        <button class="jds-pagination__navigation-button" :disabled="disabled" @click="clicked()">
          <jds-icon name="chevron-right" size="sm"/>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import JdsIcon from '../JdsIcon'
export default {
  name: "jds-pagination",
  components: {
    JdsIcon
  },
  data() {
    return {
      currentPage: null,
      pageOptions: [5, 10, 20, 25, 50, 100]
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
     * Total page available
     */
    length: {
      type: Number,
      default: 1
    },

    /**
     * How many row will shown inside the Table
     */
    itemsPerPage: {
      type: Number,
      default: 5
    }
  },
  methods: {
    clicked() {
      console.log('clicked')
    }
  },
  computed: {
    generatePageArray() {
      const array = []
      for (let index = 0; index < this.length; index++) {
        array.push(index + 1)
      }
      return array
    }
  }
}
</script>

<style lang="scss" scoped>
@use "./Pagination.scss";
</style>
