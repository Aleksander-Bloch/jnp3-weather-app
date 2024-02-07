export const isDefined = (element) => element !== undefined && element !== null

export const formatNumber = (num) => {
  if (num >= 1_000_000) {
    return `${num / 1_000_000}M`
  } else if (num >= 1_000) {
    return `${num / 1_000}K`
  } else {
    return num
  }
}