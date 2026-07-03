import { defineType, defineField } from 'sanity'
import { UserIcon } from '@sanity/icons'

export const contactSettings = defineType({
  name: 'contactSettings',
  title: 'Contact Settings',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'whatsApp',
      title: 'WhatsApp Link / Number',
      type: 'string',
      description: 'e.g., https://wa.me/917070709661 or direct phone number',
    }),
    defineField({
      name: 'email',
      title: 'Email Address',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'address',
      title: 'Physical Address',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'googleMapsLink',
      title: 'Google Maps Link',
      type: 'url',
      description: 'The URL for directions on Google Maps',
    }),
    defineField({
      name: 'latitude',
      title: 'Latitude',
      type: 'number',
      description: 'For map pins',
    }),
    defineField({
      name: 'longitude',
      title: 'Longitude',
      type: 'number',
      description: 'For map pins',
    }),
    defineField({
      name: 'openingHours',
      title: 'Opening Hours / Visit Availability',
      type: 'string',
      description: 'e.g., Mon - Sun: 9:00 AM - 9:00 PM',
    }),
    defineField({
      name: 'emergencyContact',
      title: 'Emergency Contact / Support Line',
      type: 'string',
    }),
    defineField({
      name: 'instagram',
      title: 'Instagram Profile URL',
      type: 'url',
    }),
    defineField({
      name: 'facebook',
      title: 'Facebook Page URL',
      type: 'url',
    }),
    defineField({
      name: 'youtube',
      title: 'YouTube Channel URL',
      type: 'url',
    }),
    defineField({
      name: 'linkedin',
      title: 'LinkedIn Profile URL',
      type: 'url',
    }),
  ],
})
