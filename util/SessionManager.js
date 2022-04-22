export function getJwt() {
  const jwt = window.localStorage.getItem('jwt')
  if (isEmpty(jwt)) {
    return
  }
  return JSON.parse(jwt).value
}

export const isEmpty = function (value) {
  return (
    value === '' ||
    value === null ||
    value === undefined ||
    (typeof value === 'object' && !Object.keys(value).length)
  )
}
