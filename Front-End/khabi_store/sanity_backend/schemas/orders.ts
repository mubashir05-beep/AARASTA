// Schema definition
const orders = {
  name: 'orders',
  title: 'Orders',
  type: 'document',

    fields: [
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
        type: 'text',
      },
      {
        name: 'productCode',
        title: 'Product Code',
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
        type: 'number',
      },
      {
        name: 'size',
        title: 'Size',
        type: 'string',
      },
    ],
  };
  

export default orders;
