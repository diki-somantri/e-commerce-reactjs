import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { CartContext } from "../contexts/CartContext";
import { SidebarContext } from "../contexts/SidebarContext";

/**
 * Komponen untuk menampilkan detail keranjang belanja dan proses checkout.
 *
 * @returns {JSX.Element} - Komponen CartDetail.
 */
const CartDetail = () => {
  const { cart, total, clearCart } = useContext(CartContext);
  const { setIsOpen } = useContext(SidebarContext);
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    email: "",
    paymentMethod: "",
  });
  const navigate = useNavigate();

  /**
   * Fungsi untuk mengubah nilai input form.
   *
   * @param {object} e - Objek event.
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  /**
   * Fungsi untuk menangani proses checkout.
   *
   * @param {object} e - Objek event.
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      formData.fullName &&
      formData.address &&
      formData.email &&
      formData.paymentMethod
    ) {
      const newPurchase = {
        fullName: formData.fullName,
        address: formData.address,
        email: formData.email,
        paymentMethod: formData.paymentMethod,
        items: cart,
        total: total,
        date: new Date().toLocaleDateString(),
      };
      const purchaseHistory =
        JSON.parse(localStorage.getItem("purchaseHistory")) || [];
      localStorage.setItem(
        "purchaseHistory",
        JSON.stringify([...purchaseHistory, newPurchase]),
      );

      alert("Checkout Successful!");
      clearCart();
      setFormData({
        fullName: "",
        address: "",
        email: "",
        paymentMethod: "",
      });
      navigate("/purchase-history/");
    } else {
      alert("Please fill in all the required fields.");
    }
  };

  return (
    <section className="pb-12 pt-20 lg:py-20">
      <div className="container mx-auto">
        <h1 className="mb-8 mt-4 text-center text-4xl font-bold">
          Cart Detail
        </h1>
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left">Product</th>
                <th className="px-4 py-2 text-left">Price</th>
                <th className="px-4 py-2 text-left">Quantity</th>
                <th className="px-4 py-2 text-left">Total</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id} className="border-t">
                  <td className="flex items-center border px-4 py-2">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="mr-2 h-10 w-10"
                    />
                    {item.title}
                  </td>
                  <td className="border px-4 py-2">${item.price}</td>
                  <td className="border px-4 py-2">{item.amount}</td>
                  <td className="border px-4 py-2">
                    ${item.price * item.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-xl font-semibold">Total: ${total.toFixed(2)}</p>
        <form onSubmit={handleSubmit} className="mt-8">
          <div className="mb-4">
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name:
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full rounded-md border border-gray-300 px-3 py-2"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700"
            >
              Address:
            </label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="h-20 w-full rounded-md border border-gray-300 px-3 py-2"
            ></textarea>
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full rounded-md border border-gray-300 px-3 py-2"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="paymentMethod"
              className="block text-sm font-medium text-gray-700"
            >
              Payment Method:
            </label>
            <select
              id="paymentMethod"
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              required
              className="w-full rounded-md border border-gray-300 px-3 py-2"
            >
              <option value="">Select Payment Method</option>
              <option value="creditCard">Credit Card</option>
              <option value="paypal">PayPal</option>
            </select>
          </div>
          <button
            type="submit"
            className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            Checkout
          </button>
        </form>
        <div className="mt-8">
          <Link
            to="/"
            className="flex items-center justify-center font-medium text-blue-500"
            onClick={() => setIsOpen(true)}
          >
            <FiArrowLeft className="mr-2" />
            Back to Cart
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CartDetail;
