const DAYS = ['日', '月', '火', '水', '木', '金', '土'] as const

export const formatDate = (dateString: string) => {
  const date = new Date(dateString)

  return date.toLocaleDateString()
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
  return `${date.getDate()} ${DAYS[weekday]}`
}
