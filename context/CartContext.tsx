"use client";

import { createContext, useContext, useState } from "react";

interface CartContextType {
  refreshKey: number;
  refreshCart: () => void;
}

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [refreshKey, setRefreshKey] = useState(0);

  const refreshCart = () => {
    setRefreshKey((previous) => previous + 1);
  };

  return (
    <CartContext.Provider value={{ refreshKey, refreshCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }
  return context;
};
