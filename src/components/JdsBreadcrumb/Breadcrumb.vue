<template>
  <div ref="breadcrumb" class="jds-breadcrumb">
    <div class="jds-breadcrumb__item" v-for="(item, index) in items" :key="index">
      <div class="jds-breadcrumb__path">
        {{ item.name }}
      </div>
      <jds-icon 
        v-if="index < items.length - 1"
        name="chevron-right" 
        size="14px" 
        class="jds-breadcrumb__separator text-gray-300"
      />
    </div>
    <!-- <jds-popover :options="popperOptions">
      <template #activator="{ on }">
        <div v-on="on" class="jds-breadcrumb__dot">
          ...
        </div>
      </template>
      <template>
        <jds-options v-bind="{options}" />
      </template>
    </jds-popover> -->
  </div>
</template>

<script>
import JdsIcon from '../JdsIcon'
import popperOptions from './options'
export default {
  props: {
    items : {
      type: Array,
      default: () => []
    },
  },
  components: {
    JdsIcon
  },
  data() {
    return {
      popperOptions,
      breadcrumbWidth: null,
    }
  },
  // watch: {
  //   items: {
  //     handler() {
  //       this.breadcrumbWidth = this.$refs.breadcrumb.offsetWidth
  //     },
  //     deep: true,
  //   }
  // },
  mounted(){
    const box = this.$refs.breadcrumb
    console.log(box.getBoundingClientRect());
  }

}
</script>

<style lang="scss">
@use './Breadcrumb.scss'
</style>