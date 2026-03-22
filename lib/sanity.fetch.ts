import { sanityClient } from './sanity.client'

export async function fetchSanity<T>(
  query: string,
  fallback: T
): Promise<T> {
  try {
    const data = await sanityClient.fetch<T>(query)

    // Si viene null o undefined → usa fallback
    if (data === null || data === undefined) {
      console.warn('⚠️ Sanity returned empty data for query:', query)
      return fallback
    }

    return data
  } catch (error) {
    console.error('❌ Sanity fetch error:', error)

    // 👇 NO rompe la app
    return fallback
  }
}