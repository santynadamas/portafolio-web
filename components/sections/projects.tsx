
'use client'

import { useEffect, useState } from 'react'
import { getProjects } from '@/lib/sanity.api'
import type { Project } from '@/types/sanity'
import { urlFor } from '@/lib/sanity.image'
import { motion } from 'framer-motion'

export function ProjectsSection() {
  const [project, setProject] = useState<Project | null>(null)

  useEffect(() => {
    getProjects().then((data) => {
      setProject(data[0] ?? null)
    })
  }, [])

  if (!project) return null

  return (
    <section
      id="project"
      className="min-h-screen px-4 py-16 flex items-center"
    >
      <motion.div
        className="max-w-5xl mx-auto w-full space-y-10"
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
          Projects
        </motion.h2>

        {/* CONTENT */}
        <div className="grid md:grid-cols-2 gap-8 items-center">
          
          {/* IMAGE */}
          {project.image && (
            <motion.div
              className="overflow-hidden rounded-xl"
              variants={{
                hidden: { opacity: 0, x: -40 },
                visible: { opacity: 1, x: 0 },
              }}
            >
              <motion.img
                src={urlFor(project.image).width(800).url()}
                alt={project.title}
                className="w-full rounded-xl shadow-md"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.4 }}
              />
            </motion.div>
          )}

          {/* TEXT */}
          <motion.div
            className="space-y-4"
            variants={{
              hidden: { opacity: 0, x: 40 },
              visible: { opacity: 1, x: 0 },
            }}
          >
            <h3 className="text-xl md:text-2xl font-semibold">
              {project.title}
            </h3>

            <p className="text-sm md:text-base text-muted-foreground">
              {project.description}
            </p>

            {project.link && (
              <motion.a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ x: 5 }}
                className="inline-flex items-center gap-1 text-primary text-sm font-medium"
              >
                View Project →
              </motion.a>
            )}
          </motion.div>

        </div>
      </motion.div>
    </section>
  )
}