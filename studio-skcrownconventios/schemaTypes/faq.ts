// FAQ schema for Sanity CMS
import { defineType, defineField } from 'sanity';
import { HelpCircleIcon } from '@sanity/icons';

export const faq = defineType({
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  icon: HelpCircleIcon,
  fields: [
    defineField({
      name: 'question',
      title: 'Question',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'answer',
      title: 'Answer',
      type: 'text',
      rows: 6,
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
    })
  ]
});
