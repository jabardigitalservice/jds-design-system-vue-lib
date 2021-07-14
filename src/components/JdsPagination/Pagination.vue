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
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
          <span>
            item
          </span>
          <i class="jds-pagination__divider" />
          <span>dari total <strong>100</strong></span>
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
            <option value="1">1</option>
            <option value="1">2</option>
            <option value="1">3</option>
          </select>
          <span>dari <strong>10</strong></span>
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
  props: {
    /**
     * Pagination is disabled
     */
    disabled: {
      type: Boolean,
    }
  },
  methods: {
    clicked() {
      console.log('clicked')
    }
  }
}
</script>

<style lang="scss" scoped>
@use "./Pagination.scss";
</style>
