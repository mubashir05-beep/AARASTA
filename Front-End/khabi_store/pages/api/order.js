// API endpoint handler
import { client } from "@/lib/client";

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

      // Initialize the Sanity client with your project configuration
      // Replace the commented line below with your actual client initialization
      const client = sanityClient({
        projectId: 'a3lmxvs9',
        dataset: 'production',
        apiVersion: '2023-05-01',
        useCdn: true,
        token: process.env.NEXT_PUBLIC_SANITY_TOKEN
      });

      // Save the order to Sanity
      const result = await client.create({
        _type: "orders", // Match the schema name you defined in Sanity
        name: "John Doe",
        price: 9.99,
        details: "Dummy details",
        productCode: "ABC123",
        category: "Dummy category",
        quantity: 1,
        size: "Large",
        image: "dummy-image-url",
        // Add other fields based on your schema
      });

      res.status(200).json({ success: true, result });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: "Failed to save order." });
    }
  } else {
    res.status(405).json({ success: false, error: "Method not allowed." });
  }
}
