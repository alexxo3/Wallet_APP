/**
 * Seasonal daily points: day 1 = 2, day 2 = 3, day N = round(day(N-2) + day(N-1) * 0.6).
 * Seasons: Spring Mar–May, Summer Jun–Aug, Autumn Sep–Nov, Winter Dec–Feb.
 */

function diffCalendarDays(a: Date, b: Date): number {
  const start = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate())
  const end = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate())
  return Math.round((end - start) / 86400000)
}

export function getDayOfSeason(date: Date): number {
  const y = date.getFullYear()
  const m = date.getMonth()
  const d = date.getDate()
  const local = new Date(y, m, d)

  if (m >= 2 && m <= 4) {
    const start = new Date(y, 2, 1)
    return diffCalendarDays(start, local) + 1
  }
  if (m >= 5 && m <= 7) {
    const start = new Date(y, 5, 1)
    return diffCalendarDays(start, local) + 1
  }
  if (m >= 8 && m <= 10) {
    const start = new Date(y, 8, 1)
    return diffCalendarDays(start, local) + 1
  }
  const winterStartYear = m >= 11 ? y : y - 1
  const start = new Date(winterStartYear, 11, 1)
  return diffCalendarDays(start, local) + 1
}

export function computeSeasonalPoints(dayOfSeason: number): number {
  if (dayOfSeason <= 1) return 2
  if (dayOfSeason === 2) return 3
  let twoAgo = 2
  let oneAgo = 3
  for (let d = 3; d <= dayOfSeason; d += 1) {
    const next = Math.round(twoAgo + oneAgo * 0.6)
    twoAgo = oneAgo
    oneAgo = next
  }
  return oneAgo
}

export function formatPointsK(value: number): string {
  if (value >= 1000) {
    return `${Math.round(value / 1000)}K`
  }
  return String(value)
}

export function dailyPointsLabel(now: Date = new Date()): string {
  const day = getDayOfSeason(now)
  const pts = computeSeasonalPoints(day)
  return formatPointsK(pts)
}
