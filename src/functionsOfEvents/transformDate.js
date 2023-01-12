export function transformDate(str) {
  const year = +str.slice(0, 4)
  const month = +str.slice(4, 6)
  const day = +str.slice(6, 8)
  const hours = +str.slice(-6, -4)
  const minutes = +str.slice(-4, -2)

  return new Date(year, month - 1, day, hours + 3, minutes)
}
