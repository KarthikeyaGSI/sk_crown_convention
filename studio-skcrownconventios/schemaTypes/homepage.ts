import { defineType, defineField, defineArrayMember } from 'sanity'
import { HomeIcon } from '@sanity/icons'

export const homepage = defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  icon: HomeIcon,
  fields: [
    defineField({
      name: 'heroHeading',
      title: 'Hero Heading',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroVideoWebmUrl',
      title: 'Hero Video WebM URL',
      type: 'string',
      description: 'e.g., /videos/hero-video-sk-crown.webm',
    }),
    defineField({
      name: 'heroVideoMp4Url',
      title: 'Hero Video MP4 URL',
      type: 'string',
      description: 'e.g., /videos/hero-video-sk-crown.mp4',
    }),
    defineField({
      name: 'heroPoster',
      title: 'Hero Poster Image',
      type: 'image',
      description: 'Shown while video loads',
    }),
    defineField({
      name: 'heroOverlayOpacity',
      title: 'Hero Overlay Opacity (0-100)',
      type: 'number',
      initialValue: 45,
    }),
    defineField({
      name: 'heroEnabled',
      title: 'Hero Enabled',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'heroOrder',
      title: 'Hero Display Order',
      type: 'number',
      initialValue: 1,
    }),
    defineField({
      name: 'heroSubheading',
      title: 'Hero Subheading',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroCTA',
      title: 'Hero Primary CTA',
      type: 'object',
      fields: [
        defineField({ name: 'label', type: 'string', validation: (Rule) => Rule.required() }),
        defineField({ name: 'link', type: 'string', validation: (Rule) => Rule.required() }),
      ],
    }),
    defineField({
      name: 'heroSecondaryCTA',
      title: 'Hero Secondary CTA',
      type: 'object',
      fields: [
        defineField({ name: 'label', type: 'string', validation: (Rule) => Rule.required() }),
        defineField({ name: 'link', type: 'string', validation: (Rule) => Rule.required() }),
      ],
    }),
    defineField({
      name: 'introSection',
      title: 'Introduction Section',
      type: 'object',
      fields: [
        defineField({ name: 'enabled', type: 'boolean', title: 'Enabled', initialValue: true }),
        defineField({ name: 'order', type: 'number', title: 'Display Order', initialValue: 2 }),
        defineField({ name: 'title', type: 'string', validation: (Rule) => Rule.required() }),
        defineField({ name: 'text', type: 'text', validation: (Rule) => Rule.required() }),
        defineField({ name: 'image', type: 'image', validation: (Rule) => Rule.required() }),
      ],
    }),
    defineField({
      name: 'highlights',
      title: 'Highlights Grid',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'title', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'description', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'icon', type: 'string', description: 'Lucide icon name, e.g. Users, Car, Heart, Flame, Shield, MapPin' }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'featuredExperience',
      title: 'Featured Experience Section',
      type: 'object',
      fields: [
        defineField({ name: 'enabled', type: 'boolean', title: 'Enabled', initialValue: true }),
        defineField({ name: 'order', type: 'number', title: 'Display Order', initialValue: 3 }),
        defineField({ name: 'title', type: 'string', validation: (Rule) => Rule.required() }),
        defineField({ name: 'subtitle', type: 'string' }),
        defineField({ name: 'description', type: 'text', validation: (Rule) => Rule.required() }),
        defineField({ name: 'image', type: 'image', validation: (Rule) => Rule.required() }),
        defineField({
          name: 'bulletPoints',
          title: 'Bullet Points',
          type: 'array',
          of: [defineArrayMember({ type: 'string' })],
        }),
      ],
    }),
    defineField({
      name: 'galleryPreview',
      title: 'Gallery Preview Section',
      type: 'object',
      fields: [
        defineField({ name: 'enabled', type: 'boolean', title: 'Enabled', initialValue: true }),
        defineField({ name: 'order', type: 'number', title: 'Display Order', initialValue: 4 }),
        defineField({ name: 'title', type: 'string', validation: (Rule) => Rule.required() }),
        defineField({ name: 'subtitle', type: 'string' }),
      ],
    }),
    defineField({
      name: 'ctaBanner',
      title: 'Call To Action Banner',
      type: 'object',
      fields: [
        defineField({ name: 'enabled', type: 'boolean', title: 'Enabled', initialValue: true }),
        defineField({ name: 'order', type: 'number', title: 'Display Order', initialValue: 5 }),
        defineField({ name: 'title', type: 'string', validation: (Rule) => Rule.required() }),
        defineField({ name: 'subtitle', type: 'string' }),
        defineField({ name: 'ctaLabel', type: 'string', validation: (Rule) => Rule.required() }),
        defineField({ name: 'ctaLink', type: 'string', validation: (Rule) => Rule.required() }),
      ],
    }),
    defineField({
      name: 'storytellingCards',
      title: 'Premium Storytelling Cards',
      type: 'array',
      of: [{ type: 'storytellingCard' }],
      description: 'Used for the vertical scrolling cinematic section on the homepage.',
    }),
  ],
})
