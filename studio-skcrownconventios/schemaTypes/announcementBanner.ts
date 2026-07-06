import { defineType, defineField } from 'sanity'
import { WarningOutlineIcon } from '@sanity/icons'

export const announcementBanner = defineType({
  name: 'announcementBanner',
  title: 'Announcement Banner',
  type: 'document',
  icon: WarningOutlineIcon,
  fields: [
    defineField({
      name: 'enabled',
      title: 'Enabled',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'message',
      title: 'Message',
      type: 'string',
      description: 'e.g., Bookings filling fast for December weddings.',
    }),
  ],
})
