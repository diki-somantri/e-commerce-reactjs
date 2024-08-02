import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import pages
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import CartDetails from "./pages/CartDetails";
import PurchaseHistory from "./pages/PurchaseHistory";
import PurchaseDetails from "./pages/PurchaseDetails";
// import components
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div className="overflow-hidden">
      <Router basename="/e-commerce-reactjs">
        <Header />
        <Sidebar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart-details/" element={<CartDetails />} />
          <Route path="/purchase-history/" element={<PurchaseHistory />} />
          <Route path="/purchase/:index" element={<PurchaseDetails />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
