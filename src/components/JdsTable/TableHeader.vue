<template>
  <th class="jds-table__header">
    <div class="jds-table__header-wrapper">

      <slot name="checkbox"></slot>

      <div class="jds-table__header-title">
        <slot></slot>
      </div>

      <div class="jds-table__header-action">
        <slot name="action"></slot>
      </div>
    </div> 
  </th>
</template>

<script>
export default {
  name: 'jds-table-header'
}
</script>
