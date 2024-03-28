import { defineType} from 'sanity'

export const productType = defineType({
    name: 'product',
    title: 'Product',
    type: 'document',
    fields: [
      {
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
      },
      { 
        name: 'slug',
        title: 'Slug',
        type: 'slug',
        options: {
          source: 'name',
          maxLength: 90,
        }
      },
      { 
        name: 'price',
        title: 'Price',
        type: 'number',
      },
      { 
        name: 'details',
        title: 'Details',
        type: 'string',
      },
      { 
        name: 'highlight',
        title: 'Highlight',
        type: 'boolean',
      },
      { 
        name: 'inStock',
        title: 'In-Stock',
        type: 'boolean',
      },
      {
        name: 'categories',
        title: 'Categories',
        type: 'array',
        of: [{ type: 'string' }],
        options: {
          layout: 'tags'
        }
      },
      // New field for tracking purchases
      {
          name: 'bought',
          title: 'Bought',
          type: 'array',
          of: [{
              type: 'object',
              fields: [
                  { name: 'amount', title: 'Amount', type: 'number' },
                  { name: 'date', title: 'Date', type: 'datetime' }
              ]
          }]
      }
    ]
  })