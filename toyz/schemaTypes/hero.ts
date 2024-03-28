import { defineType} from 'sanity'

export const heroType = defineType({
    name: 'heroImgs',
    title: 'Hero Images',
    type: 'document',
    fields: [ {
      name: 'image',
      title: 'Image',
      type: 'array',
      of: [{ type: 'image' }],
      options: {
        hotspot: true,
      }
    },
    { 
      name: 'name',
      title: 'Name',
      type: 'string',
    }]
})