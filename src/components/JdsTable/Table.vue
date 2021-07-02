<template>
  <table class="jds-table font-sans-1">
    <thead class="jds-table__head">
      <tr class="jds-table__row">
        <th class="jds-table__header">
          <div>
            <input type="checkbox">
            <div>Test 1</div>
            <div>&#8593;</div> 
          </div> 
        </th>
        <th class="jds-table__header">Test 2</th>
        <th class="jds-table__header">Test 3</th>
        <th class="jds-table__header">Test 4</th>
      </tr>
    </thead>
    <tbody class="jds-table__body">
      <tr class="jds-table__row">
        <td class="jds-table__data">Body 1</td>
        <td class="jds-table__data">Body 2</td>
        <td class="jds-table__data">Body 3</td>
        <td class="jds-table__data">Body 4</td>
      </tr>
      <tr class="jds-table__row">
        <td class="jds-table__data">Body 1</td>
        <td class="jds-table__data">Body 2</td>
        <td class="jds-table__data">Body 3</td>
        <td class="jds-table__data">Body 4</td>
      </tr>
      <tr class="jds-table__row">
        <td class="jds-table__data">Body 1</td>
        <td class="jds-table__data">Body 2</td>
        <td class="jds-table__data">Body 3</td>
        <td class="jds-table__data">Body 4</td>
      </tr>
      <tr class="jds-table__row">
        <td class="jds-table__data">Body 1</td>
        <td class="jds-table__data">Body 2</td>
        <td class="jds-table__data">Body 3</td>
        <td class="jds-table__data">Body 4</td>
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
