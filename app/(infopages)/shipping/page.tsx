import React from "react";

const Shipping = () => {
  return (
    <div>
      <div className="p-4 font-Eb">
        <p className="text-[20px]  uppercase pb-6 underline underline-offset-8 font-bold">
          shipping & delivery
        </p>

        <div>
          <p className="font-semibold uppercase">Delivery Locations & Fees </p>
          <ul className="list-disc p-4">
            <li>Accra</li>
            <li>Kumasi</li>
            <li>Orders above ¢450 qualify for FREE delivery.</li>
          </ul>
          <p>
            At this time, we do not ship outside Ghana. Regional and
            international shipping will be introduced gradually.
          </p>
        </div>

        <div>
          <p className="font-semibold uppercase pt-4">Order Processing. </p>
          <ul className="list-disc p-4">
            <li>Orders are processed within 2&ndash;5 working days.</li>
            <li>Most pieces are ready to ship.</li>
            <li>
              Select charm jewelry may be assembled after order placement but
              does not require extended production time.
            </li>
          </ul>
        </div>

        <div>
          <p className="font-semibold uppercase">Delivery Schedule</p>
          <p>All deliveries are dispatched on Fridays only.</p>
          <ul className="list-disc p-4">
            <li>
              Orders placed from Monday to Thursday (including Thursday evening)
              will be delivered the following Friday.
            </li>
            <li>
              Orders placed after Thursday evening will be processed for the
              next delivery cycle.
            </li>
          </ul>
          <p>
            We do not offer same-day delivery. This allows us to prepare orders
            carefully and dispatch deliveries in bulk.
          </p>
        </div>

        <div>
          <p className="font-semibold uppercase pt-4">Important Notes</p>
          <ul className="list-disc p-4">
            <li>Delivery timelines may vary slightly depending on location.</li>
            <li>
              Customers will receive a confirmation once orders are dispatched.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Shipping;
