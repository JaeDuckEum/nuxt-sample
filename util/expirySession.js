// get from session (if the value expired it is destroyed)
import moment from 'moment'

export function sessionGet(key, expirationInMin = 360) {
  // let stringValue = window.sessionStorage.getItem(key)
  const stringValue = window.localStorage.getItem(key)
  if (stringValue !== null) {
    const value = JSON.parse(stringValue)
    const expirationDate = new Date(value.expirationDate)
    if (expirationDate > new Date()) {
      // 시간 연장
      const expirationDate = new Date(
        new Date().getTime() + 60000 * expirationInMin
      )
      const ISODate = moment(expirationDate).format('YYYY[-]MM[-]DD HH:mm:ss') // 포맷을 변경
      const newValue = {
        value: value.value,
        expirationDate: ISODate,
      }
      window.sessionStorage.setItem(key, JSON.stringify(newValue))
      window.localStorage.setItem(key, JSON.stringify(newValue))
      return value.value
    } else {
      window.sessionStorage.removeItem(key)
      window.localStorage.removeItem(key)
    }
  }
  return null
}

// add into session
export function sessionSet(key, value, expirationInMin = 360) {
  const expirationDate = new Date(
    new Date().getTime() + 60000 * expirationInMin
  )
  const ISODate = moment(expirationDate).format('YYYY[-]MM[-]DD HH:mm:ss') // 포맷을 변경
  const newValue = {
    value,
    expirationDate: ISODate,
  }
  window.sessionStorage.setItem(key, JSON.stringify(newValue))
  window.localStorage.setItem(key, JSON.stringify(newValue))
}

// add into session
export function getName() {
  const stringValue = window.localStorage.getItem('name')
  if (stringValue !== null) {
    const value = JSON.parse(stringValue)
    return value.value
  }
}
