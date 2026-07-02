import { defineType, defineField } from 'sanity'

export const review = defineType({
  name: 'review',
  title: 'Customer Review',
  type: 'document',
  fields: [
    defineField({
      name: 'author',
      title: 'Author Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'rating',
      title: 'Rating (1-5)',
      type: 'number',
      validation: (Rule) => Rule.required().min(1).max(5),
    }),
    defineField({
      name: 'content',
      title: 'Review Content',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Review Date (e.g. 5 months ago)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
  ],
})
