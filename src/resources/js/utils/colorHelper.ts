import chroma from 'chroma-js'

export const getProperForegroundColor = (
  backgroundColor: string,
  lightColor: string = '#ffffff',
  darkColor: string = '#47433f'
) => {
  return chroma(backgroundColor).luminance() > 0.6 ? darkColor : lightColor
}
