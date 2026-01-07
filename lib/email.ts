/* eslint-disable @typescript-eslint/no-explicit-any */
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendReceiptEmail = async ({
  to,
  order,
  items,
}: {
  to: string;
  order: any;
  items: any[];
}) => {
  const itemsHtml = items
    .map(
      (item) =>
        `<li>${item.products.name} x ${item.quantity} - GHS ${
          item.products.price * item.quantity
        }</li>`
    )
    .join("");

  await resend.emails.send({
    from: "Nova & Sol <novaandsol@gmail.com>",
    to,
    subject: "Your Order Receipt",
    html: `
        <h2>Thank you for your order.</h2>
        <p><strong>Order Reference:</strong> ${order.reference}</p>

        <ul>${itemsHtml}</ul>

        <p><strong>Total:</strong> GHS ${order.total_amount}</p>

        <p>We'll contact you shortly for delivery.</p>
        `,
  });
};

export const sendAdminEmail = async ({
  order,
  items,
  userEmail,
}: {
  order: any;
  items: any[];
  userEmail: string;
}) => {
  const itemsHtml = items
    .map((item) => `<li>${item.products.name} x ${item.quantity}</li>`)
    .join("");

  await resend.emails.send({
    from: "Nova & Sol <orders@novaandsol.com>",
    to: process.env.ADMIN_EMAIL!,
    subject: "New Order Received",
    html: `
      <h2>New Order</h2>
      <p><strong>Customer:</strong> ${userEmail}</p>
      <p><strong>Location:</strong> ${order.delivery_location}</p>
      <p><strong>Address:</strong> ${order.delivery_address}</p>

      <ul>${itemsHtml}</ul>

      <p><strong>Total:</strong> GHS ${order.total_amount}</p>
    `,
  });
};
