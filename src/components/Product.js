// Import React dan hook useContext dari "react" module
import React, { useContext } from "react";
// Import Link dari "react-router-dom" module untuk membuat tautan
import { Link } from "react-router-dom";
// Import ikon tambah dan tautan detail dari "react-icons/bs" module
import { BsPlus, BsEyeFill } from "react-icons/bs";
// Import CartContext dari "../contexts/CartContext" untuk mengakses konteks keranjang
import { CartContext } from "../contexts/CartContext";

/**
 * Komponen untuk menampilkan detail produk.
 *
 * @param {Object} props - Properti dari komponen.
 * @param {Object} props.product - Data produk.
 * @returns {JSX.Element} - Komponen detail produk.
 */
const Product = ({ product }) => {
  // Menggunakan useContext untuk mengakses addToCart dari CartContext
  const { addToCart } = useContext(CartContext);

  // Destruktur data produk menjadi id, image, category, title, dan price
  const { id, image, category, title, price } = product;

  return (
    // Section untuk produk dengan padding atas 20
    <section id="products" className="pt-20">
      {/* Container produk */}
      <div className="container mx-auto">
        {/* Wrapper untuk setiap produk */}
        <div className="group relative mb-4 h-[300px] overflow-hidden border border-[#e4e4e4] transition">
          {/* Gambar produk */}
          <div className="flex h-full w-full items-center justify-center">
            <div className="mx-auto flex w-[200px] items-center justify-center">
              <img
                className="max-h-[160px] transition duration-300 group-hover:scale-110"
                src={image}
                alt=""
              />
            </div>
          </div>
          {/* Tombol tambah ke keranjang dan tautan detail */}
          <div className="absolute -right-11 top-6 flex flex-col items-center justify-center gap-y-2 p-2 opacity-0 transition-all duration-300 group-hover:right-5 group-hover:opacity-100">
            {/* Tombol untuk menambah produk ke keranjang */}
            <button onClick={() => addToCart(product, id)}>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500 text-white hover:bg-blue-600">
                <BsPlus className="text-3xl" />
              </div>
            </button>
            {/* Tautan untuk menuju halaman detail produk */}
            <Link
              to={`/product/${id}`}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-green-200 to-green-300 text-white shadow-xl hover:from-green-400 hover:to-green-500 "
            >
              <BsEyeFill />
            </Link>
          </div>
        </div>
        {/* Info produk */}
        <div>
          {/* Kategori produk */}
          <div className="mb-1 text-sm capitalize text-gray-600">
            {category}
          </div>
          {/* Judul produk dengan tautan ke detail produk */}
          <Link to={`/product/${id}`}>
            <h2 className="mb-2 font-semibold text-gray-800 transition-colors duration-300 hover:text-primary">
              {title}
            </h2>
          </Link>
          {/* Harga produk */}
          <div className="font-semibold">$ {price}</div>
        </div>
      </div>
    </section>
  );
};

export default Product;
