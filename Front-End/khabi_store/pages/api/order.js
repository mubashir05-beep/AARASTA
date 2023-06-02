const { client } = require("@/lib/client");

const createData = async () => {
  const data = {
    _type: 'Orders',
    image: {
      // Add image data here
    },
    name: 'Example Order',
    price: 9.99,
    details: 'Example details',
    productCode: 'ABC123',
    category: 'Example category',
    quantity: true,
    size: ['Small', 'Medium', 'Large'],
  };

  try {
    const response = await client.create(data);
    console.log('Data created:', response);
  } catch (error) {
    console.error('Error creating data:', error);
  }
};

module.exports = createData;
