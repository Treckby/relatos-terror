import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://loquacious-rolypoly-6d0a9f.netlify.app/sitemap.xml',
  }
}