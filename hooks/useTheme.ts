import { useEffect, useState } from 'react'

export function useTheme() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window === 'undefined') return 'light'

    const stored = localStorage.getItem('theme') as 'light' | 'dark' | null

    if (stored) return stored

    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    return systemDark ? 'dark' : 'light'
  })

  // 👉 Solo sincroniza con el DOM (NO setState)
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark'
      localStorage.setItem('theme', next)
      return next
    })
  }

  return { theme, toggleTheme }
}