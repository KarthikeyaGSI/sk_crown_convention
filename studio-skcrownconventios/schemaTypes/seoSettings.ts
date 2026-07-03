import { defineType, defineField } from 'sanity'
import { EarthGlobeIcon } from '@sanity/icons'

export const seoSettings = defineType({
  name: 'seoSettings',
  title: 'SEO Settings',
  type: 'document',
  icon: EarthGlobeIcon,
  fields: [
    defineField({
      name: 'defaultTitle',
      title: 'Default SEO Title',
      type: 'string',
      description: 'The title used as fallback for pages that do not have specific titles.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'defaultDescription',
      title: 'Default SEO Description',
      type: 'text',
      description: 'The meta description used as fallback.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph Image',
      type: 'image',
      description: 'Recommended size: 1200x630px. Used when sharing links on social media.',
    }),
    defineField({
      name: 'canonicalBaseUrl',
      title: 'Canonical Base URL',
      type: 'url',
      description: 'e.g., https://skcrownconvention.com',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'robots',
      title: 'Robots Directives',
      type: 'string',
      initialValue: 'index, follow',
      description: 'e.g., index, follow or noindex, nofollow',
    }),
    defineField({
      name: 'schemaMarkup',
      title: 'Structured Schema Markup (JSON-LD)',
      type: 'text',
      description: 'Custom global schema markup to inject into the head. Wrap in valid JSON.',
    }),
  ],
})
