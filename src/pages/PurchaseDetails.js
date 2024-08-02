import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi"; // Import ikon panah kiri

/**
 * Komponen untuk halaman detail pembelian.
 *
 * @returns {JSX.Element} - Komponen PurchaseDetail.
 */
const PurchaseDetail = () => {
  const { index } = useParams(); // Mengambil indeks pembelian dari URL
  const [purchase, setPurchase] = useState(null); // State untuk menyimpan data pembelian

  // Mengambil data pembelian yang dipilih dari local storage saat komponen dimuat
  useEffect(() => {
    const storedPurchaseHistory =
      JSON.parse(localStorage.getItem("purchaseHistory")) || [];
    const selectedPurchase = storedPurchaseHistory[index];
    setPurchase(selectedPurchase);
  }, [index]);

  // Jika data pembelian tidak ditemukan
  if (!purchase) {
    return (
      <div className="container mx-auto">
        <p className="mt-8 text-center text-xl font-semibold">
          Purchase not found.
        </p>
        <div className="mt-8 flex justify-center">
          <Link
            to="/purchase-history"
            className="flex items-center font-semibold text-primary hover:underline"
          >
            <FiArrowLeft className="mr-2" />
            Back to Purchase History
          </Link>
        </div>
      </div>
    );
  }

  return (
    <section className="pb-12 pt-20 lg:py-20">
      <div className="container mx-auto">
        {/* Detail pembelian */}
        <h1 className="mb-8 mt-4 text-center text-4xl font-bold">
          Purchase Details
        </h1>
        <div className="grid grid-cols-1 gap-8 rounded-md bg-white p-6 shadow-md lg:grid-cols-2">
          <div>
            {/* Detail item pembelian */}
            <h2 className="mb-4 text-2xl font-semibold">
              Purchase {parseInt(index) + 1}
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                {/* Header tabel */}
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-4 py-2 text-left">Image</th>
                    <th className="px-4 py-2 text-left">Title</th>
                    <th className="px-4 py-2 text-left">Price</th>
                    <th className="px-4 py-2 text-left">Quantity</th>
                    <th className="px-4 py-2 text-left">Total</th>
                  </tr>
                </thead>
                {/* Isi tabel */}
                <tbody>
                  {purchase.items.map((item, itemIndex) => (
                    <tr key={itemIndex} className="border-b">
                      <td className="px-4 py-2">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-24 w-24 rounded-md"
                        />
                      </td>
                      <td className="px-4 py-2">{item.title}</td>
                      <td className="px-4 py-2">${item.price.toFixed(2)}</td>
                      <td className="px-4 py-2">{item.amount}</td>
                      <td className="px-4 py-2">
                        ${(item.price * item.amount).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div>
            {/* Informasi pengiriman */}
            <div>
              <p className="text-2xl font-semibold">Shipping Information</p>
              <div className="mt-4">
                <p>
                  <strong>Name:</strong> {purchase.fullName}
                </p>
                <p>
                  <strong>Address:</strong> {purchase.address}
                </p>
                <p>
                  <strong>Email:</strong> {purchase.email}
                </p>
                <p>
                  <strong>Payment Method:</strong> {purchase.paymentMethod}
                </p>
              </div>
            </div>
            {/* Total pembelian */}
            <div className="mt-6">
              <p className="text-2xl font-semibold">
                Total: ${purchase.total.toFixed(2)}
              </p>
              <p className="mt-1 text-gray-600">Date: {purchase.date}</p>
            </div>
          </div>
        </div>
        {/* Tombol kembali ke halaman riwayat pembelian */}
        <div className="mt-8 flex justify-center">
          <Link
            to="/purchase-history"
            className="flex items-center font-semibold text-blue-500 hover:underline"
          >
            <FiArrowLeft className="mr-2 " />
            Back to Purchase History
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PurchaseDetail;
