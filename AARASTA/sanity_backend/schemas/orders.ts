// schema.js

const orders = {
  name: 'orders',
  title: 'Order',
  type: 'document',
  fields: [
    {
      name: 'orderId',
      title: 'Order ID',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'customerName',
      title: 'Customer Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'customerContactNumber',
      title: 'Customer Number',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'customerContactMail',
      title: 'Customer Email',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'customerAddress',
      title: 'Customer Address',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'products',
      title: 'Products',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'product',
              title: 'Product',
              type: 'string',
              
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'size',
              title: 'Size',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'price',
              title: 'Price',
              type: 'number',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'quantity',
              title: 'Quantity',
              type: 'number',
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'totalPrice',
      title: 'Total Price',
      type: 'number',
      validation: (Rule) => Rule.required(),
    },
  ],
};
export default orders;
