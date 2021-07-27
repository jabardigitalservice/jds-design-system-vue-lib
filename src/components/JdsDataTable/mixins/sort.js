const sort = {
  /**
   * Populate sorting object when the component mounted.
   */
  mounted() {
    if (Array.isArray(this.headers) && this.headers.length) {
      return this.sortObject = this.headers.map((header) => {
        return { id: header.key, toggle: false, sortBy: 'asc' }
      })
    }
    return this.sortObject = []
  },

  methods: {
    /**
     * Check if the header is sortable
     */
    isSortable(id) {
      if (Array.isArray(this.sort)) {
        return this.sort.includes(id)
      }
      return false
    },

    /**
     * 
     */
    isSorted(id) {
      return !!this.sortObject.find((obj) => (obj.id === id ? obj.toggle : false))
    },

    /**
     * 
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

      if (object.sortBy === 'asc') {
        this.sortByAscendingOrder(id)
      } else {
        this.sortByDescendingOrder(id)
      }
    },

    /**
     * 
     */
    sortByAscendingOrder(property) {
      this.mItems = this.items.sort((a, b) => (a[property] > b[property]) - (a[property] < b[property]))
    },

    /**
     * 
     */
    sortByDescendingOrder(property) {
      this.mItems = this.items.sort((a, b) => (b[property] > a[property]) - (b[property] < a[property]))
    },
  }
}

export default sort