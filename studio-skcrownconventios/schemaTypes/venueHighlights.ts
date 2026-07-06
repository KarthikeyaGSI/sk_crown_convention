import { defineType, defineField, defineArrayMember } from 'sanity'
import { DashboardIcon } from '@sanity/icons'

export const venueHighlights = defineType({
  name: 'venueHighlights',
  title: 'Venue Highlights',
  type: 'document',
  icon: DashboardIcon,
  fields: [
    defineField({
      name: 'metrics',
      title: 'Metrics',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'value', type: 'string', title: 'Value (e.g. 1500+)' }),
            defineField({ name: 'label', type: 'string', title: 'Label (e.g. Guest Capacity)' }),
          ],
        }),
      ],
    }),
  ],
})
