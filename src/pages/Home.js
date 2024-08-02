import React, { useContext } from "react";
import { ProductContext } from "../contexts/ProductContext"; // Import konteks produk
import Product from "../components/Product"; // Import komponen produk
import Hero from "../components/Hero"; // Import komponen hero

/**
 * Komponen untuk halaman utama aplikasi.
 *
 * @returns {JSX.Element} - Komponen Home.
 */
const Home = () => {
  // Mengambil daftar produk dari konteks produk
  const { products } = useContext(ProductContext);

  // Menyaring produk hanya untuk kategori pakaian pria dan wanita
  const filteredProducts = products.filter((item) => {
    return (
      item.category === "men's clothing" || item.category === "women's clothing"
    );
  });

  return (
    <div>
      <Hero /> {/* Komponen hero */}
      <section className="py-16">
        <div className="container mx-auto">
          {/* Grid produk */}
          <div className="mx-auto grid max-w-sm grid-cols-1 gap-[30px] md:mx-0 md:max-w-none md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
            {filteredProducts.map((product) => {
              return <Product product={product} key={product.id} />; // Mapping setiap produk menjadi komponen Produk
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
