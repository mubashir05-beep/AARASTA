// pages/api/send-email.js

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service:'gmail',
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.NEXT_GMAIL_NAME,
    pass: process.env.NEXT_GMAIL_KHAABI_PASS,
  },
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method Not Allowed" });
    return;
  }

  const { email, name, address, products } = req.body;

  try {
    const mailOptions = {
      from: "Excited User <exciteduser@example.com>",
      to: 'mubashir.munir2020@gmail.com',
      subject: "Hello",
      html: `
        <h1>Hello ${name},</h1>

        <p>Thank you for your order. Here are the details:</p>

        <ul>
          ${products
            .map(
              (product) => `
              <li>
                <strong>${product.name}</strong>
                <p>Price: ${product.price}</p>
                <p>Quantity: ${product.quantity}</p>
                <p>Size: ${product.size}</p>
                <img src=${product.imgSrc} alt="${product.name}" />
              </li>
            `
            )
            .join("")}
        </ul>

        <p>Regards,<br>Excited User</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Error sending email" });
  }
}
