export const LIST_VIEW = 'list_view'
export const CHART_VIEW = 'chart_view'
export const INCOME = 'income'
export const OUTCOME = 'outcome'

export const padLeft = (n) => {
  return n < 10 ? '0' + n : n
}

export const range = (size, startAt = 1) => {
  const arr = []
  for (let i = 0; i < size; i++) {
    arr[i] = startAt + i
  }
  return arr
}

export const getYearAndMonth = (str) => {
  const date = str ? new Date(str) : new Date()
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
  }
}
