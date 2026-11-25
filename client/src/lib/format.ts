const MEAL_ORDER = ['breakfast', 'brunch', 'lunch', 'dinner', 'late night']

export function nutritionNumber(value: string | number | null | undefined): number | null {
  if (value === null || value === undefined || value === '') {
    return null
  }
  const parsed = typeof value === 'number' ? value : Number(value)
  return Number.isFinite(parsed) ? parsed : null
}

export function formatNutrition(value: string | number | null | undefined): string {
  const amount = nutritionNumber(value)
  if (amount === null) {
    return '—'
  }
  return new Intl.NumberFormat(undefined, { maximumFractionDigits: 1 }).format(amount)
}

export function menuDateKey(value: string): string {
  const match = /^(\d{4}-\d{2}-\d{2})/.exec(value)
  return match ? match[1] : value
}

export function formatMenuDate(value: string): string {
  const key = menuDateKey(value)
  const [year, month, day] = key.split('-').map(Number)
  if (!year || !month || !day) {
    return value
  }
  return new Date(year, month - 1, day).toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })
}

export function mealRank(mealType: string): number {
  const index = MEAL_ORDER.indexOf(mealType.trim().toLowerCase())
  return index === -1 ? MEAL_ORDER.length : index
}
