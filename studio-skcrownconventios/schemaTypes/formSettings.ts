import { defineType, defineField } from 'sanity'
import { EnvelopeIcon } from '@sanity/icons'

export const formSettings = defineType({
  name: 'formSettings',
  title: 'Form Settings',
  type: 'document',
  icon: EnvelopeIcon,
  fields: [
    defineField({
      name: 'successMessage',
      title: 'Success Message',
      type: 'string',
      initialValue: '✓ Booking Request Sent Successfully',
    }),
    defineField({
      name: 'errorMessage',
      title: 'Error Message',
      type: 'string',
      initialValue: 'Failed to send your request. Please try again.',
    }),
    defineField({
      name: 'buttonLabel',
      title: 'Button Label',
      type: 'string',
      initialValue: 'Confirm & Book',
    }),
    defineField({
      name: 'whatsAppTemplate',
      title: 'WhatsApp Template',
      type: 'text',
      description: 'Template for the WhatsApp message. Variables like {{name}}, {{date}} will be replaced.',
    }),
    defineField({
      name: 'emailSubject',
      title: 'Email Subject',
      type: 'string',
      initialValue: 'New Venue Enquiry',
    }),
  ],
})
