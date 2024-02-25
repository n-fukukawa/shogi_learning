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
