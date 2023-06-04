import { client } from "@/lib/client";

export default async function handler(req, res) {
  // Destructure the pieces of our request
  const {orderId,customerAddress,products,totalPrice } =
    req.body;

  try {
    // Use our Client to create a new document in Sanity with an object
    const response = await client.create({
      _type: "orders",
      orderId,customerAddress,totalPrice 
    });

    if (response._id) {
      return res.status(200).json({ message: "Order created successfully" });
    } else {
      throw new Error("Failed to submit order. Server response is missing _id");
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to submit order" });
  }
}
