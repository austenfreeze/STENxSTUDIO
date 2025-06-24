import {defineField, defineType} from 'sanity'



export const node = defineType({

  name: 'node',

  title: 'Node',

  type: 'document',

  fields: [

    defineField({

      name: 'title',

      title: 'Title',

      type: 'string',

      validation: (Rule) => Rule.required(),

    }),

    defineField({

      name: 'nodeType',

      title: 'Node Type',

      type: 'string',

      options: {

        list: [

          {title: 'Fleeting Thought', value: 'thought'},

          {title: 'Key Event', value: 'event'},

          {title: 'Source/Link', value: 'source'},

          {title: 'Social Media Post', value: 'socialPost'},

          {title: 'Creative Output', value: 'output'},

          {title: 'Book', value: 'book'},



          {title: 'Resource', value: 'resource'},



          {title: 'Person', value: 'person'},        

          {title: 'Post', value: 'post'},



          {title: 'Page', value: 'page'},



          {title: 'Link', value: 'link'},

],

      },

      validation: (Rule) => Rule.required(),

    }),

    defineField({

      name: 'creationDate',

      title: 'Creation Date',

      type: 'datetime',

      validation: (Rule) => Rule.required(),

    }),

    defineField({

      name: 'content',

      title: 'Content',

      type: 'array',

      of: [{type: 'block'}],

    }),

    defineField({

      name: 'connectedNodes',

      title: 'Connected Nodes',

      type: 'array',

      of: [{type: 'reference', to: {type: 'node'}}],

      description: 'Link this node to other related nodes.',

    }),

    defineField({

      name: 'relatedProject',

      title: 'Related Project',

      type: 'reference',

      to: [{type: 'project'}],

    }),

  ],

})

