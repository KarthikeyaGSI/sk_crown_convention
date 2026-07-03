import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './schemaTypes'
import { structure } from './structure'

const SINGLETON_TYPES = ['siteSettings', 'homepage', 'contactSettings', 'seoSettings']

export default defineConfig({
  name: 'default',
  title: 'SK Crown Convention',

  projectId: 'ohlfeqiz',
  dataset: 'production',

  plugins: [
    structureTool({
      structure,
    }),
  ],

  schema: {
    types: schemaTypes,
    // Filter out singleton types from being created dynamically via the "New document" menu
    templates: (templates) =>
      templates.filter((template) => !SINGLETON_TYPES.includes(template.schemaType)),
  },

  document: {
    // For singleton types, restrict actions to only publish, discard changes, and restore
    actions: (input, context) => {
      return SINGLETON_TYPES.includes(context.schemaType)
        ? input.filter(({ action }) => action && ['publish', 'discardChanges', 'restore'].includes(action))
        : input
    },
  },
})
