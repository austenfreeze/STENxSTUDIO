import {defineAssetAspect, defineField} from 'sanity'

export default defineAssetAspect({
  name: 'copyright',
  title: 'copyright',
  type: 'object',
  fields: [
    defineField({
      name: 'copyrightHolder',
      title: 'Copyright Holder',
      type: 'string',
    }),
    defineField({
      name: 'copyrightDate',
      title: 'Date',
      type: 'date',
    }),
  ],
})