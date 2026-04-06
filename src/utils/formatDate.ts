const MS_DAY = 86400000

function startOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate())
}

/** List row: Yesterday, weekday if within last 7 days, else M/D/YY */
export function formatListDate(iso: string, now: Date = new Date()): string {
  const tx = new Date(iso)
  const today = startOfDay(now)
  const txDay = startOfDay(tx)
  const diffDays = Math.round((today.getTime() - txDay.getTime()) / MS_DAY)

  if (diffDays === 1) return 'Yesterday'
  if (diffDays >= 0 && diffDays < 7) {
    return tx.toLocaleDateString('en-US', { weekday: 'long' })
  }
  return tx.toLocaleDateString('en-US', {
    month: 'numeric',
    day: 'numeric',
    year: '2-digit',
  })
}

/** Detail header: full date + time */
export function formatDetailDateTime(iso: string): string {
  const d = new Date(iso)
  const datePart = d.toLocaleDateString('en-US', {
    month: 'numeric',
    day: 'numeric',
    year: '2-digit',
  })
  const timePart = d.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })
  return `${datePart}, ${timePart}`
}

export function formatCurrency(amount: number, opts?: { type?: 'credit' | 'payment' }): string {
  const formatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
  if (opts?.type === 'payment') {
    return `+${formatted}`
  }
  return formatted
}
