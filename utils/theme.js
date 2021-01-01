import Cookies from 'js-cookie'

const themePrefix = 'theme'

const colorPrefix = 'color'

export function getTheme() {
  return Cookies.get(themePrefix)
}

export function setTheme(theme) {
  return Cookies.set(themePrefix, theme)
}

export function setBgColor(color) {
  return Cookies.set(colorPrefix,color)
}

export function getBgColor(){
  return Cookies.get(colorPrefix)
}
