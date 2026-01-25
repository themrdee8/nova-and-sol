import Link from "next/link";
import React from "react";

const About = () => {
  return (
    <div>
      <div className="p-4 font-Eb">
        <p className="text-[20px]  uppercase pb-6 underline underline-offset-8 font-bold">
          ABOUT US
        </p>
        <p>
          Nova & Sol Atelier is a Ghana-based contemporary jewelry studio rooted
          in curation, craftsmanship, and intentional design. Operating as an
          atelier, Nova & Sol offers a thoughtful mix of handmade pieces and
          created selections — designs that are carefully sourced, handpicked,
          and styled to reflect the brand&apos;s aesthetic and values. Each
          piece is chosen or assembled with intention, whether it is made
          in-studio or curated from select suppliers. Our collections explore
          modern adornment through an African lens, blending timeless forms with
          contemporary expression. Rather than mass production, we work in small
          quantities and limited releases, allowing every piece to feel
          personal, considered, and collectible. Nova & Sol Atelier is designed
          for those who value individuality, subtle luxury, and jewelry that
          feels curated rather than crowded. Each drop is treated as a moment —
          meant to be worn, lived in, and remembered.
        </p>
      </div>

      <div className="p-4 font-Eb space-y-8 text-[16.5px]">
        <p className="text-[20px] underline underline-offset-8 font-bold">
          FREQUENTLY ASKED QUESTIONS (FAQs)
        </p>
        <div>
          <p className="font-semibold uppercase">
            Where is Nova & Sol Atelier based?
          </p>

          <p>
            Nova & Sol Atelier is a Ghana-based jewelry studio operating in
            Accra.
          </p>
        </div>

        <div>
          <p className="font-semibold uppercase">
            Are all your pieces handmade?
          </p>

          <p>
            Not all pieces are handmade. Nova & Sol Atelier operates as a studio
            and atelier, offering a mix of handmade designs and created, curated
            pieces that are carefully sourced and selected to align with our
            aesthetic. Each item is intentionally chosen or assembled, whether
            made in-studio or curated.
          </p>
        </div>

        <div>
          <p className="font-semibold uppercase">Do you offer customization?</p>

          <p>
            Limited customization is available for select pieces such as charm
            necklaces and charm bracelets. These are assembled in-studio and may
            require slight additional processing time.
          </p>
        </div>

        <div>
          <p className="font-semibold uppercase">
            How long does it take to process an order?
          </p>

          <p>
            Orders are processed within 2&ndash;5 working days. All orders
            placed during the week are prepared and shipped together to ensure
            careful handling and efficient delivery.
          </p>
        </div>

        <div>
          <p className="font-semibold uppercase">When are orders delivered?</p>

          <p>
            All deliveries are dispatched on Fridays only. Orders placed at any
            time during the week — including Thursday — will be delivered the
            following Friday.
          </p>
        </div>
        <div>
          <p className="font-semibold uppercase">
            Do you offer same-day delivery?
          </p>

          <p>
            No. Nova & Sol Atelier does not offer same-day delivery. This allows
            us to manage bulk deliveries efficiently and maintain consistent
            service.
          </p>
        </div>
        <div>
          <p className="font-semibold uppercase">Where do you deliver to?</p>

          <p>
            Currently, we deliver within:
            <ul className="list-disc p-4">
              <li>Accra</li>
              <li> Kumasi</li>
            </ul>{" "}
            Nationwide and international shipping will be introduced gradually
            in the future.
          </p>
        </div>
        <div>
          <p className="font-semibold uppercase">How much is delivery?</p>
          <ul className="list-disc p-4">
            <li>Accra: ¢30&ndash;¢35</li>
            <li> Kumasi: ¢40</li>
          </ul>
          Orders above ¢450 qualify for free delivery.
        </div>
        <div>
          <p className="font-semibold uppercase">
            Do you ship internationally?
          </p>

          <p>
            Not at the moment. Nova & Sol Atelier currently ships within Ghana
            only. International and regional African shipping will be considered
            as the brand expands.
          </p>
        </div>
        <div>
          <p className="font-semibold uppercase">
            What payment methods do you accept?
          </p>

          <p>
            We currently accept payments via Mobile Money. Additional payment
            options may be introduced as the brand grows.
          </p>
        </div>
        <div>
          <p className="font-semibold uppercase">
            Can I return or exchange an item?
          </p>{" "}
          <p>
            Due to the nature of jewelry and limited releases, all sales are
            final. However, if you receive a damaged or incorrect item, please
            contact us within 24 hours of delivery.
          </p>
        </div>
        <div>
          <p className="font-semibold uppercase">
            Will sold-out items be restocked?
          </p>{" "}
          <p>
            Some items are limited edition and may not be restocked once sold
            out. Restocks depend on demand, material availability, and seasonal
            collections.
          </p>
        </div>
        <div>
          <p className="font-semibold uppercase">
            How do I care for my jewelry?
          </p>
          <p>Care instructions are included with every order.</p>{" "}
          <p>
            To maintain your pieces:{" "}
            <ul className="list-disc p-4">
              <li>Avoid water, perfumes, and harsh chemicals</li>
              <li>Store in the provided pouch when not in use</li>{" "}
            </ul>
          </p>
        </div>
        <div>
          <p className="font-semibold uppercase">
            How can I contact Nova & Sol Atelier?
          </p>
          <p>
            You can reach us via email at:{" "}
            <Link
              href="mailto:shopnovaandsol@gmail.com"
              className="underline underline-offset-4"
            >
              📧 shopnovaandsol@gmail.com
            </Link>{" "}
          </p>
          <p>
            You may also contact us through our official social media platforms.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
