import type { Experience } from '@/types/sanity'

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
  })
}

export function getDuration(exp: Experience): string {
  const start = new Date(exp.startDate)
  const end = exp.endDate ? new Date(exp.endDate) : new Date()

  const years = end.getFullYear() - start.getFullYear()

  return `${years} yr${years !== 1 ? 's' : ''}`
}