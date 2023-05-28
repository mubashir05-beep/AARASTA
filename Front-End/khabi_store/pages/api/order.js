import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "a3lmxvs9",
  dataset: "production",
  apiVersion: "2023-05-28", // Specify the Sanity API version
  useCdn: false, // Set to true if you want to use the CDN
});

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

      // Save the order to Sanity
      const result = await client.create({
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
