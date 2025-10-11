import React, { useState } from 'react'
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import SideMenu from "./SideMenu";

const Navbar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);
  
  const closeMobileMenu = () => {
    setOpenSideMenu(false);
  };
  
  return (
    <>
      
      {/* Navbar */}
      <div className="flex gap-5 bg-white border border-b border-gray-200 relative z-40 px-8">
        <button
          className="block lg:hidden text-black p-2"
          onClick={() => {
            setOpenSideMenu(!openSideMenu);
          }}
        >
          {openSideMenu ? (
            <HiOutlineX className="text-2xl" />
          ) : (
            <HiOutlineMenu className="text-2xl" />
          )}
        </button>

        <h2 className="text-2xl font-medium text-black py-4">Expense Tracker</h2>
      </div>

      {/* Mobile Overlay */}
      {openSideMenu && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={closeMobileMenu}
        />
      )}

      {/* Mobile Side Menu */}
      {openSideMenu && (
        <div className="fixed top-0 left-0 w-72 h-full bg-gray-100 shadow-lg z-40 lg:hidden overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-semibold text-gray-800">Expense Tracker</h2>
              <button
                onClick={closeMobileMenu}
                className="text-gray-600 hover:text-gray-800"
              >
                <HiOutlineX className="text-2xl" />
              </button>
            </div>
            <SideMenu 
              activeMenu={activeMenu} 
              isMobile={true}
              onMenuClick={closeMobileMenu}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;