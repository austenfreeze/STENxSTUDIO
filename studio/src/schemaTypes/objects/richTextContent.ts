// studio/src/objects/richTextContent.ts (example)
import { defineField, defineType } from 'sanity';

export const richTextContent = defineType({
  name: 'richTextContent',
  title: 'Rich Text Content',
  type: 'array',
  of: [
    { type: 'block' }, // Standard Portable Text blocks
    // ... other types you allow in your rich text
    { type: 'researchCitation' }, // <--- THIS IS THE CORRECT WAY TO REFERENCE YOUR DEFINED RESEARCHCITATION TYPE
    { type: 'pullQuote' },       // <--- AND THIS IS FOR PULLQUOTE
  ],
});