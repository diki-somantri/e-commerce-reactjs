import React, { useContext, useEffect, useState } from "react";
import { SidebarContext } from "../contexts/SidebarContext"; // Import SidebarContext untuk mengakses status Sidebar
import { CartContext } from "../contexts/CartContext"; // Import CartContext untuk mengakses jumlah item dalam keranjang
import { BsCart } from "react-icons/bs"; // Import ikon untuk keranjang belanja
import { Link } from "react-router-dom"; // Import Link untuk tautan
import { IoShirtOutline } from "react-icons/io5"; // Import ikon logo

/**
 * Komponen untuk menampilkan header aplikasi.
 *
 * @returns {JSX.Element} - Komponen header.
 */
const Header = () => {
  // State untuk menentukan apakah header aktif atau tidak
  const [isActive, setIsActive] = useState(false);

  // Mengakses status Sidebar dan jumlah item dalam keranjang dari konteks
  const { isOpen, setIsOpen } = useContext(SidebarContext);
  const { itemAmount } = useContext(CartContext);

  // Event listener untuk mengatur aktivasi header saat discroll
  useEffect(() => {
    // Fungsi untuk menentukan apakah header aktif berdasarkan posisi scroll
    const handleScroll = () => {
      setIsActive(window.scrollY > 60);
    };

    // Memasang event listener untuk scroll
    window.addEventListener("scroll", handleScroll);

    // Membersihkan event listener setelah komponen di-unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // Effect hanya berjalan sekali saat komponen dimount

  // Fungsi untuk mengatur scroll ke bagian atas saat logo diklik
  const handleHeroClick = () => {
    // Mendapatkan elemen hero section berdasarkan ID
    const heroSection = document.getElementById("hero");
    // Jika hero section ditemukan, scroll ke bagian atas dengan efek smooth
    if (heroSection) {
      heroSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    // Header dengan transisi warna latar belakang, padding, dan bayangan
    <header
      className={`${
        isActive ? "bg-white py-4 shadow-md " : "bg-none py-6"
      } fixed z-10 w-full transition-all`}
    >
      {/* Bagian Logo dan keranjang belanja */}
      <div className="container mx-auto flex h-full items-center justify-between">
        {/* Tautan menuju halaman utama dengan fungsi handleHeroClick */}
        <Link to={"/"} onClick={handleHeroClick}>
          {/* Konten logo dan nama toko */}
          <div className="flex items-center">
            {/* Ikon logo */}
            <IoShirtOutline className="mr-2 text-2xl" />
            {/* Nama toko */}
            <span className="text-xl font-bold">DStore</span>
          </div>
        </Link>
        {/* Bagian keranjang belanja dengan jumlah item */}
        <div
          onClick={() => setIsOpen(!isOpen)} // Fungsi untuk membuka atau menutup sidebar
          className="relative flex cursor-pointer"
        >
          {/* Ikon keranjang belanja */}
          <BsCart className="text-2xl" />
          {/* Menampilkan jumlah item dalam keranjang */}
          <div className="absolute -bottom-2 -right-2 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-red-500 text-[12px] text-white">
            {itemAmount}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
