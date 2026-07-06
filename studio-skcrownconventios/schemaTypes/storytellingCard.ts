import { defineType, defineField } from 'sanity'
import { PresentationIcon } from '@sanity/icons'

export const storytellingCard = defineType({
  name: 'storytellingCard',
  title: 'Storytelling Card',
  type: 'object',
  icon: PresentationIcon,
  fields: [
    defineField({
      name: 'enabled',
      title: 'Enabled',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
    }),
    defineField({
      name: 'category',
      title: 'Category Badge',
      type: 'string',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'imageAlt',
      title: 'Image Alt Text',
      type: 'string',
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      description: 'Lucide icon name (e.g. Heart, Star, Sparkles, MapPin)',
    }),
    defineField({
      name: 'primaryCTA',
      title: 'Primary CTA',
      type: 'object',
      fields: [
        defineField({ name: 'label', type: 'string' }),
        defineField({ name: 'link', type: 'string' }),
      ],
    }),
    defineField({
      name: 'secondaryCTA',
      title: 'Secondary CTA',
      type: 'object',
      fields: [
        defineField({ name: 'label', type: 'string' }),
        defineField({ name: 'link', type: 'string' }),
      ],
    }),
    defineField({
      name: 'accentColor',
      title: 'Accent Color',
      type: 'string',
      description: 'Optional hex code to override the default gold accent',
    }),
    defineField({
      name: 'isCtaCard',
      title: 'Is CTA Card?',
      type: 'boolean',
      description: 'If true, this card will use the strong conversion styling.',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'image',
    },
  },
})
