export default {
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
        name: 'discount',
        title: 'Discount',
        type: 'number',
      },
      { 
        name: 'details',
        title: 'Details',
        type: 'string',
      },
      { 
        name: 'productCode',
        title: 'ProductCode',
        type: 'string',
      },
      {
        name:'featured',
        title:'Featured',
        type: 'boolean'
      },
      {
        name:'category',
        title:'Category',
        type:'string'
      },
      {
        name:'quantity',
        title:'Quantity',
        type: 'boolean'
      },
      {
        name: 'Size',
        type: 'array',
        of: [{ 
          type: 'string',
          title: 'My String',
          description: 'Enter a string value'
        }]
      },
      {
        name:'darazLink',
        title:'DarazLink',
        type:'string'
      },
    ]
  } as const;