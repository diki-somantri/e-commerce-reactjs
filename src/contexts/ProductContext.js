import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

// Membuat context untuk manajemen produk
export const ProductContext = createContext();

/**
 * Komponen untuk menyediakan konteks produk kepada komponen-komponen di dalamnya.
 *
 * @param {object} props - Properti yang diterima oleh komponen.
 * @param {ReactNode} props.children - Komponen-komponen yang terkandung di dalam ProductProvider.
 * @returns {JSX.Element} - Komponen ProductProvider dengan konteks produk.
 */
const ProductProvider = ({ children }) => {
  // State untuk menyimpan daftar produk
  const [products, setProducts] = useState([]);

  // Mengambil daftar produk dari API saat komponen dimuat
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  // Memberikan nilai daftar produk kepada komponen-komponen di dalam provider
  return (
    <ProductContext.Provider value={{ products }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
