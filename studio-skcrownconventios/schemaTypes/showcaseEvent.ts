import { defineType, defineField, defineArrayMember } from 'sanity'
import { CalendarIcon } from '@sanity/icons'

export const showcaseEvent = defineType({
  name: 'showcaseEvent',
  title: 'Showcase Event',
  type: 'document',
  icon: CalendarIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Event Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Event Description',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Main Event Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'gallery',
      title: 'Event Gallery Images',
      type: 'array',
      description: 'More images from this event',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'galleryImage' }],
        }),
      ],
    }),
    defineField({
      name: 'theme',
      title: 'Theme / Style Decor',
      type: 'string',
      description: 'e.g. Royal Gold, Pastel Floral, Traditional South Indian',
    }),
    defineField({
      name: 'capacity',
      title: 'Guest Count / Capacity',
      type: 'string',
      description: 'e.g. 500 Guests, 1200 Guests',
    }),
    defineField({
      name: 'featured',
      title: 'Featured Event',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'theme',
      media: 'image',
    },
  },
})
