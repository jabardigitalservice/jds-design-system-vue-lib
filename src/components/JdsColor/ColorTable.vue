<template>
  <div class="jds-color-table font-sans-1">
    <table>
      <tbody>
        <tr v-for="(colorName, index) in colorNames" :key="index">
          <th scope="row">
            <div
              :class="{
                'jds-color-table__color-group': true,
                'text-white': !isWhite(colorName), 
                'border-black': isWhite(colorName),
                [bgClassName(colorName)]: true,
              }"
            >
              {{ colorName }}
            </div>
          </th>
          <div v-if="isBlackOrWhite(colorName)">
            <td>
              <figure
                tabindex="1"
                class="jds-color-table__color-figure"
              >
                <i
                  :class="{
                    [bgClassName(colorName)]: true,
                  }"
                  @click="copyRGBValue"
                />
                <figcaption class="text-gray-700">
                {{ colorName }}
                </figcaption>
              </figure>
            </td>
          </div>
          <div v-else>
            <td v-for="number in colorVariantNumbers" :key="number">
              <figure
                tabIndex="1"
                class="jds-color-table__color-figure"
              >
                <i
                  :class="{ 
                    [`bg-${colorName}-${number}`]: true,
                  }"
                  @click="copyRGBValue"
                />
                <figcaption class="text-gray-700">
                {{ number }}
                </figcaption>
              </figure>
            </td>
          </div>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      colorNames : [
        'black',
        'white',
        'blue-gray',
        'gray',
        'blue',
        'yellow',
        'green',
        'red',
        'pink',
        'purple',
      ]
    }
  },
  computed: {
    colorVariantNumbers () {
      return new Array(10).fill(null)
        .map((_, index) => {
          return index === 0 ? 50 : (index * 100);
        })
    }
  },
  methods: {
    copyRGBValue(e) {
      const target = e.target;
      const rgbValue = window.getComputedStyle(target).backgroundColor;
      window.navigator.clipboard.writeText(rgbValue);

      setTimeout(() => {
        alert(`Copied ${rgbValue} into clipboard`);
      }, 300)
    },
    isBlackOrWhite(colorName) {
      return ['black', 'white'].includes(colorName);
    },
    isWhite(colorName) {
      return colorName === 'white'
    },
    bgClassName (colorName) {
      return this.isBlackOrWhite(colorName) ? `bg-${colorName}` : `bg-${colorName}-500`;
    }
  }
}
</script>

<style lang="scss" scoped>
@use "./ColorTable.scss";
</style>
