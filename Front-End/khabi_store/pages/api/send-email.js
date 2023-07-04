// pages/api/send-email.js

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.NEXT_GMAIL_NAME,
    pass: process.env.NEXT_GMAIL_KHAABI_PASS,
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
  const { email, name, address, products, zip, city, Id, tlPrice, tlQty } =
    req.body;

  try {
    const mailOptions = {
      from: "Khaabi",
      to: email,
      subject: "Order Confirmation",
      html: `     
  <div
  id="__react-email-preview"
  style="
    display: none;
    overflow: hidden;
    line-height: 1px;
    opacity: 0;
    max-height: 0;
    max-width: 0;
  "
>
  Get your order summary, estimated delivery date and more
  <div>
     ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿
  </div>
</div>

<body
  style="
    background-color: #ffffff;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
      Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
  "
>
  <table
    align="center"
    role="presentation"
    cellspacing="0"
    cellpadding="0"
    border="0"
    width="100%"
    style="
      max-width: 37.5em;
      margin: 10px auto;
      width: 600px;
      border: 1px solid #e5e5e5;
    "
  >
    <tr style="width: 100%">
      <td>
        <table
          style="padding: 40px 74px; text-align: center"
          align="center"
          border="0"
          cellpadding="0"
          cellspacing="0"
          role="presentation"
          width="100%"
        >
          <tbody>
            <tr>
              <td>
                <p
                  style="
                    font-size: 32px;
                    color: #5c5c5c;
                    letter-spacing: 7px;
                    line-height: 1.3;
                    margin: 16px 0;
                    font-weight: 700;
                    text-align: center;
                  "
                >
                  KHAABI
                </p>

                <h1
                  style="
                    font-size: 26px;
                    line-height: 1.3;
                    font-weight: 700;
                    text-align: center;
                    letter-spacing: -1px;
                  "
                >
                  It&#x27;s On Its Way.
                </h1>
                <p
                  style="
                    font-size: 14px;
                    line-height: 2;
                    margin: 0;
                    color: #747474;
                    font-weight: 500;
                  "
                >
                  You order&#x27;s is on its way.
                </p>
                <p
                  style="
                    font-size: 14px;
                    line-height: 2;
                    margin: 0;
                    color: #747474;
                    font-weight: 500;
                    margin-top: 24px;
                  "
                >
                Thank you for choosing KHAABI! Payment will be collected upon delivery. Don't worry, our dedicated delivery team will confirm all the details and contact you shortly. Please make sure to provide a reachable daytime contact number. Exciting news: your order is currently being prepared for delivery! This email serves as a confirmation and includes essential delivery information.Once again thanks for choosing us!
                </p>
             
              </td>
            </tr>
          </tbody>
        </table>
        <hr
          style="
            width: 100%;
            border: none;
            border-top: 1px solid #eaeaea;
            border-color: #e5e5e5;
            margin: 0;
          "
        />
        <table
          style="
            padding-left: 40px;
            padding-right: 40px;
            padding-top: 22px;
            padding-bottom: 22px;
          "
          align="center"
          border="0"
          cellpadding="0"
          cellspacing="0"
          role="presentation"
          width="100%"
        >
          <tbody>
            <tr>
              <td>
                <p
                  style="
                    font-size: 15px;
                    line-height: 2;
                    margin: 0;
                    font-weight: bold;
                  "
                >
                  Shipping to: ${name}
                </p>
                <p
                  style="
                    font-size: 14px;
                    line-height: 2;
                    margin: 0;
                    color: #747474;
                    font-weight: 500;
                  "
                >
                  ${address + ", " + city + ", " + zip + "."}
                </p>
              </td>
            </tr>
          </tbody>
        </table>
        <hr
          style="
            width: 100%;
            border: none;
            border-top: 1px solid #eaeaea;
            border-color: #e5e5e5;
            margin: 0;
          "
        />
        <table
          style="
            padding-left: 40px;
            padding-right: 40px;
            padding-top: 40px;
            padding-bottom: 40px;
          "
          align="center"
          border="0"
          cellpadding="0"
          cellspacing="0"
          role="presentation"
          width="100%"
        >
        <ul>
        ${products.map(
          (product) => `
            <div style="display: flex; align-items: center; justify-content: space-between;">
              <div style="position: relative; max-width: 160px; padding-bottom: 12px;">
                <img src="${product.imgSrc}" alt="${product.name}" width="160px" style="display: block; outline: none; border: none; text-decoration: none;" />
              </div>
        
              <div style="padding-left: 22px;">
                <p style="font-size: 14px; line-height: 2; margin: 0; font-weight: 500;">
                  <strong>${product.name}</strong>
                </p>
                <p style="font-size: 14px; line-height: 2; margin: 0; color: #747474; font-weight: 500;">
                  Quantity: ${product.quantity}
                </p>
                <p style="font-size: 14px; line-height: 2; margin: 0; color: #747474; font-weight: 500;">
                  Size: ${product.size}
                </p>
        
                <p style="font-size: 14px; line-height: 2; margin: 0; color: #747474; font-weight: 500;">
                Price: RS ${
                  !product.dis>0 ? `<span>${product.orgPrice} /-</span>` : `<span style="text-decoration: line-through;">
                  ${product.orgPrice}
                </span> ${product.price}`
                }
                </p>

                ${product.discount ? `<p style="font-size: 14px; line-height: 2; margin: 0; color: #747474; font-weight: 500;">Discount: ${product.discount}%</p>` : ''}
              </div>
            </div>
          `
        ).join("")}
        
      </ul>
        </table>
        <hr
          style="
            width: 100%;
            border: none;
            border-top: 1px solid #eaeaea;
            border-color: #e5e5e5;
            margin: 0;
          "
        />
      
        
        <hr
          style="
            width: 100%;
            border: none;
            border-top: 1px solid #eaeaea;
            border-color: #e5e5e5;
            margin: 0;
          "
        />
        <table
          style="
            padding-left: 40px;
            padding-right: 40px;
            padding-top: 22px;
            padding-bottom: 22px;
          "
          align="center"
          border="0"
          cellpadding="0"
          cellspacing="0"
          role="presentation"
          width="100%"
        >
        <tbody><tr>
        <td> <table
        width="100%"
        style="display: inline-flex"
        align="center"
        role="presentation"
        cellspacing="0"
        cellpadding="0"
        border="0"
      >
        <tbody style="width: 100%">
          <tr style="width: 100%">
            <td style="width: 170px">
              <p
                style="
                  font-size: 14px;
                  line-height: 2;
                  margin: 0;
                  font-weight: bold;
                "
              >
               Total Price
              </p>
              <p
                style="
                  font-size: 14px;
                  line-height: 1.4;
                  margin: 12px 0 0 0;
                  font-weight: 500;
                  color: #6f6f6f;
                "
              >
               Rs${tlPrice}/-(incl shipping)
              </p>
            </td>
            <td style="width: 170px">
              <p
                style="
                  font-size: 14px;
                  line-height: 2;
                  margin: 0;
                  font-weight: bold;
                "
              >
                Shipping Fee: 
              </p>
              <p
                style="
                  font-size: 14px;
                  line-height: 1.4;
                  margin: 12px 0 0 0;
                  font-weight: 500;
                  color: #6f6f6f;
                "
              >
               Rs 99/-
              </p>
            </td>
            <td>
              <p
                style="
                  font-size: 14px;
                  line-height: 2;
                  margin: 0;
                  font-weight: bold;
                "
              >
              Total Items 
              </p>
              <p
                style="
                  font-size: 14px;
                  line-height: 1.4;
                  margin: 12px 0 0 0;
                  font-weight: 500;
                  color: #6f6f6f;
                "
              >
                ${tlQty}
              </p>
            </td>
          </tr>
        </tbody>
      </table></td>
        </tr></tbody>
          <tbody>
            <tr> 
              <td>
                <table
                  width="100%"
                  style="display: inline-flex"
                  align="center"
                  role="presentation"
                  cellspacing="0"
                  cellpadding="0"
                  border="0"
                >
                  <tbody style="width: 100%">
                    <tr style="width: 100%">
                      <td style="width: 170px">
                        <p
                          style="
                            font-size: 14px;
                            line-height: 2;
                            margin: 0;
                            font-weight: bold;
                          "
                        >
                          Order Number
                        </p>
                        <p
                          style="
                            font-size: 14px;
                            line-height: 1.4;
                            margin: 12px 0 0 0;
                            font-weight: 500;
                            color: #6f6f6f;
                          "
                        >
                          ${Id}
                        </p>
                      </td>
                      <td>
                        <p
                          style="
                            font-size: 14px;
                            line-height: 2;
                            margin: 0;
                            font-weight: bold;
                          "
                        >
                          Order Date
                        </p>
                        <p
                          style="
                            font-size: 14px;
                            line-height: 1.4;
                            margin: 12px 0 0 0;
                            font-weight: 500;
                            color: #6f6f6f;
                          "
                        >
                          ${date}
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
        <hr
          style="
            width: 100%;
            border: none;
            border-top: 1px solid #eaeaea;
            border-color: #e5e5e5;
            margin: 0;
          "
        />
        <table
          style="
            padding-left: 20px;
            padding-right: 20px;
            padding-top: 20px;
            background-color: #f7f7f7;
          "
          align="center"
          border="0"
          cellpadding="0"
          cellspacing="0"
          role="presentation"
          width="100%"
        >
          <tbody>
            <tr>
              <td>
                <table
                  width="100%"
                  style="
                    padding-left: 20px;
                    padding-right: 20px;
                    padding-bottom: 22px;
                  "
                  align="center"
                  role="presentation"
                  cellspacing="0"
                  cellpadding="0"
                  border="0"
                >
                  <tbody style="width: 100%">
                    <tr style="width: 100%">
                      <td>
                        <table
                          width="100%"
                          align="center"
                          role="presentation"
                          cellspacing="0"
                          cellpadding="0"
                          border="0"
                        >
                          <tbody style="width: 100%">
                            <tr style="width: 100%">
                              <td style="width: 16px">
                                <img
                                  src="https://react-email-demo-ijnnx5hul-resend.vercel.app/static/nike-phone.png"
                                  width="16px"
                                  height="26px"
                                  style="
                                    display: block;
                                    outline: none;
                                    border: none;
                                    text-decoration: none;
                                    padding-right: 14px;
                                  "
                                />
                              </td>
                              <td>
                                <p
                                  style="
                                    font-size: 13.5px;
                                    line-height: 24px;
                                    margin: 16px 4px;
                                    margin-top: 0;
                                    font-weight: 500;
                                    color: #000;
                                    margin-bottom: 0;
                                  "
                                >
                                  0315-3333333
                                </p>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                      <td>
                        <p
                          style="
                            font-size: 13.5px;
                            line-height: 24px;
                            margin: 16px 0;
                            margin-top: 0;
                            font-weight: 500;
                            color: #000;
                            margin-bottom: 0;
                          "
                        >
                          9am-6pm(GMT+5)
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
        <hr
          style="
            width: 100%;
            border: none;
            border-top: 1px solid #eaeaea;
            border-color: #e5e5e5;
            margin: 0;
          "
        />
        <table
          style="padding-top: 22px; padding-bottom: 22px"
          align="center"
          border="0"
          cellpadding="0"
          cellspacing="0"
          role="presentation"
          width="100%"
        >
          <tbody>
            <tr>
              <td>
                <p
                  style="
                    font-size: 32px;
                    letter-spacing: 7px;
                    line-height: 1.3;
                    margin: 16px 0;
                    font-weight: 700;
                    text-align: center;
                  "
                >
                  KHAABI
                </p>
              </td>
            </tr>
          </tbody>
        </table>
        <hr
          style="
            width: 100%;
            border: none;
            border-top: 1px solid #eaeaea;
            border-color: #e5e5e5;
            margin: 0;
            margin-top: 12px;
          "
        />
        <table
          style="padding-top: 22px; padding-bottom: 22px"
          align="center"
          border="0"
          cellpadding="0"
          cellspacing="0"
          role="presentation"
          width="100%"
        >
          <tbody>
            <tr>
              <td>
                <p
                  style="
                    font-size: 13px;
                    line-height: 24px;
                    margin: 0;
                    color: #afafaf;
                    text-align: center;
                    padding-top: 30px;
                    padding-bottom: 30px;
                  "
                >
                  Please contact us if you have any questions. (If you reply
                  to this email, we won&#x27;t be able to see it.)
                </p>
                <p
                  style="
                    font-size: 13px;
                    line-height: 24px;
                    margin: 0;
                    color: #afafaf;
                    text-align: center;
                  "
                >
                  © 2023 Khaabi, Inc. All Rights Reserved.
                </p>
                <p
                  style="
                    font-size: 13px;
                    line-height: 24px;
                    margin: 0;
                    color: #afafaf;
                    text-align: center;
                  "
                >
                  Khaabi, Zia Musjid, New Shakrial, Islamabad 44000,
                  Pakistan.
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </table>
  </div
</body>
</html>`
    
    };
    const ownerMailOptions = {
      from: "Khaabi",
      to: "mubashir.munir2020@gmail.com", // replace with the owner's email address
      subject: "New Order Received",
      html: `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
      </head>
      <body>
           
      <div
      id="__react-email-preview"
      style="
        display: none;
        overflow: hidden;
        line-height: 1px;
        opacity: 0;
        max-height: 0;
        max-width: 0;
      "
      >
      Get your order summary, estimated delivery date and more
      <div>
         ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿
      </div>
      </div>
      
      <body
      style="
        background-color: #ffffff;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
          Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
      "
      >
      <table
        align="center"
        role="presentation"
        cellspacing="0"
        cellpadding="0"
        border="0"
        width="100%"
        style="
          max-width: 37.5em;
          margin: 10px auto;
          width: 600px;
          border: 1px solid #e5e5e5;
        "
      >
        <tr style="width: 100%">
          <td>
            <table
              style="padding: 40px 74px; text-align: center"
              align="center"
              border="0"
              cellpadding="0"
              cellspacing="0"
              role="presentation"
              width="100%"
            >
              <tbody>
                <tr>
                  <td>
                    <p
                      style="
                        font-size: 32px;
                        color: #5c5c5c;
                        letter-spacing: 7px;
                        line-height: 1.3;
                        margin: 16px 0;
                        font-weight: 700;
                        text-align: center;
                      "
                    >
                      KHAABI
                    </p>
      
                    <h1
                      style="
                        font-size: 26px;
                        line-height: 1.3;
                        font-weight: 700;
                        text-align: center;
                        letter-spacing: -1px;
                      "
                    >
                    You have recived an order.
                    </h1>
                  
                 
                  </td>
                </tr>
              </tbody>
            </table>
            <hr
              style="
                width: 100%;
                border: none;
                border-top: 1px solid #eaeaea;
                border-color: #e5e5e5;
                margin: 0;
              "
            />
            <table
              style="
                padding-left: 40px;
                padding-right: 40px;
                padding-top: 22px;
                padding-bottom: 22px;
              "
              align="center"
              border="0"
              cellpadding="0"
              cellspacing="0"
              role="presentation"
              width="100%"
            >
              <tbody>
                <tr>
                  <td>
                    <p
                      style="
                        font-size: 15px;
                        line-height: 2;
                        margin: 0;
                        font-weight: bold;
                      "
                    >
                     Customer Info: ${name}
                    </p>
                    <p
                      style="
                        font-size: 14px;
                        line-height: 2;
                        margin: 0;
                        color: #747474;
                        font-weight: 500;
                      "
                    >
                      ${address + ", " + city + ", " + zip + "."}
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
            <hr
              style="
                width: 100%;
                border: none;
                border-top: 1px solid #eaeaea;
                border-color: #e5e5e5;
                margin: 0;
              "
            />
            <table
              style="
                padding-left: 40px;
                padding-right: 40px;
                padding-top: 40px;
                padding-bottom: 40px;
              "
              align="center"
              border="0"
              cellpadding="0"
              cellspacing="0"
              role="presentation"
              width="100%"
            >
            <ul>
            ${products.map(
              (product) => `
                <div style="display: flex; align-items: center; justify-content: space-between;">
                  <div style="position: relative; max-width: 160px; padding-bottom: 12px;">
                    <img src="${product.imgSrc}" alt="${product.name}" width="160px" style="display: block; outline: none; border: none; text-decoration: none;" />
                  </div>
            
                  <div style="padding-left: 22px;">
                    <p style="font-size: 14px; line-height: 2; margin: 0; font-weight: 500;">
                      <strong>${product.name}</strong>
                    </p>
                    <p style="font-size: 14px; line-height: 2; margin: 0; color: #747474; font-weight: 500;">
                      Quantity: ${product.quantity}
                    </p>
                    <p style="font-size: 14px; line-height: 2; margin: 0; color: #747474; font-weight: 500;">
                      Size: ${product.size}
                    </p>
            
                    <p style="font-size: 14px; line-height: 2; margin: 0; color: #747474; font-weight: 500;">
                    Price: RS ${
                      !product.dis>0 ? `<span>${product.orgPrice} /-</span>` : `<span style="text-decoration: line-through;">
                      ${product.orgPrice}
                    </span> ${product.price}`
                    }
                    </p>

                    ${product.discount ? `<p style="font-size: 14px; line-height: 2; margin: 0; color: #747474; font-weight: 500;">Discount: ${product.discount}%</p>` : ''}
                  </div>
                </div>
              `
            ).join("")}
            
            
          </ul>
            </table>
            <hr
              style="
                width: 100%;
                border: none;
                border-top: 1px solid #eaeaea;
                border-color: #e5e5e5;
                margin: 0;
              "
            />
          
            
            <hr
              style="
                width: 100%;
                border: none;
                border-top: 1px solid #eaeaea;
                border-color: #e5e5e5;
                margin: 0;
              "
            />
            <table
              style="
                padding-left: 40px;
                padding-right: 40px;
                padding-top: 22px;
                padding-bottom: 22px;
              "
              align="center"
              border="0"
              cellpadding="0"
              cellspacing="0"
              role="presentation"
              width="100%"
            >
            <tbody><tr>
            <td> <table
            width="100%"
            style="display: inline-flex"
            align="center"
            role="presentation"
            cellspacing="0"
            cellpadding="0"
            border="0"
          >
            <tbody style="width: 100%">
              <tr style="width: 100%">
                <td style="width: 170px">
                  <p
                    style="
                      font-size: 14px;
                      line-height: 2;
                      margin: 0;
                      font-weight: bold;
                    "
                  >
                   Total Price
                  </p>
                  <p
                    style="
                      font-size: 14px;
                      line-height: 1.4;
                      margin: 12px 0 0 0;
                      font-weight: 500;
                      color: #6f6f6f;
                    "
                  >
                   Rs${tlPrice}/-(incl shipping)
                  </p>
                </td>
                <td>
                  <p
                    style="
                      font-size: 14px;
                      line-height: 2;
                      margin: 0;
                      font-weight: bold;
                    "
                  >
                  Total Items 
                  </p>
                  <p
                    style="
                      font-size: 14px;
                      line-height: 1.4;
                      margin: 12px 0 0 0;
                      font-weight: 500;
                      color: #6f6f6f;
                    "
                  >
                    ${tlQty}
                  </p>
                </td>
              </tr>
            </tbody>
          </table></td>
            </tr></tbody>
              <tbody>
                <tr> 
                  <td>
                    <table
                      width="100%"
                      style="display: inline-flex"
                      align="center"
                      role="presentation"
                      cellspacing="0"
                      cellpadding="0"
                      border="0"
                    >
                      <tbody style="width: 100%">
                        <tr style="width: 100%">
                          <td style="width: 170px">
                            <p
                              style="
                                font-size: 14px;
                                line-height: 2;
                                margin: 0;
                                font-weight: bold;
                              "
                            >
                              Order Number
                            </p>
                            <p
                              style="
                                font-size: 14px;
                                line-height: 1.4;
                                margin: 12px 0 0 0;
                                font-weight: 500;
                                color: #6f6f6f;
                              "
                            >
                              ${Id}
                            </p>
                          </td>
                          <td>
                            <p
                              style="
                                font-size: 14px;
                                line-height: 2;
                                margin: 0;
                                font-weight: bold;
                              "
                            >
                              Order Date
                            </p>
                            <p
                              style="
                                font-size: 14px;
                                line-height: 1.4;
                                margin: 12px 0 0 0;
                                font-weight: 500;
                                color: #6f6f6f;
                              "
                            >
                              ${date}
                            </p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
            <hr
              style="
                width: 100%;
                border: none;
                border-top: 1px solid #eaeaea;
                border-color: #e5e5e5;
                margin: 0;
              "
            />
            <table
              style="
                padding-left: 20px;
                padding-right: 20px;
                padding-top: 20px;
                background-color: #f7f7f7;
              "
              align="center"
              border="0"
              cellpadding="0"
              cellspacing="0"
              role="presentation"
              width="100%"
            >
              <tbody>
                <tr>
                  <td>
                    <table
                      width="100%"
                      style="
                        padding-left: 20px;
                        padding-right: 20px;
                        padding-bottom: 22px;
                      "
                      align="center"
                      role="presentation"
                      cellspacing="0"
                      cellpadding="0"
                      border="0"
                    >
                      <tbody style="width: 100%">
                        <tr style="width: 100%">
                          <td>
                        
                          </td>
                          <td>
                            <p
                              style="
                                font-size: 13.5px;
                                line-height: 24px;
                                margin: 16px 0;
                                margin-top: 0;
                                font-weight: 500;
                                color: #000;
                                margin-bottom: 0;
                              "
                            >
                            Check the Studio app for more info!
                            </p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
            <hr
              style="
                width: 100%;
                border: none;
                border-top: 1px solid #eaeaea;
                border-color: #e5e5e5;
                margin: 0;
              "
            />
            <table
              style="padding-top: 22px; padding-bottom: 22px"
              align="center"
              border="0"
              cellpadding="0"
              cellspacing="0"
              role="presentation"
              width="100%"
            >
              <tbody>
                <tr>
                  <td>
                    <p
                      style="
                        font-size: 32px;
                        letter-spacing: 7px;
                        line-height: 1.3;
                        margin: 16px 0;
                        font-weight: 700;
                        text-align: center;
                      "
                    >
                      KHAABI
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
            <hr
              style="
                width: 100%;
                border: none;
                border-top: 1px solid #eaeaea;
                border-color: #e5e5e5;
                margin: 0;
                margin-top: 12px;
              "
            />
            <table
              style="padding-top: 22px; padding-bottom: 22px"
              align="center"
              border="0"
              cellpadding="0"
              cellspacing="0"
              role="presentation"
              width="100%"
            >
              
            </table>
          </td>
        </tr>
      </table>
          </div>
      </body>
      </html>`, // owner email content
    };
    await transporter.sendMail(mailOptions);
    await transporter.sendMail(ownerMailOptions);
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Error sending email" });
  }
}
