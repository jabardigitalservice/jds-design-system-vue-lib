import IMask from 'imask';
import { format, parse } from 'fecha';


const optionMask = {
  mask: Date,
  lazy: false,
  pattern: 'd{/}`m{/}`Y',
  blocks: {
    d: {
      placeholderChar: 'D',
      mask: IMask.MaskedRange,
      from: 1,
      to: 31,
      maxLength: 2,
    },
    m: {
      placeholderChar: 'M',
      mask: IMask.MaskedRange,
      from: 1,
      to: 12,
      maxLength: 2,
    },
    Y: {
      placeholderChar: 'Y',
      mask: IMask.MaskedRange,
      from: 1900,
      to: 9999,
    }
  },
  format: formatDate,
  parse: parseDate,
  autofix: true,
  overwrite: true,
}

/**
 * Formatter date
 * @param {Date} date 
 * @returns {String} Return string formatted `DD/MM/YYYY` date string
 */
function formatDate(date){
  if(date instanceof Date) return format(date, 'DD/MM/YYYY')
  return
}

/**
 * Parsing Date
 * @param {String} date 
 * @returns {Date} Returns Date object. Returns null what date string is invalid or doesn't match format
 */
function parseDate(date){
  return parse(date, 'DD/MM/YYYY')
}

/**
 * Create Custom Event
 * @param {Object} el element DOM
 * @param {String} eventName name of event
 * @param {Object} data element mask
 */
function fireEvent (el, eventName, data) {
  var e = document.createEvent('CustomEvent');
  e.initCustomEvent(eventName, true, true, data);
  el.dispatchEvent(e);
}

/**
 * Initial Masking
 * @param {Object} el element DOM
 * @param {Object} opts configuration options
 */
function initMask (el, opts) {
  return el.maskRef = IMask(el, {...optionMask,...opts})
    .on('accept', () => fireEvent(el, 'accept', el.maskRef))
    .on('complete', () => fireEvent(el, 'complete', el.maskRef));
  
}

/**
 * Destroy Masking
 * @param {Object} el element DOM
 */
function destroyMask (el) {
  if (el?.maskRef) {
    el.maskRef.destroy();
    delete el.maskRef;
  }
}



export const imask = { initMask, destroyMask }
export const fnDate = { parseDate, formatDate }
