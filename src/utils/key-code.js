/**
 * @param {KeyboardEvent} e 
 * @returns {boolean}
 */
export const isEnter = (e) => {
  return e.keyCode === 13
    || e.key === 'Enter'
    || e.code === 'Enter'
}
/**
 * 
 * @param {KeyboardEvent} e 
 * @returns {boolean}
 */
export const isTab = (e) => {
  return e.keyCode === 9
    || e.key === 'Tab'
    || e.code === 'Tab'
}

/**
 * 
 * @param {'Up'|'Down'|'Right'|'Left'} type
 * @param {KeyboardEvent} e 
 * @returns {boolean}
 */
export const isArrow = (type, e) => {
  const matchedKeyOrCode = e.key === `Arrow${type}`
    || e.code === `Arrow${type}`
  switch (type) {
    case 'Left':
      return matchedKeyOrCode || e.keyCode === 37
    case 'Up':
      return matchedKeyOrCode || e.keyCode === 38
    case 'Right':
      return matchedKeyOrCode || e.keyCode === 39
    case 'Down':
      return matchedKeyOrCode || e.keyCode === 40
  }
}

/**
 * 
 * @param {KeyboardEvent} e 
 * @returns {boolean}
 */
export const isEscape = (e) => {
  return e.keyCode === 27
    || e.key === 'Escape'
    || e.code === 'Escape'
}
