import React, { useState, createContext } from "react";

// Membuat context untuk manajemen sidebar
export const SidebarContext = createContext();

/**
 * Komponen untuk menyediakan konteks sidebar kepada komponen-komponen di dalamnya.
 *
 * @param {object} props - Properti yang diterima oleh komponen.
 * @param {ReactNode} props.children - Komponen-komponen yang terkandung di dalam SidebarProvider.
 * @returns {JSX.Element} - Komponen SidebarProvider dengan konteks sidebar.
 */
const SidebarProvider = ({ children }) => {
  // State untuk menentukan apakah sidebar terbuka atau tertutup
  const [isOpen, setIsOpen] = useState(false);

  // Fungsi untuk menutup sidebar
  const handleClose = () => {
    setIsOpen(false);
  };

  // Memberikan nilai status sidebar kepada komponen-komponen di dalam provider
  return (
    <SidebarContext.Provider
      value={{
        isOpen,
        setIsOpen,
        handleClose,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export default SidebarProvider;
