const { client } = require("@/lib/client");

async function saveOrderToSanity(orderData) {
  try {
    // Initialize the Sanity client with your project configuration
    const sanityClient = client(); // Use the correct initialization method

    // Save the order to Sanity
    const result = await sanityClient.create(orderData).catch((error) => {
      throw new Error(`Failed to save order: ${error.message}`);
    });

    return result;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to save order.");
  }
}

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const {
        name,
        price,
        details,
        productCode,
        category,
        quantity,
        size,
        image,
      } = req.body; // Adjust the fields based on your schema

      // Prepare the order data
      const orderData = {
        _type: "orders", // Match the schema name you defined in Sanity
        name,
        price,
        details,
        productCode,
        category,
        quantity,
        size,
        image,
        // Add other fields based on your schema
      };

      // Save the order to Sanity
      const result = await saveOrderToSanity(orderData);

      res.status(200).json({ success: true, result });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: "Failed to save order." });
    }
  } else {
    res.status(405).json({ success: false, error: "Method not allowed." });
  }
}
