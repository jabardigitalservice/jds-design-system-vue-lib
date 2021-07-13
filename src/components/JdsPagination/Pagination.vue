<template>
  <div class="jds-pagination font-sans-1">
    <div class="jds-pagination__wrapper">
      <!-- left section -->
      <div class="jds-pagination__page-control--left">
        <div class="jds-pagination__page-control__select">
          <span>
            Tampilkan
          </span>
          <select name="" id="">
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
          <span>
            item
          </span>
          <span>dari total <strong>100</strong></span>
        </div>
      </div>

      <!-- rigth section -->
      <div class="jds-pagination__page-control--right">
        <button class="jds-pagination__navigation-button">
          <
        </button>
        <div class="jds-pagination__page-control__select">
          Halaman
          <select name="" id="">
            <option value="1">1</option>
            <option value="1">2</option>
            <option value="1">3</option>
          </select>
          dari 10
        </div>
        <button class="jds-pagination__navigation-button">
          >
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
@use "./Pagination.scss";
</style>
