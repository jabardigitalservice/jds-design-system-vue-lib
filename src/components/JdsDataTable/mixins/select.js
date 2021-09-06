const select = {

  data() {
    return {
      selectedItems: [],
      selectAll: false
    }
  },
  methods: {

    /**
     * Check if an Object has a property
     * @param {Object} item 
     * @param {String, Number} property 
     * @returns {Boolean}
     */

    hasProperty(item, property) {
      return Object.prototype.hasOwnProperty.call(item, property)
    },

    /**
     * Triggered when checkbox on table
     * header is clicked
     */
    
    onSelectAll() {

      if (!this.isKeyExist) {
        return
      }

      if (this.isSelectingAllItemsWithinPage) {
        this.items.forEach((item) => {
          this.onRowSelectChange(item, true)
        })

        this.emitChanges()
      } else {
        this.onRowSelectChange(null, false)

        this.emitChanges()
      }
    },

    /**
     * Triggered when checkbox on the table body
     * is clicked
     * @param {Object} item 
     * @param {Boolean} bool
     */
    
    onRowSelectChange(item, bool) {

      if (!this.isKeyExist) {
        return
      }

      if (typeof bool === 'boolean' && bool === true) {
        if (this.isSelected(item)) {
          const array = this.selectedItems.filter(value => value !== item[this.itemKey])
          this.selectedItems = [...array]
        } else {
          this.selectedItems.push(item[this.itemKey])
        }
      }

      else {
        const set = new Set(this.selectedItems)
        this.items.forEach(item => {
          set.add(item[this.itemKey])
        })
        this.selectedItems = Array.from(set)
      }
    },

    /**
     * Emmit an event with 
     * array of selected items
     */

    emitChanges() {
      if (!this.isKeyExist) {
        return
      }
      this.$emit('change:select', this.selectedItems)
    },

    /**
     * Check wether the item provided is currently
     * being selected
     * 
     * @param {Object} item 
     * @returns {Boolean}
     */

    isSelected(item) {
      return this.selectedItems.includes(item[this.itemKey])
    },

  },
  computed: {

    /**
     * Check whether the itemKey provided are exists
     * within the items 
     * 
     * @returns {Boolean}
     */

    isKeyExist() {
      return this.items.every(item => this.hasProperty(item, this.itemKey))
    },

    /**
     * Check whether all item on the current page
     * are being selected or not.
     * @returns {Boolean}
     */

    isSelectingAllItemsWithinPage() {
      return this.items.every((item) => this.isSelected(item))
    },

    /**
     * Check whether there is at least one item being 
     * selected on the current page
     * @returns {Boolean}
     */

    isIndeterminate() {
      if (!Array.isArray(this.items)) {
        return false
      }
      if (this.isSelectingAllItemsWithinPage) {
        return false
      }
      return this.items.some((item) => this.isSelected(item))
    }
  },

  watch: {
    isSelectingAllItemsWithinPage(truthy) {
      this.selectAll = truthy
    },
  }
}

export default select