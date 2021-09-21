import orderBy from 'lodash.orderby'

const sort = {

  data() {
    return {
      sortObject: {}
    }
  },

  mounted() {
    /**
     * Populate sorting object when the component mounted.
     * return an Object.
     */
    if (Array.isArray(this.headers) && this.headers.length) {
      return this.headers.map((header) => {
        this.sortObject = {
          ...this.sortObject,
          [header.key]: 'no-sort'
        }
      })
    }

    return this.sortObject = {}
  },

  methods: {
    /**
     * Check if the header is sortable.
     * return a Boolean.
     */
    isSortable(header) {
      return header.sortable ?? false
    },

    /**
     * Mutate `sortObject` object when sort button is clicked.
     * Emit an event with an object {`someKey`: "asc" | "desc" | "no-sort"}
     */
    onSort(key) {

      let sortBy = null

      switch (this.sortObject[key]) {
        case 'asc':
          sortBy = 'desc'
          break

        case 'desc':
          sortBy = 'no-sort'
          break

        default:
          sortBy = 'asc'
          break
      }

      let newObj = {}

      for (const obj in this.sortObject) {
        newObj[obj] = 'no-sort'
        newObj[key] = sortBy
      }

      this.sortObject = { ...newObj }

      if (this.localSort) {
        this.onLocalSort(key)
      }

      this.$emit('change:sort', { [key]: this.sortObject[key] })
    },

    onLocalSort(key) {
      switch (this.sortObject[key]) {
        case 'asc':
          this.sortByAscendingOrder(key)
          break

        case 'desc':
          this.sortByDescendingOrder(key)
          break

        default:
          this.resetSort()
          break
      }
    },

    sortByAscendingOrder(key) {
      this.mItems = orderBy(this.mItems, key, 'asc')
    },

    sortByDescendingOrder(key) {
      this.mItems = orderBy(this.mItems, key, 'desc')
    },

    /**
     * reset local data to original state.
     */
    resetSort() {
      this.mItems = JSON.parse(JSON.stringify(this.items))
    }
  }
}

export default sort
