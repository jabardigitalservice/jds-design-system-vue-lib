<template>
  <table class="jds-table font-sans-1">
    <thead>
      <tr class="jds-table__row">
        <th class="jds-table__header">
          <div class="jds-table__header-wrapper">
            <input type="checkbox">
            <div class="jds-table__header-title">Header 1</div>
            <div class="jds-table__header-action">&#8593;</div>
          </div> 
        </th>
        <th class="jds-table__header">
          <div class="jds-table__header-wrapper">
            <input type="checkbox">
            <div class="jds-table__header-title">Header 2</div>
          </div>
        </th>
        <th class="jds-table__header">
          <div class="jds-table__header-wrapper">
            <div class="jds-table__header-title">Header 3</div>
            <div class="jds-table__header-action" :class="{toggle: toggle}" @click="toggleButton">&#8593;</div>
          </div>
        </th>
        <th class="jds-table__header">
          <div class="jds-table__header-wrapper">
            <div class="jds-table__header-title">Header 4</div>
          </div>
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
        <td class="jds-table__data">
          <div class="jds-table__data-wrapper">
            <input type="checkbox" />
            <span>Body 1</span>
          </div>  
        </td>
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
        <td class="jds-table__data">
          <div class="jds-table__data-wrapper">
            <input type="checkbox" />
            <span>Body 2</span>
          </div>
        </td>
        <td class="jds-table__data">Body 2</td>
        <td class="jds-table__data">
          <div class="jds-table__data-wrapper">
            Body 2
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'jds-table',
  data () {
    return {
      toggle: false
    }
  },
  methods: {
    toggleButton () {
      this.toggle = !this.toggle
    }
  }
}
</script>

<style lang="scss">
@use "./Table.scss";
</style>
