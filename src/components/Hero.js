import React, { useContext, useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom"; // Import Link untuk tautan
import { ProductContext } from "../contexts/ProductContext"; // Ini adalah import untuk menggunakan konteks produk dari ProductContext
import { FiChevronLeft, FiChevronRight } from "react-icons/fi"; // Import icons

/**
 * Komponen untuk menampilkan bagian hero pada halaman utama.
 *
 * @returns {JSX.Element} - Komponen hero.
 */
const Hero = () => {
  // Mengambil data produk dari konteks produk
  const { products } = useContext(ProductContext);

  // Filter produk untuk menampilkan hanya pakaian pria dan wanita karena ada category jewelery dan electronics
  const filteredProducts = products.filter((item) => {
    return (
      item.category === "men's clothing" || item.category === "women's clothing"
    );
  });

  // State untuk mengatur indeks produk saat ini yang ditampilkan di hero
  const [currentProductIndex, setCurrentProductIndex] = useState(0);

  // Fungsi untuk menampilkan produk berikutnya
  const nextProduct = useCallback(() => {
    setCurrentProductIndex(
      (prevIndex) => (prevIndex + 1) % filteredProducts.length,
    );
  }, [filteredProducts]);

  // Fungsi untuk menampilkan produk sebelumnya
  const prevProduct = useCallback(() => {
    setCurrentProductIndex(
      (prevIndex) =>
        (prevIndex - 1 + filteredProducts.length) % filteredProducts.length,
    );
  }, [filteredProducts]);

  // Efek untuk mengatur interval perpindahan otomatis produk setiap 10 detik
  useEffect(() => {
    if (filteredProducts.length > 0) {
      const interval = setInterval(nextProduct, 10000);
      return () => clearInterval(interval);
    }
  }, [filteredProducts.length, nextProduct]);

  // Mengambil URL gambar produk yang akan ditampilkan di hero
  const image =
    filteredProducts.length > 0
      ? filteredProducts[currentProductIndex].image
      : "";

  // Fungsi untuk men-scroll ke bagian produk saat tombol "Explore Now" diklik
  const handleExploreClick = () => {
    const productsSection = document.getElementById("products");
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    // Section Hero dengan tinggi 800px dan padding atas-bawah 24px
    <section id="hero" className="h-[800px] py-24">
      {/* Container untuk content hero */}
      <div className="container mx-auto flex h-full items-center justify-around">
        {/* Bagian teks dan tombol */}
        <div className="flex max-w-md flex-col justify-center">
          {/* Judul dan deskripsi */}
          <h1 className="mb-4 text-4xl font-light leading-tight lg:text-6xl">
            Seasonal Sale Fashion
          </h1>
          <p className="mb-4 text-xl text-gray-700">
            Get ready for the new season with our latest collection
          </p>
          {/* Tombol Explore Now dengan fungsi handleExploreClick */}
          <Link
            to={"/"}
            className="self-start border-b-2 border-primary font-semibold uppercase transition duration-300 hover:text-primary"
            onClick={handleExploreClick}
          >
            Explore Now
          </Link>
        </div>

        {/* Bagian gambar produk */}
        {image && (
          <div className="relative ml-10 hidden lg:block">
            {/* Gambar produk */}
            <img src={image} alt="" className="max-w-md" />
            {/* Tombol navigasi untuk gambar sebelumnya dan selanjutnya */}
            <button
              className="absolute left-0 top-1/2 -translate-y-1/2 transform rounded-full bg-gray-800 px-3 py-1 text-white transition duration-300 hover:bg-gray-700"
              onClick={prevProduct}
            >
              <FiChevronLeft /> {/* Icon for previous */}
            </button>
            <button
              className="absolute right-0 top-1/2 -translate-y-1/2 transform rounded-full bg-gray-800 px-3 py-1 text-white transition duration-300 hover:bg-gray-700"
              onClick={nextProduct}
            >
              <FiChevronRight /> {/* Icon for next */}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Hero;
