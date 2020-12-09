import Cookies from 'js-cookie'

const themePrefix = 'theme'

export function getTheme() {
  return Cookies.get(themePrefix)
}

export function setTheme(theme) {
  return Cookies.set(themePrefix, theme)
}
