'use client'

import { useEffect, useState } from 'react'
import { getSettings } from '@/lib/sanity.api'
import type { Settings } from '@/types/sanity'
import { Mail, Github, Linkedin } from 'lucide-react'
import { motion } from 'framer-motion'

const iconMap = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
}

export function ContactSection() {
  const [settings, setSettings] = useState<Settings | null>(null)

  useEffect(() => {
    getSettings().then(setSettings)
  }, [])

  if (!settings) return null

  const email = settings.socialLinks?.find(
    (s) => s.icon?.toLowerCase() === 'mail'
  )?.url

  return (
    <section id="contact" className="px-4 py-16">
      <motion.div
        className="max-w-2xl mx-auto space-y-8 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.12,
            },
          },
        }}
      >
        {/* Title */}
        <motion.h2
          className="text-2xl md:text-3xl font-bold"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          Contact Me
        </motion.h2>

        {/* Text */}
        <motion.p
          className="text-sm md:text-base text-muted-foreground"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          Feel free to reach out if you want to work together or just say hi 👋
        </motion.p>

        {/* Email Card */}
        {email && (
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20, scale: 0.95 },
              visible: { opacity: 1, y: 0, scale: 1 },
            }}
            whileHover={{ scale: 1.03 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="border rounded-lg p-5 space-y-3 bg-background/50 backdrop-blur-sm hover:shadow-md"
          >
            <Mail className="mx-auto size-5" />

            <p className="font-medium text-sm break-all">
              {email}
            </p>

            <motion.a
              href={`mailto:${email}`}
              whileHover={{ x: 3 }}
              className="text-primary text-xs font-medium"
            >
              Send Email →
            </motion.a>
          </motion.div>
        )}

        {/* Social */}
        <motion.div
          className="flex justify-center gap-3"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.08,
              },
            },
          }}
        >
          {(settings.socialLinks ?? []).map((social) => {
            const key = social.icon?.toLowerCase() as keyof typeof iconMap
            const Icon = iconMap[key]

            if (!Icon || key === 'mail') return null

            return (
              <motion.a
                key={social.url}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                variants={{
                  hidden: { opacity: 0, y: 15 },
                  visible: { opacity: 1, y: 0 },
                }}
                whileHover={{ scale: 1.15, y: -3 }}
                whileTap={{ scale: 0.9 }}
                className="border rounded-md p-2 hover:bg-muted transition"
              >
                <Icon className="size-4" />
              </motion.a>
            )
          })}
        </motion.div>

      </motion.div>
    </section>
  )
}