
'use client'

import { useEffect, useState } from 'react'
import { getHome } from '@/lib/sanity.api'
import type { Home } from '@/types/sanity'
import { urlFor } from '@/lib/sanity.image'
import { motion } from 'framer-motion'

export function HomeSection() {
  const [home, setHome] = useState<Home | null>(null)

  useEffect(() => {
    getHome().then(setHome)
  }, [])

  if (!home) return null

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center px-4"
    >
      <motion.div
        className="max-w-4xl text-center space-y-6"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.15,
            },
          },
        }}
      >
        
        {/* Imagen */}
        {home.profileImage && (
          <motion.img
            src={urlFor(home.profileImage).width(150).url()}
            alt="Profile"
            className="mx-auto rounded-full"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          />
        )}

        {/* Nombre */}
        <motion.h1
          className="text-3xl md:text-5xl font-bold"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          {home.name}
        </motion.h1>

        {/* Headline */}
        <motion.p
          className="text-xl text-muted-foreground"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          {home.headline}
        </motion.p>

        {/* Texto */}
        <motion.p
          className="max-w-2xl mx-auto"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          {home.welcomeText}
        </motion.p>

      </motion.div>
    </section>
  )
}