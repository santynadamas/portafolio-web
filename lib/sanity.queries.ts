export const homeQuery = `
  *[_type == "home"][0]{
    _id,
    name,
    headline,
    welcomeText,
    profileImage,
    ctaText
  }
`

export const aboutQuery = `
  *[_type == "about"][0]{
    _id,
    description,
    skills[]{
      name,
      level
    }
  }
`

export const projectsQuery = `
  *[_type == "project"] | order(_createdAt desc){
    _id,
    title,
    description,
    image,
    link,
    featured
  }
`

export const featuredProjectsQuery = `
  *[_type == "project" && featured == true]{
    _id,
    title,
    description,
    image,
    link,
    featured
  }
`

export const experienceQuery = `
  *[_type == "experience"] | order(startDate desc){
    _id,
    company,
    role,
    startDate,
    endDate,
    technologies,
    description
  }
`

export const settingsQuery = `
  *[_type == "settings"][0]{
    _id,
    menu[]{
      label,
      slug
    },
    socialLinks[]{
      platform,
      url,
      icon
    }
  }
`