import colors from './colors.scss'

let list = colors.list.replace(/(\(|\))/g, '')
list = list.replace(/(: #)/g, ': "#')
list = list.replace(/(, ")/g, '", "') + '"'
list = `{${list}}`
list = JSON.parse(list)

const grouped = Object.entries(list).reduce((obj, [name, hex]) => {
  let colorName = name.split('-')
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
