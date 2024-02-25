export const minutesToString = (minutes: number) => {
  const hour = Math.floor(minutes / 60)
  const min = minutes % 60

  if (hour === 0) return min + '分'

  return hour + '時間' + min + '分'
}
