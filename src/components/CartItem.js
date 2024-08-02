import React, { useContext } from "react";
import { Link } from "react-router-dom"; // Import Link untuk membuat tautan
import { IoMdAdd, IoMdClose, IoMdRemove } from "react-icons/io"; // Import ikon
import { CartContext } from "../contexts/CartContext"; // Import CartContext untuk mengakses data keranjang

/**
 * Komponen untuk menampilkan item dalam keranjang belanja.
 *
 * @param {Object} item - Objek yang mewakili item dalam keranjang belanja.
 * @returns {JSX.Element} - Komponen untuk menampilkan item dalam keranjang belanja.
 */
const CartItem = ({ item }) => {
  // useContext untuk mengakses CartContext dan fungsi-fungsi yang dibutuhkan
  const { removeFromCart, increaseAmount, decreaseAmount } =
    useContext(CartContext);
  // Destruktur item menjadi id, title, image, price, dan amount
  const { id, title, image, price, amount } = item;

  return (
    <div className="flex w-full gap-x-4 border-b border-gray-200 py-2 font-light text-gray-500 lg:px-6">
      <div className="flex min-h-[150px] w-full items-center gap-x-4">
        {/* Tautan gambar menuju halaman detail produk */}
        <Link to={`/product/${id}`}>
          <img className="max-w-[80px]" src={image} alt={title} />
        </Link>
        <div className="flex w-full flex-col">
          {/* Judul produk & ikon untuk menghapus item dari keranjang */}
          <div className="mb-2 flex justify-between">
            {/* Tautan judul produk */}
            <Link
              to={`/product/${id}`}
              className="max-w-[240px] text-sm font-medium uppercase text-primary hover:underline"
            >
              {title}
            </Link>
            {/* Ikon hapus item dari keranjang */}
            <div
              onClick={() => removeFromCart(id)}
              className="cursor-pointer text-xl"
            >
              <IoMdClose className="text-gray-500 transition hover:text-red-500" />
            </div>
          </div>
          {/* Bagian untuk jumlah produk */}
          <div className="flex h-[36px] gap-x-2 text-sm">
            {/* Bagian untuk menambah atau mengurangi jumlah produk */}
            <div className="flex h-full max-w-[100px] flex-1 items-center border font-medium text-primary">
              {/* Ikon untuk mengurangi jumlah */}
              <div
                onClick={() => decreaseAmount(id)}
                className="flex h-full flex-1 cursor-pointer items-center justify-center"
              >
                <IoMdRemove />
              </div>
              {/* Jumlah produk */}
              <div className="flex h-full items-center justify-center px-2">
                {amount}
              </div>
              {/* Ikon untuk menambah jumlah */}
              <div
                onClick={() => increaseAmount(id)}
                className="flex h-full flex-1 cursor-pointer items-center justify-center "
              >
                <IoMdAdd />
              </div>
            </div>
            {/* Harga per produk */}
            <div className="flex flex-1 items-center justify-around">
              $ {price}
            </div>
            {/* Harga total untuk produk tertentu */}
            {/* Menyusun harga hingga 2 desimal */}
            <div className="flex flex-1 items-center justify-end font-medium text-primary">{`$ ${parseFloat(amount * price).toFixed(2)}`}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
