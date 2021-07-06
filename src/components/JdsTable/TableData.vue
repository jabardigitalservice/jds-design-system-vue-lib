<template>
  <td class="jds-table__data">
    <div class="jds-table__data-wrapper">
      <slot name="checkbox"></slot>
      <slot></slot>
    </div> 
  </td>
</template>

<script>
export default {
  name: 'jds-table-data'
}
</script>
