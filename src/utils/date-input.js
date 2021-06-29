import IMask from 'imask';
import { format, parse } from 'fecha';


const optionMask = {
  mask: Date,
  lazy: false,
  pattern: 'd{/}`m{/}`Y',
  format: formatDate,
  parse: parseDate,
  autofix: true,
}

/**
 * Formatter date
 * @param {Date} date 
 * @returns {String} Return string formatted `DD/MM/YYYY` date string
 */
function formatDate(date){
  return format(date, 'DD/MM/YYYY')
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