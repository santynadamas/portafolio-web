'use client'

import { useEffect, useState } from 'react'
import { getSettings } from '@/lib/sanity.api'
import type { Settings } from '@/types/sanity'
import { motion } from 'framer-motion'

export function Footer() {
  const [settings, setSettings] = useState<Settings | null>(null)

  useEffect(() => {
    getSettings().then(setSettings)
  }, [])

  const year = new Date().getFullYear()

  return (
    <motion.footer
      className="border-t mt-16 py-6 px-4"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">

        {/* Left */}
        <motion.p
          className="text-xs md:text-sm text-muted-foreground text-center md:text-left"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          © {year} Santiago Rojas. All rights reserved.
        </motion.p>

        {/* Social Links */}
        <motion.div
          className="flex items-center gap-3"
          initial="hidden"
          whileInView="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.08,
              },
            },
          }}
        >
          {(settings?.socialLinks ?? []).map((social) => (
            <motion.a
              key={social.url}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{ y: -2, scale: 1.05 }}
              className="text-xs md:text-sm text-muted-foreground hover:text-foreground transition"
            >
              {social.platform}
            </motion.a>
          ))}
        </motion.div>

      </div>
    </motion.footer>
  )
}