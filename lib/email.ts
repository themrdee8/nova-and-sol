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
    from: "Nova & Sol <orders@mail.novaandsol.com>",
    to,
    subject: "Your Nova & Sol order is confirmed ✨",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111;">
        <p>Hey ${order.first_name || "there"},</p>

        <p>
          We got your order — thank you for shopping with
          <strong>Nova & Sol 🤍</strong><br />
          Your pieces are now being prepared with care, and we’ll let you know
          as soon as they’re on the way.
        </p>

        <p><strong>Here’s a quick summary of your order:</strong></p>

        <ul style="padding-left: 18px;">
          <li><strong>Order Number:</strong> ${order.reference}</li>
          <li>
            <strong>Items:</strong>
            <ul style="margin-top: 6px;">
              ${itemsHtml}
            </ul>
          </li>
          <li><strong>Total:</strong> GHS ${order.total_amount}</li>
          <li><strong>Payment Method:</strong> Mobile Money</li>
          <li><strong>Delivery:</strong> ${
            order.delivery_location, order.delivery_address || "To be confirmed"
          }</li>
        </ul>

        <p>
          You’ll receive another email once your order has been shipped.
        </p>

        <p>
          In the meantime, feel free to keep up with us on Instagram →
          <a href="https://www.instagram.com/novaandsolatilier" target="_blank">
            @novaandsolatilier
          </a>
          for styling inspo, charm combos, and new drops 🌿
        </p>

        <p>
          With love,<br />
          <strong>The Nova & Sol Team</strong>
        </p>
      </div>
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
    from: "Nova & Sol <orders@mail.novaandsol.com>",
    to: process.env.ADMIN_EMAIL!,
    subject: "New Order Received",
    html: `
      <h2>New Order</h2>
      <p><strong>Customer:</strong> ${userEmail}</p>
      <p><strong>First Name:</strong> ${order.first_name}</p>
      <p><strong>Last Name:</strong> ${order.last_name}</p>
      <p><strong>Contact:</strong> ${order.contact}</p>
      <p><strong>Location:</strong> ${order.delivery_location}</p>
      <p><strong>Address:</strong> ${order.delivery_address}</p>

      <ul>${itemsHtml}</ul>

      <p><strong>Total:</strong> GHS ${order.total_amount}</p>
    `,
  });
};
