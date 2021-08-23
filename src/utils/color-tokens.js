import colors from '../../styles/scss/_variables.scss'

/**
 * This code is converter Sass Array Object to JSON Array Object
 */
let list = colors.list.replace(/(\(|\))/g, '') //removing bracket wrap array
list = list.replace(/(: #)/g, ': "#') //changing type value into string
list = list.replace(/(, ")/g, '", "') + '"' //changing type value into string
list = `{${list}}` //adding curly braket
list = JSON.parse(list) //parse to JSON

/**
 * This function for grouping items by color name
 */
const grouped = Object.entries(list).reduce((obj, [name, hex]) => {
  let colorName = name.split('-') //get color name by split value before e.g red-500 to red
  let colorCode
  if (colorName.length > 1) {
    colorCode = colorName.pop()
    colorName = colorName.join('-')
  }
  if (colorName in obj === false) {
    obj[colorName] = {}
  }
  if (colorCode) {
    obj[colorName][colorCode] = hex
  } else {
    obj[colorName][colorName] = hex
  }
  return obj
}, {})

export default grouped