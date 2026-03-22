'use client'

import { useEffect, useState } from 'react'
import { getAbout } from '@/lib/sanity.api'
import type { About } from '@/types/sanity'
import { motion } from 'framer-motion'

export function AboutSection() {
  const [about, setAbout] = useState<About | null>(null)

  useEffect(() => {
    getAbout().then(setAbout)
  }, [])

  if (!about) return null

  return (
    <section
      id="about"
      className="min-h-screen flex items-center justify-center px-4 py-16"
    >
      <motion.div
        className="max-w-3xl w-full space-y-8"
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
          className="text-2xl md:text-3xl font-bold text-center"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          About Me
        </motion.h2>

        {/* Description */}
        <motion.p
          className="text-center text-muted-foreground text-sm md:text-base max-w-xl mx-auto"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          {about.description}
        </motion.p>

        {/* Skills */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 gap-3"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.08,
              },
            },
          }}
        >
          {about.skills.map((skill) => (
            <motion.div
              key={skill.name}
              variants={{
                hidden: { opacity: 0, y: 15 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{
                scale: 1.05,
                y: -4,
              }}
              transition={{ type: 'spring', stiffness: 250 }}
              className="border rounded-lg p-3 text-center bg-background/50 backdrop-blur-sm hover:shadow-md"
            >
              <p className="font-medium text-sm">
                {skill.name}
              </p>

              <span className="text-xs text-muted-foreground">
                {skill.level}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}