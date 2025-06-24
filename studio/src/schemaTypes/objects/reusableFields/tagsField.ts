// schemas/objects/reusableFields/tagsField.ts
import {defineField} from 'sanity'

/**
 * This is a reusable field definition for the 'sanity-plugin-tags'.
 * Import this object into any schema where you need a tagging field
 * to ensure consistent behavior across your studio.
 *
 * How to use:
 * 1. Import it into your schema file:
 * `import {tagsField} from './path/to/tagsField'`
 *
 * 2. Add it to the `fields` array of your schema:
 * `fields: [ ..., tagsField, ... ]`
 */
export const tagsField = defineField({
  name: 'tags',
  title: 'Tags',
  type: 'tags', // Use the 'tags' type from the plugin for multi-select
  options: {
    // This is the magic option. It tells the plugin to look at all other
    // fields named 'tags' in your dataset to create the autocomplete list.
    includeFromRelated: 'tags',

    // This hook automatically formats new tags when you create them.
    // It makes the "value" lowercase and replaces spaces/special characters
    // with a hyphen, which is best practice for clean data.
    onCreate: (value) => ({
      label: value,
      value: value.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, ''),
    }),
  },
  description: 'Add relevant keywords to improve searchability. New tags are automatically formatted.',
})
