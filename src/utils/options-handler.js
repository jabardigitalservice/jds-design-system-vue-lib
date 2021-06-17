/**
 * 
 * @param {string | object} option - Option item
 * @param {string} [labelKey] - Required if option is an object. Defined option label.
 * @returns {string} option label
 */
export function getOptionLabel(option, labelKey) {
  if (option && typeof option === 'object') {
    return option[labelKey]
  }
  return option
}

/**
 * 
 * @param {string | object} option - Option item
 * @param {string} [valueKey] - Required if option is an object. Defined option value.
 * @returns {any} option value
 */
export function getOptionValue(option, valueKey) {
  if (option && typeof option === 'object') {
    return option[valueKey]
  }
  return option
}

/**
 * Find matched option by value.
 * @param {any} optionValue - Targeted value
 * @param {Array<any>} options - Available options
 * @param {string} [valueKey] - Required if options consist of objects
 * @returns {any | undefined} - matched option
 */
export function findMatchedOption(optionValue, options, valueKey) {
  if (!Array.isArray(options)) {
    return undefined
  }
  if (valueKey) {
    return options.find((opt) => getOptionValue(opt, valueKey) === optionValue)
  }
  return options.find((opt) => opt === optionValue)
}

/**
 * Determine whether option is selected or not,
 * by comparing currently selected value with option value
 * @param {any} selectedValue - Currently selected value
 * @param {any} option - Option item
 * @param {string} [valueKey] - Required if option is an object. Defined option value.
 */
export function isOptionSelected(selectedValue, option, valueKey) {
  return getOptionValue(option, valueKey) === selectedValue
}
