import { client } from "@/lib/client";
import { sanityClient } from "@/lib/client";

export default async function handler(req, res) {
  // Destructure the pieces of our request
  const { name, price, details, productCode, category, quantity, size } =
    req.body;

  try {
    // Use our Client to create a new document in Sanity with an object
    await client.create({
      _type: "orders",
      name,
      price,
      details,
      productCode,
      category,
      quantity,
      size,
    });

    return res.status(200).json({ message: "Order created successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "not Working" });
  }
}
