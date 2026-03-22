import { fetchSanity } from './sanity.fetch'
import {
  homeQuery,
  aboutQuery,
  projectsQuery,
  featuredProjectsQuery,
  experienceQuery,
  settingsQuery,
} from './sanity.queries'

import type {
  Home,
  About,
  Project,
  Experience,
  Settings,
} from '@/types/sanity'

// HOME
export const getHome = () => {
  return fetchSanity<Home | null>(homeQuery, null)
}

// ABOUT
export const getAbout = () => {
  return fetchSanity<About | null>(aboutQuery, null)
}

// PROJECTS
export const getProjects = () => {
  return fetchSanity<Project[]>(projectsQuery, [])
}

export const getFeaturedProjects = () => {
  return fetchSanity<Project[]>(featuredProjectsQuery, [])
}

// EXPERIENCE
export const getExperience = () => {
  return fetchSanity<Experience[]>(experienceQuery, [])
}

// SETTINGS
export const getSettings = async () => {
  const data = await fetchSanity<Settings | null>(settingsQuery, null)

  return {
    _id: data?._id ?? '',
    menu: data?.menu ?? [],
    socialLinks: data?.socialLinks ?? [],
  }
}