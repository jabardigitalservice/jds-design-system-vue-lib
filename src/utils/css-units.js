export function isCSSUnit(str) {
  if (typeof str !== 'string' || !str.length) {
    return false
  }
  const units = [
    'px',
    'rem',
    'em',
    'ch',
    '%',
    'vw',
    'vh'
  ]
  return units.some((unit) => str.endsWith(unit))
}
