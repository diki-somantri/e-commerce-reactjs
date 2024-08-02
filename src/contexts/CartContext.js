import React, { createContext, useState, useEffect } from "react";

// Membuat context untuk manajemen keranjang belanja
export const CartContext = createContext();

/**
 * Komponen untuk menyediakan konteks keranjang belanja kepada komponen-komponen di dalamnya.
 *
 * @param {object} props - Properti yang diterima oleh komponen.
 * @param {ReactNode} props.children - Komponen-komponen yang terkandung di dalam CartProvider.
 * @returns {JSX.Element} - Komponen CartProvider dengan konteks keranjang belanja.
 */
const CartProvider = ({ children }) => {
  // State untuk menyimpan keranjang belanja, jumlah item, dan total harga
  const [cart, setCart] = useState([]);
  const [itemAmount, setItemAmount] = useState(0);
  const [total, setTotal] = useState(0);

  // Menghitung total harga setiap kali isi keranjang berubah
  useEffect(() => {
    const newTotal = cart.reduce((accumulator, currentItem) => {
      return accumulator + currentItem.price * currentItem.amount;
    }, 0);
    setTotal(newTotal);
  }, [cart]);

  // Menghitung jumlah item setiap kali isi keranjang berubah
  useEffect(() => {
    if (cart) {
      const amount = cart.reduce((accumulator, currentItem) => {
        return accumulator + currentItem.amount;
      }, 0);
      setItemAmount(amount);
    }
  }, [cart]);

  // Fungsi untuk menambah item ke keranjang belanja
  const addToCart = (product, id) => {
    const newItem = { ...product, amount: 1 };
    const cartItem = cart.find((item) => item.id === id);
    if (cartItem) {
      const newCart = cart.map((item) =>
        item.id === id ? { ...item, amount: item.amount + 1 } : item,
      );
      setCart(newCart);
    } else {
      setCart([...cart, newItem]);
    }
  };

  // Fungsi untuk menghapus item dari keranjang belanja
  const removeFromCart = (id) => {
    const newCart = cart.filter((item) => item.id !== id);
    setCart(newCart);
  };

  // Fungsi untuk mengosongkan keranjang belanja
  const clearCart = () => {
    setCart([]);
  };

  // Fungsi untuk menambah jumlah item dalam keranjang belanja
  const increaseAmount = (id) => {
    const cartItem = cart.find((item) => item.id === id);
    addToCart(cartItem, id);
  };

  // Fungsi untuk mengurangi jumlah item dalam keranjang belanja
  const decreaseAmount = (id) => {
    const cartItem = cart.find((item) => item.id === id);
    if (cartItem) {
      const newCart = cart.map((item) =>
        item.id === id ? { ...item, amount: cartItem.amount - 1 } : item,
      );
      setCart(newCart);
    }
    if (cartItem.amount === 1) {
      removeFromCart(id);
    }
  };

  // Memberikan nilai keranjang belanja kepada komponen-komponen di dalam provider
  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        increaseAmount,
        decreaseAmount,
        itemAmount,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
