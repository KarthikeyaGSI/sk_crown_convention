import { defineType, defineField } from 'sanity'
import { UserIcon } from '@sanity/icons'

export const review = defineType({
  name: 'review',
  title: 'Customer Review',
  type: 'document',
  icon: UserIcon,
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
    defineField({
      name: 'verified',
      title: 'Verified Customer',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'featured',
      title: 'Featured (Show on Homepage)',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'googleReviewUrl',
      title: 'Google Review URL',
      type: 'url',
    }),
    defineField({
      name: 'avatar',
      title: 'Author Avatar',
      type: 'image',
    }),
    defineField({
      name: 'location',
      title: 'Author Location',
      type: 'string',
      description: 'e.g. Bangalore, local guide, etc.',
    }),
  ],
  preview: {
    select: {
      title: 'author',
      subtitle: 'content',
      media: 'avatar',
    },
  },
})
