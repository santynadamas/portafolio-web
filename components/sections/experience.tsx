'use client'

import { useEffect, useState } from 'react'
import { getExperience } from '@/lib/sanity.api'
import type { Experience } from '@/types/sanity'
import { formatDate, getDuration } from '@/lib/sanity.utils'
import { motion } from 'framer-motion'

export function ExperienceSection() {
  const [experience, setExperience] = useState<Experience[]>([])

  useEffect(() => {
    getExperience().then(setExperience)
  }, [])

  if (!experience.length) return null

  return (
    <section id="experience" className="px-4 py-16">
      <motion.div
        className="max-w-3xl mx-auto space-y-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.15,
            },
          },
        }}
      >
        {/* TITLE */}
        <motion.h2
          className="text-2xl md:text-3xl font-bold text-center"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          Experience
        </motion.h2>

        {/* TIMELINE */}
        <div className="relative">

          {/* Línea */}
          <motion.div
            className="absolute left-3 top-0 w-px bg-border"
            initial={{ height: 0 }}
            whileInView={{ height: '100%' }}
            transition={{ duration: 0.6 }}
          />

          <div className="space-y-8">
            {experience.map((exp, i) => (
              <motion.div
                key={exp._id}
                className="relative pl-10"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                {/* Dot */}
                <motion.div
                  className="absolute left-0 top-2 h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center"
                  whileHover={{ scale: 1.2 }}
                >
                  <div className="h-2.5 w-2.5 rounded-full bg-primary" />
                </motion.div>

                {/* Card */}
                <motion.div
                  whileHover={{ y: -4, scale: 1.01 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                  className="rounded-lg border p-4 space-y-2 bg-background/50 backdrop-blur-sm hover:shadow-md"
                >
                  {/* Role */}
                  <h3 className="text-base md:text-lg font-semibold">
                    {exp.role} — {exp.company}
                  </h3>

                  {/* Dates */}
                  <p className="text-xs text-muted-foreground">
                    {formatDate(exp.startDate)} –{' '}
                    {exp.endDate ? formatDate(exp.endDate) : 'Present'} ·{' '}
                    {getDuration(exp)}
                  </p>

                  {/* Tech */}
                  <div className="flex flex-wrap gap-1.5">
                    {(exp.technologies ?? []).map((tech) => (
                      <span
                        key={tech}
                        className="text-[10px] bg-muted px-2 py-0.5 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Description */}
                  <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                    {exp.description}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>

        </div>
      </motion.div>
    </section>
  )
}