import {usersDispatchContext} from '../Model/UserModels'

export const isUndefinedOrNullString = (object: string | undefined | null) => {
  return object === undefined || object === null || object.trim() === ''
    ? true
    : false
}
export const saveUserAfterReload = (props: usersDispatchContext) => {
  window.onload = () => {
    const userInfo = localStorage.getItem('user')
    if (userInfo !== null) {
      const userInfos = JSON.parse(userInfo)

      props({type: 'SET_USER', user: userInfos})
    }
  }
}
export const checkIfPageIsReload = () => {
  if (document.cookie.indexOf('mycookie') == -1) {
    // cookie doesn't exist, create it now
    document.cookie = 'mycookie=1'
  } else {
    // not first visit, so alert
    return true
  }
}

export const saveProfileImageAfterReload = (props: usersDispatchContext) => {
  window.onload = () => {
    const profileImage = localStorage.getItem('profile_image')
    if (profileImage !== null) {
      const profile_image = JSON.parse(profileImage)

      props({type: 'SET_PROFILE_IMAGE', profileImage: profile_image})
    }
  }
}
export const isUserLoggedIn = () => {
  const userInfo = localStorage.getItem('user')
  return !isUndefinedOrNullString(userInfo)
}

export const isArrayUndefinedOrNull = <T>(object: T[] | undefined | null) => {
  return object === undefined || object === null || object.length === 0
    ? true
    : false
}
export const capitalString = (text: string) => {
  return text.charAt(0).toUpperCase() + text.slice(1)
}

export const formatBytes = (bytes: number, decimals = 2) => {
  if (bytes === 0) return '0 Bytes'

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}

const b64DecodeUnicode = (str: string) =>
  decodeURIComponent(
    Array.prototype.map
      .call(
        atob(str),
        c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2),
      )
      .join(''),
  )

export const parseJwt = (token: string) =>
  JSON.parse(
    b64DecodeUnicode(token.split('.')[1].replace('-', '+').replace('_', '/')),
  )
