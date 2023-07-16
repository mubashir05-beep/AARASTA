// pages/api/send-email.js

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.NEXT_GMAIL_NAME,
    pass: process.env.NEXT_GMAIL_AARASTA_PASS,
  },
});
function generatePakistanDate() {
  var date = new Date();
  var offset = date.getTimezoneOffset();
  var pakistanOffset = 300; // Offset for Pakistan timezone in minutes (+5 hours * 60 minutes)

  // Adjust the date by adding the offset
  date.setMinutes(date.getMinutes() + offset + pakistanOffset);

  var year = date.getFullYear();
  var month = String(date.getMonth() + 1).padStart(2, "0");
  var day = String(date.getDate()).padStart(2, "0");

  return year + "-" + month + "-" + day;
}
let date = generatePakistanDate();
export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method Not Allowed" });
    return;
  }
  // Tesiting
  const {
   name,email,message
  } = req.body;

  try {
    const mailOptions = {
        from: "Customer Message",
        to: "mubashir.munir2020@gmail.com",
        subject: "New Message!",
        html: `
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>New Message from Contact Form</title>
          </head>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; margin: 0; padding: 0; background-color: #f2f2f2;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
              <h2 style="color: #333; text-align: center;">New Message from Contact Form</h2>
              <p style="font-size: 16px; color: #333;">Dear Admin,</p>
              <p style="font-size: 16px; color: #333;">You have received a new message from the contact form on your website. Please find the details below:</p>
              <ul style="list-style: none; padding: 0;">
                <li style="font-size: 16px; color: #333;">Name: ${name}</li>
                <li style="font-size: 16px; color: #333;">Email: ${email}</li>
                <li style="font-size: 16px; color: #333;">Message: ${message}</li>
              </ul>
              <p style="font-size: 16px; color: #333;">Please respond to the customer as soon as possible and address their query or request.</p>
              <p style="font-size: 16px; color: #333;">Thank you for your prompt attention to this matter.</p>
            </div>
          </body>
          </html>
        `,
      };
      
      

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Error sending email" });
  }
}
