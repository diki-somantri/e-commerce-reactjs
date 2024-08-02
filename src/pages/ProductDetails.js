import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../contexts/CartContext"; // Import konteks keranjang belanja
import { ProductContext } from "../contexts/ProductContext"; // Import konteks produk
import { FiShoppingCart } from "react-icons/fi"; // Import ikon keranjang belanja

/**
 * Komponen untuk halaman detail produk.
 *
 * @returns {JSX.Element} - Komponen ProductDetails.
 */
const ProductDetails = () => {
  const { id } = useParams(); // Mengambil id produk dari URL
  const { products } = useContext(ProductContext); // Mengambil daftar produk dari konteks produk
  const { addToCart } = useContext(CartContext); // Mengambil fungsi addToCart dari konteks keranjang belanja

  // Parse id ke integer
  const productId = parseInt(id);

  // Mencari produk berdasarkan id
  const product = products.find((item) => item.id === productId);

  // Jika produk tidak ditemukan
  if (!product) {
    return (
      <section className="flex h-screen items-center justify-center">
        Product not found.
      </section>
    );
  }

  // Destrukturisasi data produk
  const { title, price, description, image } = product;

  return (
    <section className="flex h-screen items-center pb-12 pt-20 lg:py-20">
      <div className="container mx-auto">
        {/* Wrapper gambar dan teks */}
        <h1 className="mb-8 mt-8 text-center text-4xl font-bold">
          Product Detail
        </h1>
        <div className="flex flex-col items-center lg:flex-row">
          {/* Gambar */}
          <div className="mb-8 flex flex-1 items-center justify-center lg:mb-0">
            <img className="max-h-[200px] lg:max-w-sm" src={image} alt="" />
          </div>
          {/* Teks */}
          <div className="flex-1 text-center lg:text-left">
            <h1 className="mx-auto mb-2 max-w-[450px] text-[26px] font-medium lg:mx-0">
              {title}
            </h1>
            <div className="mb-6 text-xl font-medium text-red-500">
              $ {price}
            </div>
            <p className="mb-8">{description}</p>
            {/* Tombol untuk menambah produk ke keranjang belanja */}
            <button
              onClick={() => addToCart(product, product.id)}
              className="flex items-center justify-center gap-2 rounded-md bg-blue-500 px-8 py-4 text-white hover:bg-blue-600"
            >
              <FiShoppingCart className="text-xl" />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
