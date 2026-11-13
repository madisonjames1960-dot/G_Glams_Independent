import React, { createContext, useContext, useEffect, useState, useCallback } from "react";

const CartContext = createContext(null);
const STORAGE_KEY = "gg_cart_v1";

function itemKey(item) {
  return item.cartKey || String(item.id);
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch {
      return [];
    }
  });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = useCallback((product, qty = 1, variant = null) => {
    const cartKey = `${product.id}::${variant?.id || "default"}`;
    const item = {
      id: product.id,
      cartKey,
      name: product.name,
      price: variant?.price ?? product.price,
      variantLabel: variant?.label || null,
      image: product.image,
      slug: product.slug,
    };

    setItems((prev) => {
      const existing = prev.find((i) => itemKey(i) === cartKey);
      if (existing) {
        return prev.map((i) =>
          itemKey(i) === cartKey ? { ...i, qty: i.qty + qty } : i
        );
      }
      return [...prev, { ...item, qty }];
    });
    setIsOpen(true);
  }, []);

  const removeItem = useCallback(
    (id) => setItems((prev) => prev.filter((i) => itemKey(i) !== id)),
    []
  );

  const updateQty = useCallback(
    (id, qty) =>
      setItems((prev) =>
        prev.map((i) =>
          itemKey(i) === id ? { ...i, qty: Math.max(1, qty) } : i
        )
      ),
    []
  );

  const clear = useCallback(() => setItems([]), []);
  const count = items.reduce((n, i) => n + i.qty, 0);
  const hasPriced = items.some((i) => i.price != null && !Number.isNaN(Number(i.price)));
  const total = items.reduce((n, i) => n + (Number(i.price) || 0) * i.qty, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQty,
        clear,
        count,
        total,
        hasPriced,
        isOpen,
        openCart: () => setIsOpen(true),
        closeCart: () => setIsOpen(false),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
