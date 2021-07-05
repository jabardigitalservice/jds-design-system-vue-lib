<template>
  <table class="jds-table font-sans-1">
    <thead>
      <tr class="jds-table__row">
        <th class="jds-table__header">
          <div class="jds-table__header-wrapper">
          
          <!-- TODO: 
          1. create checkbox component (or using existing one?)
          2. import an arrow icon
          3. create sorting animation -->

            <input type="checkbox">
            <div class="jds-table__title">Header 1</div>
            <div>&#8593;</div>
          </div> 
        </th>
        <th class="jds-table__header">
          <div class="jds-table__title">Header 2</div>
        </th>
        <th class="jds-table__header">
          <div class="jds-table__title">Header 3</div>
        </th>
        <th class="jds-table__header">
          <div class="jds-table__title">Header 4</div>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr class="jds-table__row">
        <td class="jds-table__data">
          <div class="jds-table__data-wrapper">
            <input type="checkbox">
            <div>Body 1</div>
          </div>
        </td>
        <td class="jds-table__data">Body 1</td>
        <td class="jds-table__data">Body 1</td>
        <td class="jds-table__data">Body 1</td>
      </tr>
      <tr class="jds-table__row">
        <td class="jds-table__data">
          <div class="jds-table__data-wrapper">
            <input type="checkbox">
            <div>Body 2</div>
          </div>
        </td>
        <td class="jds-table__data">Body 2</td>
        <td class="jds-table__data">Body 2</td>
        <td class="jds-table__data">Body 2</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'jds-table',
}
</script>

<style lang="scss">
@use "./Table.scss";
</style>
