// Import React dan useContext dari "react" module
import React, { useContext } from "react";
// Import Link dari "react-router-dom" module untuk membuat tautan
import { Link } from "react-router-dom";
// Import ikon panah, ikon keranjang belanja, dan ikon arsip dari "react-icons" module
import { IoMdArrowForward } from "react-icons/io";
import { FiTrash2, FiShoppingCart, FiArchive } from "react-icons/fi";
// Import CartItem dari "../components/CartItem" untuk menampilkan item keranjang
import CartItem from "../components/CartItem";
// Import SidebarContext dari "../contexts/SidebarContext" untuk mengakses konteks sidebar
import { SidebarContext } from "../contexts/SidebarContext";
// Import CartContext dari "../contexts/CartContext" untuk mengakses konteks keranjang
import { CartContext } from "../contexts/CartContext";

/**
 * Komponen untuk menampilkan sidebar keranjang belanja.
 *
 * @returns {JSX.Element} - Komponen sidebar keranjang belanja.
 */
const Sidebar = () => {
  // Mengambil status buka-tutup sidebar dan fungsi untuk menutup sidebar dari konteks SidebarContext
  const { isOpen, handleClose } = useContext(SidebarContext);
  // Mengambil data keranjang, total harga, dan jumlah item dari konteks CartContext
  const { cart, clearCart, total, itemAmount } = useContext(CartContext);

  return (
    <div
      className={`${
        isOpen ? "right-0" : "-right-full"
      } fixed top-0 z-20 h-full w-full bg-white px-4 shadow-2xl transition-all duration-300 md:w-[35vw] lg:px-[35px] xl:max-w-[30vw]`}
    >
      <div className="flex items-center justify-between border-b py-6">
        <div className="text-sm font-semibold uppercase">
          {/* Menampilkan jumlah item dalam keranjang */}
          Shopping Cart ({itemAmount})
        </div>
        {/* Tombol untuk menutup sidebar */}
        <div
          onClick={handleClose}
          className="flex h-8 w-8 cursor-pointer items-center justify-center"
        >
          <IoMdArrowForward className="text-2xl" />
        </div>
      </div>
      <div className="flex h-[430px] flex-col gap-y-2 overflow-y-auto overflow-x-hidden border-b">
        {/* Menampilkan setiap item dalam keranjang */}
        {cart.map((item) => {
          return <CartItem item={item} key={item.id} />;
        })}
      </div>
      <div className="mt-4 flex flex-col gap-y-3 py-4">
        <div className="flex w-full items-center justify-between">
          <div className="font-semibold uppercase">
            {/* Menampilkan total harga keranjang */}
            <span className="mr-2">Total:</span>$ {parseFloat(total).toFixed(2)}
          </div>
          {/* Tombol untuk mengosongkan keranjang */}
          <div
            onClick={clearCart}
            className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-red-500 py-4 text-xl text-white shadow-md transition duration-300 hover:bg-red-600"
          >
            <FiTrash2 />
          </div>
        </div>
        {/* Tautan untuk menuju halaman detail keranjang */}
        <Link
          to="/cart-details/"
          className="flex w-full items-center justify-center rounded-md bg-gradient-to-r from-blue-200 to-blue-300 p-4 font-medium text-blue-800 hover:from-blue-300 hover:to-blue-400"
          onClick={handleClose}
        >
          <FiShoppingCart className="mr-2" /> View Cart
        </Link>
        {/* Tautan untuk menuju halaman riwayat pembelian */}
        <Link
          to="/purchase-history/"
          className="flex w-full items-center justify-center rounded-md bg-gradient-to-r from-green-200 to-green-300 p-4 font-medium text-green-800 hover:from-green-300 hover:to-green-400"
          onClick={handleClose}
        >
          <FiArchive className="mr-2" /> Purchase History
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
