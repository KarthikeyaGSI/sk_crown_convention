import { defineType, defineField } from 'sanity'
import { LinkIcon } from '@sanity/icons'

export const redirect = defineType({
  name: 'redirect',
  title: 'Redirect',
  type: 'document',
  icon: LinkIcon,
  fields: [
    defineField({
      name: 'from',
      title: 'From Path',
      type: 'string',
      description: 'e.g., /old-gallery',
      validation: (Rule) => Rule.required().custom((path: string | undefined) => {
        if (typeof path === 'string' && !path.startsWith('/')) return 'Must start with a /'
        return true
      }),
    }),
    defineField({
      name: 'to',
      title: 'To Path',
      type: 'string',
      description: 'e.g., /gallery',
      validation: (Rule) => Rule.required().custom((path: string | undefined) => {
        if (typeof path === 'string' && !path.startsWith('/')) return 'Must start with a /'
        return true
      }),
    }),
    defineField({
      name: 'permanent',
      title: 'Permanent (301)',
      type: 'boolean',
      initialValue: true,
      description: 'Use 301 for permanent, 302 for temporary.',
    }),
    defineField({
      name: 'enabled',
      title: 'Enabled',
      type: 'boolean',
      initialValue: true,
    }),
  ],
})
