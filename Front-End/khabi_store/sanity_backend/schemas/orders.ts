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
              type: 'reference',
              to: [{ type: 'product' }], // Reference to a separate "Product" schema
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
              title: 'quantity',
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
