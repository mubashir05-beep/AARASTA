import React from 'react';

const CustomerMail = (email, name, address, products, zip, city, Id, tlPrice, tlQty) => {
  return `
    <div id="__react-email-preview" style="display: none; overflow: hidden; line-height: 1px; opacity: 0; max-height: 0; max-width: 0;">
      Get your order summary, estimated delivery date and more
      <div></div>
    </div>
    <body style="background-color: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;">
      <table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 37.5em; margin: 10px auto; width: 600px; border: 1px solid #e5e5e5;">
        <tr style="width: 100%">
          <td>
            <table style="padding: 40px 74px; text-align: center" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
              <tbody>
                <tr>
                  <td>
                    <p style="font-size: 32px; color: #5c5c5c; letter-spacing: 7px; line-height: 1.3; margin: 16px 0; font-weight: 700; text-align: center;">KHAABI</p>
                    <h1 style="font-size: 26px; line-height: 1.3; font-weight: 700; text-align: center; letter-spacing: -1px;">It's On Its Way.</h1>
                    <p style="font-size: 14px; line-height: 2; margin: 0; color: #747474; font-weight: 500;">Your order's is on its way.</p>
                    <p style="font-size: 14px; line-height: 2; margin: 0; color: #747474; font-weight: 500; margin-top: 24px;">Thank you for choosing KHAABI! Payment will be collected upon delivery. Don't worry, our dedicated delivery team will confirm all the details and contact you shortly. Please make sure to provide a reachable daytime contact number. Exciting news: your order is currently being prepared for delivery! This email serves as a confirmation and includes essential delivery information. Once again thanks for choosing us!</p>
                  </td>
                </tr>
              </tbody>
            </table>
            <hr style="width: 100%; border-top: 1px solid #e5e5e5;">
            <table style="padding: 0 74px 40px; text-align: center;" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
              <tbody>
                <tr>
                  <td>
                    <p style="font-size: 22px; color: #5c5c5c; letter-spacing: 1px; line-height: 1.3; margin: 16px 0; font-weight: 700; text-align: center;">Order Summary</p>
                    <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse: collapse; width: 100%; margin-bottom: 32px;">
                      <thead>
                        <tr>
                          <th style="padding-bottom: 16px; border-bottom: 1px solid #e5e5e5; text-align: left;">Product</th>
                          <th style="padding-bottom: 16px; border-bottom: 1px solid #e5e5e5; text-align: left;">Quantity</th>
                          <th style="padding-bottom: 16px; border-bottom: 1px solid #e5e5e5; text-align: left;">Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        ${products
                          .map(
                            (product) => `
                              <tr>
                                <td style="padding: 16px 0;">${product.name}</td>
                                <td style="padding: 16px 0;">${product.quantity}</td>
                                <td style="padding: 16px 0;">$${product.price}</td>
                              </tr>
                            `
                          )
                          .join('')}
                      </tbody>
                      <tfoot>
                        <tr>
                          <td style="padding: 16px 0; border-top: 1px solid #e5e5e5;">Total:</td>
                          <td style="padding: 16px 0; border-top: 1px solid #e5e5e5;">${tlQty}</td>
                          <td style="padding: 16px 0; border-top: 1px solid #e5e5e5;">$${tlPrice}</td>
                        </tr>
                      </tfoot>
                    </table>
                    <p style="font-size: 14px; line-height: 1.5; color: #747474; margin-bottom: 0;">Delivery Address:</p>
                    <p style="font-size: 14px; line-height: 1.5; color: #747474; margin-bottom: 24px;">${address}, ${zip} ${city}</p>
                    <p style="font-size: 14px; line-height: 1.5; color: #747474; margin-bottom: 0;">Order ID:</p>
                    <p style="font-size: 14px; line-height: 1.5; color: #747474; margin-bottom: 24px;">${Id}</p>
                    <p style="font-size: 14px; line-height: 1.5; color: #747474; margin-bottom: 0;">Estimated Delivery Date:</p>
                    <p style="font-size: 14px; line-height: 1.5; color: #747474; margin-bottom: 24px;">${date}</p>
                    <p style="font-size: 14px; line-height: 1.5; color: #747474; margin-bottom: 0;">If you have any questions about your order, feel free to reach out to our customer support team at support@example.com.</p>
                    <p style="font-size: 14px; line-height: 1.5; color: #747474; margin-bottom: 0;">Thanks again for choosing KHAABI!</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </table>
    </body>
  `;
};

export default CustomerMail;
