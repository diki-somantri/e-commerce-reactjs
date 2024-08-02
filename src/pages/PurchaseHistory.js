import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiTrash2 } from "react-icons/fi"; // Import ikon tong sampah
import { BsCalendar } from "react-icons/bs"; // Import ikon kalender

/**
 * Komponen untuk halaman riwayat pembelian.
 *
 * @returns {JSX.Element} - Komponen PurchaseHistory.
 */
const PurchaseHistory = () => {
  const [purchaseHistory, setPurchaseHistory] = useState([]); // State untuk menyimpan riwayat pembelian
  const [isLoading, setIsLoading] = useState(true); // State untuk menentukan apakah sedang dalam proses pengambilan data

  // Mengambil riwayat pembelian dari local storage saat komponen dimuat
  useEffect(() => {
    const storedPurchaseHistory =
      JSON.parse(localStorage.getItem("purchaseHistory")) || [];
    setPurchaseHistory(storedPurchaseHistory);
    setIsLoading(false);
  }, []);

  // Fungsi untuk menghapus pembelian dari riwayat
  const handleRemovePurchase = (index) => {
    const updatedPurchaseHistory = [...purchaseHistory];
    updatedPurchaseHistory.splice(index, 1);
    localStorage.setItem(
      "purchaseHistory",
      JSON.stringify(updatedPurchaseHistory),
    );
    setPurchaseHistory(updatedPurchaseHistory);
  };

  return (
    <section className="pb-12 pt-20 lg:py-20">
      <div className="container mx-auto">
        <h1 className="mb-4 mt-8 text-2xl font-bold">Purchase History</h1>
        {/* Tampilkan pesan loading jika masih dalam proses pengambilan data */}
        {isLoading ? (
          <div className="text-center">Loading...</div>
        ) : (
          // Tampilkan daftar riwayat pembelian
          purchaseHistory.map((purchase, index) => (
            <div
              key={index}
              className="mb-8 grid transform grid-cols-1 gap-6 rounded-md border border-gray-300 p-4 transition duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg lg:grid-cols-3"
            >
              <div>
                {/* Informasi pembelian */}
                <h2 className="text-lg font-semibold">Purchase {index + 1}</h2>
                <p>
                  <strong>Full Name:</strong> {purchase.fullName}
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
                <p>
                  <strong>Total:</strong> ${purchase.total.toFixed(2)}
                </p>
                <p>
                  <strong>Date:</strong> {purchase.date}
                </p>
              </div>
              <div className="flex flex-col justify-center">
                <h3 className="text-lg font-semibold">Items:</h3>
                <ul className="ml-6 list-disc">
                  {/* Daftar item pembelian */}
                  {purchase.items.map((item, itemIndex) => (
                    <li key={itemIndex}>{item.title}</li>
                  ))}
                </ul>
              </div>
              <div className="flex items-center justify-center space-x-2 lg:justify-end">
                {/* Tombol untuk melihat detail pembelian */}
                <Link
                  to={`/purchase/${index}`}
                  className="rounded-md bg-blue-500 px-3 py-1 text-sm text-white transition duration-300 ease-in-out hover:bg-blue-600"
                >
                  <BsCalendar className="mr-1 inline-block" />
                  Detail
                </Link>
                {/* Tombol untuk menghapus pembelian dari riwayat */}
                <button
                  className="rounded-md bg-red-500 px-3 py-1 text-sm text-white transition duration-300 ease-in-out hover:bg-red-600"
                  onClick={() => handleRemovePurchase(index)}
                >
                  <FiTrash2 className="mr-1 inline-block" />
                  Remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default PurchaseHistory;
