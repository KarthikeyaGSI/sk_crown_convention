import { defineType, defineField } from 'sanity'
import { SparklesIcon } from '@sanity/icons'

export const eventType = defineType({
  name: 'eventType',
  title: 'Event Type',
  type: 'document',
  icon: SparklesIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Event Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'e.g., Wedding, Haldi, Corporate Conference',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
    }),
  ],
})
