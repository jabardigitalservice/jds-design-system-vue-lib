const listOfMonth = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

const listOfDays = [
  'Mo',
  'Tu',
  'We',
  'Th',
  'Fr',
  'Sa',
  'Su',
]

/**
 * Generate days current month of the date
 * @param {Date} date
 * @return {Array.<Object>}  return array of object date { date, month, year }
 */
const generateDays = (date) => {
  const _date = date
  _date.setDate(1) //set date to first date of the month
  const firstDayIndexOfCurrentMonth = _date.getDay() // return number index position first day of current month 
  const lastDayIndexOfCurrentMonth = new Date(date.getFullYear(),date.getMonth() + 1, 0).getDay(); // return number index position last day of current month 
  const lastDayOfCurrentMonth = new Date(date.getFullYear(),date.getMonth() + 1,0).getDate() // return number last day of current month
  const lastDayOfPrevMonth = new Date(date.getFullYear(),date.getMonth(),0).getDate() // return number last day of previous month
  
  return [
    ...generateDayLastMonth(date,firstDayIndexOfCurrentMonth,lastDayOfPrevMonth),
    ...generateDayCurrentMonth(date, lastDayOfCurrentMonth),
    ...generateDayNextMonth(date,lastDayIndexOfCurrentMonth)
  ]
}

/**
 * Generate days last month
 * @param {Date} date // date
 * @param {Number} firstDayIndexOfCurrentMonth number index position first day of current month 
 * @param {Number} lastDayOfPrevMonth number last day of previous month
 * @returns {Array.<Object>} return array of object date { date, month, year }
 */
const generateDayLastMonth = (date, firstDayIndexOfCurrentMonth, lastDayOfPrevMonth) => {
  const length = firstDayIndexOfCurrentMonth !== 0 ? firstDayIndexOfCurrentMonth : 7
  let days = new Array()
  for (let i = length - 2; i >= 0; i--) { //start with monday
    days = [...days, {
      date: lastDayOfPrevMonth - i,
      month: date.getMonth(),
      year: date.getFullYear()
    }]
  }
  return days
}

/**
 * Generate days current month
 * @param {Date} date //date
 * @param {Number} lastDayOfCurrentMonth // last day of current month
 * @returns {Array.<Object>} return array of object date { date, month, year }
 */
const generateDayCurrentMonth = (date, lastDayOfCurrentMonth) => {
  let days = new Array()
  for (let i = 1; i <= lastDayOfCurrentMonth; i++) {
    days = [...days, {
      date: i,
      month: date.getMonth() + 1,
      year: date.getFullYear()
    }]
  }
  return days
}

/**
 * Generate days current month
 * @param {Date} date //date
 * @param {Number} lastDayIndexOfCurrentMonth // number index position last day of current month 
 * @returns {Array.<Object>} return array of object date { date, month, year }
 */
const generateDayNextMonth = (date, lastDayIndexOfCurrentMonth) => {
  const length = lastDayIndexOfCurrentMonth !== 0 ? 7 - lastDayIndexOfCurrentMonth : lastDayIndexOfCurrentMonth  
  let days = new Array()
  for (let i = 1; i <= length; i++) {
    days = [...days, {
      date: i,
      month: date.getMonth() + 2,
      year: date.getFullYear()
    }]
  }
  return days
}

/**
 * Get days current month of the date
 * Parsing date string to instance of date
 * @param {Date} date 
 * @return {Array.<Object>}  return array of object date { date, month, year }
 */
const getDays = (date) => {
  return generateDays(date)
}

export { listOfDays, listOfMonth, getDays }
