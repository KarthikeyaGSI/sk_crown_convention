import { defineType, defineField } from 'sanity'

export const showcaseEvent = defineType({
  name: 'showcaseEvent',
  title: 'Showcase Event',
  type: 'document',
  fields: [
    defineField({
      name: 'image',
      title: 'Event Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
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
  ],
})
