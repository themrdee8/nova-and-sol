"use client"
import NewArrivalsCard from "@/components/NewArrivalsCard";
import cat from "@/public/images/cat.jpg"

const AmariPage = () => {
   const items = [
    { name: "beads", image: cat, price: "£5.00" },
    { name: "beady", image: cat, price: "£5.00" },
    { name: "beada", image: cat, price: "£5.00" },
    { name: "beadx", image: cat, price: "£5.00" },
    { name: "beadt", image: cat, price: "£5.00" },
  ];
  return (
    <div className="grid grid-cols-2 gap-1 py-10 px-4 place-items-center">
      {items.map((item) => (
        <NewArrivalsCard
          key={item.name}
          imageUrl={item.image}
          name={item.name}
          price={item.price}
        />
      ))}
    </div>
  );
}

export default AmariPage;