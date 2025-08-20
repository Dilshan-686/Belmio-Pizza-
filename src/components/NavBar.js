import React, { useContext, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import myLogo from "../assests/logo.jpg";
import { StoreContext } from "../context/StoreContext";
import { motion } from "framer-motion";
import { useCart } from "../contexts/CartContext";

const googleFontsLink = `
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
`;

const Navbar = ({ setShowLogin, setFormType }) => {
  const navigate = useNavigate();
  const { token, setToken } = useContext(StoreContext);
  const { cartItems } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check if user is admin when component mounts or token changes
    const checkAdmin = () => {
      const adminStatus = localStorage.getItem('isAdmin') === 'true';
      setIsAdmin(adminStatus);
    };
    checkAdmin();
  }, [token]);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isAdmin");
    setToken("");
    setIsAdmin(false);
    navigate("/");
  };

  const swingAnimation = {
    rotate: [-10, 10, -10],
    transition: {
      repeat: Infinity,
      duration: 0.5,
      ease: "easeInOut",
    },
  };

  const defaultAnimation = {
    rotate: 0,
    transition: { duration: 0.2 },
  };

  const linkVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: index * 0.1 },
    }),
  };

  const navbarAnimation = {
    hidden: { opacity: 0, y: -100 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div>
      <style dangerouslySetInnerHTML={{ __html: googleFontsLink }} />

      <motion.div
        className="fixed top-0 left-0 w-full z-50"
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={navbarAnimation}
        style={{ pointerEvents: isVisible ? "auto" : "none" }}
      >
        <div className="bg-gray-900 text-center py-2 text-sm font-medium text-white font-poppins tracking-wide">
          WELCOME TO BELMIO PIZZA SHOP
        </div>

        <nav className="bg-black shadow-lg py-4 font-poppins">
          <div className="max-w-screen-xl mx-auto flex items-center justify-between px-6 md:px-12">
            {/* Left section with logo */}
            <div className="flex items-center gap-4">
              <Link to="/">
                <motion.img
                  src={myLogo}
                  alt="Logo"
                  className="h-14 w-14 rounded-full object-cover border-2 border-white"
                  animate={defaultAnimation}
                  whileHover={swingAnimation}
                  style={{ transformOrigin: "top center" }}
                />
              </Link>
            </div>

            {/* Middle section for desktop nav links */}
            <div className="hidden md:flex items-center space-x-12">
              {['Home', 'Menu', 'Services', 'AboutUs'].map((item, index) => (
                <motion.div
                  key={item}
                  custom={index}
                  initial="hidden"
                  animate={isVisible ? "visible" : "hidden"}
                  variants={linkVariants}
                >
                  <Link
                    to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                    className="text-white text-base md:text-lg font-medium hover:text-orange-200 transition-colors duration-300"
                  >
                    {item}
                    {['Menu', 'Services'].includes(item) && <span className="ml-1">▾</span>}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Right section (cart + hamburger menu + auth buttons desktop only) */}
            <div className="flex items-center space-x-4 md:space-x-6">
              {/* Cart Icon - always visible */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="relative"
              >
                <Link to="/cart" className="text-white hover:text-orange-200">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.38 2.4a1 1 0 00-.12.6v1a1 1 0 001 1h12a1 1 0 001-1v-1a1 1 0 00-.12-.6L17 13M7 13l4-8M17 13l-4-8M6 21h.01M18 21h.01"
                    />
                  </svg>
                  <span className="absolute -top-2 -right-2 bg-white text-orange-600 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-orange-200">
                    {cartItems.length}
                  </span>
                </Link>
              </motion.div>

              {/* Hamburger Menu - visible only on mobile */}
              <div className="md:hidden">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="text-white focus:outline-none"
                >
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                    />
                  </svg>
                </button>
              </div>

              {/* Auth buttons - visible only on md and larger screens */}
              <div className="hidden md:flex items-center space-x-4">
                {!token ? (
                  <>
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <button
                        onClick={() => {
                          setShowLogin(true);
                          setFormType("Login");
                        }}
                        className="text-white border-2 border-white px-5 py-2 rounded-lg hover:bg-white hover:text-orange-600 transition"
                      >
                        LOGIN
                      </button>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      <button
                        onClick={() => {
                          setShowLogin(true);
                          setFormType("Sign Up");
                        }}
                        className="text-white bg-gradient-to-br from-pink-500 to-orange-600 hover:bg-gradient-to-bl px-5 py-2 rounded-lg"
                      >
                        Sign Up
                      </button>
                    </motion.div>
                  </>
                ) : (
                  <>
                    {isAdmin && (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                      >
                        <button
                          onClick={() => navigate('/admin/dashboard')}
                          className="text-white border-2 border-white px-5 py-2 rounded-lg hover:bg-white hover:text-orange-600 transition mr-2"
                        >
                          Dashboard
                        </button>
                      </motion.div>
                    )}
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                    >
                      <button
                        onClick={logOut}
                        className="text-white border-2 border-white px-5 py-2 rounded-lg hover:bg-white hover:text-orange-600 transition"
                      >
                        LOG OUT
                      </button>
                    </motion.div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden bg-black px-6 pt-4 pb-6 space-y-4">
              {['Home', 'Menu', 'Services', 'AboutUs'].map((item, index) => (
                <motion.div
                  key={item}
                  custom={index}
                  initial="hidden"
                  animate="visible"
                  variants={linkVariants}
                >
                  <Link
                    to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                    className="block text-white text-base font-medium hover:text-orange-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item} {['Menu', 'Services'].includes(item) && <span className="ml-1">▾</span>}
                  </Link>
                </motion.div>
              ))}

              {isAdmin ? (
                <div className="flex flex-col space-y-3">
                  <button
                    onClick={() => {
                      navigate('/admin/dashboard');
                      setIsMenuOpen(false);
                    }}
                    className="text-white bg-transparent px-5 py-2 rounded-lg border-2 border-white hover:bg-white hover:text-orange-600 transition-all duration-300 font-medium text-base"
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={() => {
                      logOut();
                      setIsMenuOpen(false);
                    }}
                    className="text-white bg-transparent px-5 py-2 rounded-lg border-2 border-white hover:bg-white hover:text-orange-600 transition-all duration-300 font-medium text-base"
                  >
                    LOG OUT
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  {!token ? (
                    <>
                      <button
                        onClick={() => {
                          setShowLogin(true);
                          setFormType("Login");
                          setIsMenuOpen(false);
                        }}
                        className="text-white border px-4 py-2 rounded hover:bg-white hover:text-orange-600"
                      >
                        LOGIN
                      </button>
                      <button
                        onClick={() => {
                          setShowLogin(true);
                          setFormType("Sign Up");
                          setIsMenuOpen(false);
                        }}
                        className="text-white bg-gradient-to-br from-pink-500 to-orange-600 hover:bg-gradient-to-bl px-4 py-2 rounded"
                      >
                        Sign Up
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => {
                        logOut();
                        setIsMenuOpen(false);
                      }}
                      className="text-white border px-4 py-2 rounded hover:bg-white hover:text-orange-600"
                    >
                      LOG OUT
                    </button>
                  )}
                </div>
              )}
            </div>
          )}
        </nav>
      </motion.div>
    </div>
  );
};

export default Navbar;

