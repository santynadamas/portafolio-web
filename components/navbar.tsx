'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { getSettings } from '@/lib/sanity.api'
import type { Settings } from '@/types/sanity'
import { Button } from '@/components/ui/button'
import { Github, Linkedin, Mail, X, Sun, Moon } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '@/hooks/useTheme'

const iconMap = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
}

export function Navbar() {
  const [settings, setSettings] = useState<Settings | null>(null)
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState<string>('')

  const { theme, toggleTheme } = useTheme()

  // 🔹 Fetch settings
  useEffect(() => {
    getSettings()
      .then((data) => {
        setSettings(data)

        const mail = data?.socialLinks?.find(
          (s) => s.icon?.toLowerCase() === 'mail'
        )

        if (mail?.url) setEmail(mail.url)
      })
      .catch((err) => {
        console.error('Error loading settings:', err)
      })
  }, [])

  // 🔹 Cerrar modal con ESC
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }

    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  if (!settings) return null

  return (
    <>
      {/* HEADER */}
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 w-full z-50 backdrop-blur border-b bg-background/70"
      >
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">

          {/* LOGO */}
          <div className="text-lg font-semibold">
            My Portfolio
          </div>

          {/* MENU */}
          <ul className="hidden md:flex items-center gap-6">
            {(settings.menu ?? []).map((item, i) => (
              <motion.li
                key={item.slug}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="relative group"
              >
                <Link
                  href={`#${item.slug}`}
                  className="text-sm text-muted-foreground transition"
                >
                  {item.label}
                </Link>

                <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-foreground transition-all duration-300 group-hover:w-full" />
              </motion.li>
            ))}

            {/* CONTACT */}
            <motion.li
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: (settings.menu?.length ?? 0) * 0.08 }}
              className="relative group"
            >
              <Link
                href="#contact"
                className="text-sm text-muted-foreground transition"
              >
                Contact
              </Link>

              <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-foreground transition-all duration-300 group-hover:w-full" />
            </motion.li>
          </ul>

          {/* ACTIONS */}
          <div className="flex items-center gap-2">

            {/* 🌙 DARK MODE TOGGLE */}
            <motion.div
              whileHover={{ scale: 1.15, y: -2 }}
              whileTap={{ scale: 0.9 }}
            >
              <Button
                size="icon-sm"
                variant="ghost"
                onClick={toggleTheme}
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <Sun className="size-4" />
                ) : (
                  <Moon className="size-4" />
                )}
              </Button>
            </motion.div>

            {/* SOCIAL */}
            {(settings.socialLinks ?? []).map((social) => {
              const key = social.icon?.toLowerCase()
              const Icon = key
                ? iconMap[key as keyof typeof iconMap]
                : null

              const isEmail =
                key === 'mail' || social.url?.includes('@')

              const content = (
                <motion.div
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <Button
                    size="icon-sm"
                    variant="ghost"
                    aria-label={social.platform}
                  >
                    {Icon ? (
                      <Icon className="size-4" />
                    ) : (
                      social.platform?.[0]
                    )}
                  </Button>
                </motion.div>
              )

              if (isEmail) {
                return (
                  <div
                    key={`${social.platform}-${social.url}`}
                    onClick={() => setOpen(true)}
                    className="cursor-pointer"
                  >
                    {content}
                  </div>
                )
              }

              return (
                <a
                  key={`${social.platform}-${social.url}`}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {content}
                </a>
              )
            })}
          </div>
        </nav>
      </motion.header>

      {/* MODAL */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 30 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-background rounded-xl p-6 w-[90%] max-w-sm space-y-4 shadow-lg"
            >
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-lg">Contact Me</h3>

                <motion.button
                  whileHover={{ rotate: 90 }}
                  onClick={() => setOpen(false)}
                >
                  <X className="size-4" />
                </motion.button>
              </div>

              <p className="text-sm text-muted-foreground">
                You can reach me at:
              </p>

              <div className="border rounded-lg p-3 text-center font-medium">
                {email}
              </div>

              <a
                href={`mailto:${email}`}
                className="block text-center text-sm underline"
              >
                Send email
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}