import { defineType, defineField } from 'sanity'
import { ImagesIcon } from '@sanity/icons'

export const heroSlide = defineType({
  name: 'heroSlide',
  title: 'Hero Slide',
  type: 'document',
  icon: ImagesIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Slide Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Slide Subtitle',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description Text',
      type: 'text',
    }),
    defineField({
      name: 'desktopImage',
      title: 'Desktop Background Image',
      type: 'image',
      description: 'Optimized landscape image for desktop screens',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mobileImage',
      title: 'Mobile Background Image',
      type: 'image',
      description: 'Optimized portrait image for mobile screens (optional)',
    }),
    defineField({
      name: 'overlayOpacity',
      title: 'Overlay Opacity (0 to 100)',
      type: 'number',
      initialValue: 40,
      description: 'Dark overlay opacity percent to improve text readability',
      validation: (Rule) => Rule.min(0).max(100),
    }),
    defineField({
      name: 'ctaLabel',
      title: 'Primary CTA Label',
      type: 'string',
    }),
    defineField({
      name: 'ctaLink',
      title: 'Primary CTA Link',
      type: 'string',
    }),
    defineField({
      name: 'secondaryCtaLabel',
      title: 'Secondary CTA Label',
      type: 'string',
    }),
    defineField({
      name: 'secondaryCtaLink',
      title: 'Secondary CTA Link',
      type: 'string',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'active',
      title: 'Active / Published',
      type: 'boolean',
      initialValue: true,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'altText',
      title: 'Image Alt Text (SEO)',
      type: 'string',
      description: 'Alt description for accessibility and image search engines',
    }),
  ],
})
