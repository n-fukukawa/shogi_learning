const DAYS = ['日', '月', '火', '水', '木', '金', '土'] as const

export const formatDate = (
  dateString: string,
  devider: string = '/',
  zeroPadding: boolean = false
) => {
  const date = new Date(dateString)

  const year = date.getFullYear()
  let month: unknown = date.getMonth() + 1
  if (zeroPadding) {
    month = ('0' + month).slice(-2)
  }

  let day: unknown = date.getDate()
  if (zeroPadding) {
    day = ('0' + day).slice(-2)
  }

  return [year, month, day].join(devider)
}

export const formatMonthAndDate = (dateString: string) => {
  const date = new Date(dateString)

  const month = date.getMonth() + 1
  const day = date.getDate()

  return month + '/' + day
}

export const getDateAndWeekday = (dateString: string) => {
  const date = new Date(dateString)
  const weekday = date.getDay()

  return { date: date.getDate(), weekday: DAYS[weekday] }
}
