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
        defineField({ name: 'title', type: 'string', validation: (Rule) => Rule.required() }),
        defineField({ name: 'subtitle', type: 'string' }),
      ],
    }),
    defineField({
      name: 'ctaBanner',
      title: 'Call To Action Banner',
      type: 'object',
      fields: [
        defineField({ name: 'title', type: 'string', validation: (Rule) => Rule.required() }),
        defineField({ name: 'subtitle', type: 'string' }),
        defineField({ name: 'ctaLabel', type: 'string', validation: (Rule) => Rule.required() }),
        defineField({ name: 'ctaLink', type: 'string', validation: (Rule) => Rule.required() }),
      ],
    }),
  ],
})
