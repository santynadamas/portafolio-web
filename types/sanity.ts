export interface SanityImageAsset {
  _ref: string
  _type: 'reference'
}

export interface SanityImage {
  _type: 'image'
  asset: SanityImageAsset
}

export interface Home {
  _id: string
  name: string
  headline: string
  welcomeText: string
  profileImage: SanityImage
  ctaText: string
}

export type SkillLevel = 'beginner' | 'intermediate' | 'advanced'

export interface Skill {
  name: string
  level: SkillLevel
}

export interface About {
  _id: string
  description: string
  skills: Skill[]
}

export interface Project {
  _id: string
  title: string
  description: string
  image: SanityImage
  link: string
  featured: boolean
}

export interface Experience {
  _id: string
  company: string
  role: string
  startDate: string
  endDate?: string
  technologies: string[]
  description: string
}

export interface MenuItem {
  label: string
  slug: string
}

export interface SocialLink {
  platform: string
  url: string
  icon?: string
}

export interface Settings {
  _id: string
  menu: MenuItem[]
  socialLinks: SocialLink[]
}