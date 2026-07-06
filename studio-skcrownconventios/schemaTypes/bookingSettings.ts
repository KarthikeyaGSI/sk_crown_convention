import { defineType, defineField } from 'sanity'
import { CalendarIcon } from '@sanity/icons'

export const bookingSettings = defineType({
  name: 'bookingSettings',
  title: 'Booking Settings',
  type: 'document',
  icon: CalendarIcon,
  fields: [
    defineField({
      name: 'enabled',
      title: 'Booking Enabled',
      type: 'boolean',
      initialValue: true,
      description: 'Toggle this off to temporarily disable booking requests across the site.',
    }),
    defineField({
      name: 'message',
      title: 'Status Message',
      type: 'string',
      description: 'Message displayed when bookings are disabled (e.g., "Bookings are temporarily closed for renovation").',
      hidden: ({ document }) => !!document?.enabled,
    }),
    defineField({
      name: 'availableSlots',
      title: 'Available Booking Slots',
      type: 'array',
      of: [{ type: 'string' }],
      initialValue: ['Morning', 'Evening', 'Full Day'],
      description: 'List of slots users can choose from. You can add or remove slots here.',
    }),
    defineField({
      name: 'guestCountOptions',
      title: 'Guest Count Options',
      type: 'array',
      of: [{ type: 'string' }],
      initialValue: [
        'Below 100',
        '100–250',
        '250–500',
        '500–750',
        '750–1000',
        '1000–1500',
        '1500–2000',
        'More than 2000'
      ],
      description: 'List of guest count ranges users can select from.',
    }),
  ],
})
