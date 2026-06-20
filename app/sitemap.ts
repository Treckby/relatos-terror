import { MetadataRoute } from 'next'
import { supabase } from './lib/supabase'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://historias-deterror.netlify.app/'

  const { data: relatos } = await supabase
    .from('relatos')
    .select('slug, created_at')

  const relatosUrls = (relatos || []).map((r) => ({
    url: `${baseUrl}/relatos/${r.slug}`,
    lastModified: new Date(r.created_at),
  }))

  return [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/relatos`, lastModified: new Date() },
    ...relatosUrls,
  ]
}