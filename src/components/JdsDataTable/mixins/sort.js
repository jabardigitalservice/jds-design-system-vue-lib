const sort = {
  /**
   * Populate sorting object when the component mounted.
   * return an Array of Objects.
   */
  mounted() {
    if (Array.isArray(this.tableHeaders) && this.tableHeaders.length) {
      return this.sortObject = this.tableHeaders.map((header) => {
        return { id: header.key, toggle: false, sortBy: 'asc' }
      })
    }
    return this.sortObject = []
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
     * Check if the header with specific id currently being sorted.
     * return a Boolean.
     */
    isSorted(id) {
      return !!this.sortObject.find((obj) => (obj.id === id ? obj.toggle : false))
    },

    /**
     * Mutate `sortObject` object when sort button is clicked.
     * Emit an event with an object {`someKey`: "asc" | "desc"}
     */
    onSort(id) {
      const newObject = this.sortObject.map((obj) =>
        obj.id === id
          ? {
            ...obj,
            toggle: !obj.toggle,
            sortBy: obj.toggle ? 'asc' : 'desc',
          }
          : {
            ...obj,
            toggle: false,
            sortBy: 'asc'
          }
      )

      this.sortObject = newObject

      const object = this.sortObject.find((obj) => obj.id === id)
      object.sortBy === 'asc' ? this.sortByAscendingOrder(id) : this.sortByDescendingOrder(id)

      this.$emit('change:sort', {[object.id]: object.sortBy})
    },

    /**
     * sort local data with ascending order.
     */
    sortByAscendingOrder(property) {
      this.mItems = this.items.sort((a, b) => (a[property] > b[property]) - (a[property] < b[property]))
    },

    /**
     * sort local data with descending order.
     */
    sortByDescendingOrder(property) {
      this.mItems = this.items.sort((a, b) => (b[property] > a[property]) - (b[property] < a[property]))
    },

  }
}

export default sort