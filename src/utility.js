export const LIST_VIEW = 'list_view'
export const CHART_VIEW = 'chart_view'

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
