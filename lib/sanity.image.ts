import imageUrlBuilder from '@sanity/image-url'
import { sanityClient } from './sanity.client'
import type { SanityImage } from '@/types/sanity'

const builder = imageUrlBuilder(sanityClient)

export function urlFor(source: SanityImage) {
  return builder.image(source)
}