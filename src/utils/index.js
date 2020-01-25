export const parseDateRange = (dateRange) => {
  const regExp = /^\[(2[\d\s-:\+]+),(2[\d\s-:\+]+)[\]|\)]$/
  if (dateRange.match(regExp).length !== 3) throw new Error('Ошибка формата dateRange')
  return [
    { value: new Date(dateRange.match(regExp)[1]), inclusive: true },
    { value: new Date(dateRange.match(regExp)[2]), inclusive: true }
  ]
}
