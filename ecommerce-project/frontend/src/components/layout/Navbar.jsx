import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

import {
  FaShoppingCart,
  FaHeart,
  FaUser,
  FaSearch
} from "react-icons/fa";

import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";

function Navbar() {

  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const { cartCount } = useCart();

  const { user, logout, isAuthenticated } = useAuth();

const [keyword, setKeyword] = useState("");


  const activeLink = ({ isActive }) =>
    isActive
      ? "text-yellow-400 font-semibold"
      : "text-white";

  const handleLogout = () => {

    logout();

    navigate("/login");

  };

  const handleSearch = (e) => {

  e.preventDefault();

  if (search.trim()) {

    navigate(`/search?keyword=${search}`);

  }

};

  return (

    <header className="bg-gray-900 text-white shadow-md">

      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}

        <NavLink
          to="/"
          className="text-2xl font-bold"
        >
          shoppee
        </NavLink>

        {/* Search Box */}

        <form
          onSubmit={handleSearch}
          className="hidden md:flex items-center bg-white rounded-lg overflow-hidden w-96"
        >

          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 text-black outline-none"
          />

          <button
            type="submit"
            className="bg-yellow-400 px-4 py-3"
          >
            <FaSearch className="text-black" />
          </button>

        </form>

        {/* Navigation Links */}

        <nav className="flex items-center gap-5">

          <NavLink
            to="/"
            className={activeLink}
          >
            Home
          </NavLink>

          <NavLink
            to="/products"
            className={activeLink}
          >
            Products
          </NavLink>

          <NavLink
            to="/wishlist"
            className="flex items-center gap-1 hover:text-yellow-400"
          >
            <FaHeart />
            Wishlist
          </NavLink>

          <NavLink
            to="/cart"
            className="flex items-center gap-1 hover:text-yellow-400"
          >
            <FaShoppingCart />
            Cart ({cartCount})
          </NavLink>

          {

            isAuthenticated ? (

              <>

                <NavLink
                  to="/profile"
                  className="flex items-center gap-2 hover:text-yellow-400 whitespace-nowrap"
                >
                  <FaUser />
                  {user?.name}
                </NavLink>

                <button
                  onClick={handleLogout}
                  className="hover:text-yellow-400"
                >
                  Logout
                </button>

              </>

            ) : (

              <NavLink
                to="/login"
                className="flex items-center gap-1 hover:text-yellow-400"
              >
                <FaUser />
                Login
              </NavLink>

            )

          }

        </nav>

      </div>

    </header>

  );

}

export default Navbar;