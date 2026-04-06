/** Stable pseudo-random dark background from transaction id */
export function darkBackgroundFromId(id: string): string {
  let h = 0
  for (let i = 0; i < id.length; i += 1) {
    h = Math.imul(31, h) + id.charCodeAt(i)
    h |= 0
  }
  const u = Math.abs(h)
  const r = 28 + (u % 36)
  const g = 28 + ((u >> 8) % 36)
  const b = 28 + ((u >> 16) % 36)
  return `rgb(${r},${g},${b})`
}
