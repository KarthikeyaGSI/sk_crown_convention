import { defineType, defineField, defineArrayMember } from 'sanity'
import { CogIcon } from '@sanity/icons'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      description: 'The light/default logo for the website',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'darkLogo',
      title: 'Dark Logo',
      type: 'image',
      description: 'The dark logo for light backgrounds',
    }),
    defineField({
      name: 'favicon',
      title: 'Favicon',
      type: 'image',
      description: 'Website favicon (ico or png)',
    }),
    defineField({
      name: 'loadingLogo',
      title: 'Loading Screen Logo',
      type: 'image',
      description: 'Logo displayed during the website loading animation',
    }),
    defineField({
      name: 'navLinks',
      title: 'Navigation Menu Links',
      type: 'array',
      description: 'Define the main navigation links in the header',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'navLink',
          title: 'Navigation Link',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'string',
              description: 'e.g. /about, /gallery, or external link',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'openInNewTab',
              title: 'Open In New Tab',
              type: 'boolean',
              initialValue: false,
            }),
            defineField({
              name: 'order',
              title: 'Display Order',
              type: 'number',
              initialValue: 0,
            }),
          ],
        }),
      ],
      validation: (Rule) => Rule.unique(),
    }),
    defineField({
      name: 'footerQuickLinks',
      title: 'Footer Quick Links',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'label', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'url', type: 'string', validation: (Rule) => Rule.required() }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'copyrightText',
      title: 'Copyright Text',
      type: 'string',
      description: 'e.g. © 2026 SK Crown Convention. All Rights Reserved.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'developerCredit',
      title: 'Developer Credit',
      type: 'object',
      fields: [
        defineField({ name: 'text', type: 'string', description: 'e.g. Powered by MarketingKo Labs' }),
        defineField({ name: 'url', type: 'string', description: 'Link to developer website' }),
      ],
    }),
  ],
})
