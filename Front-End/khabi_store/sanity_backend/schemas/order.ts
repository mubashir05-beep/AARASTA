const order = {
    name: 'orders',
    title: 'Orders',
    type: 'document',
    fields: [
      {
        name: 'image',
        title: 'Image',
        type: 'image',
        options: {
          hotspot: true,
        },
      },
      {
        name: 'name',
        title: 'Name',
        type: 'string',
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
        name: 'productCode',
        title: 'ProductCode',
        type: 'string',
      },
      {
        name: 'category',
        title: 'Category',
        type: 'string',
      },
      {
        name: 'quantity',
        title: 'Quantity',
        type: 'boolean',
      },
      {
        name: 'size',
        title: 'Size',
        type: 'array',
        of: [
          {
            type: 'string',
            title: 'My String',
            description: 'Enter a string value',
          },
        ],
      },
    ],
  };
  
  export default order;
  