import React, { useState, useEffect, useContext } from 'react';
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { menuServices } from '../Services/MenuServices';
import { useCart } from '../contexts/CartContext';
import { StoreContext } from '../context/StoreContext';

const MenuItem = ({ item, onDelete }) => {
  const [hovered, setHovered] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const { addToCart } = useCart();
  const { token } = useContext(StoreContext);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdmin = () => {
      const adminStatus = localStorage.getItem('isAdmin') === 'true';
      setIsAdmin(adminStatus);
    };
    checkAdmin();
  }, []);

  // Handle size selection
  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  // Handle add to cart
  const handleAddToCart = (size) => {
    if (!token) {
      toast.error('Please login to add items to cart');
      navigate('/login');
      return;
    }
    if (!size) {
      toast.warning('Please select a size first');
      return;
    }
    addToCart(item, size);
    setSelectedSize(null);
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this Menu Item?");
    if (!confirmDelete) return;

    try {
      await menuServices.deleteItem(item._id);
      toast.success("Menu Item Deleted Successfully!");
      if (onDelete) onDelete(item._id);
    } catch (error) {
      console.error("Failed to Delete Menu item:", error);
      toast.error("Failed to Delete. Please Try Again.");
    }
  };

  return (
    <div
      className="menu-item relative border rounded shadow-md overflow-hidden w-full h-[20rem] sm:h-[22rem] md:h-[24rem] bg-white"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Admin Buttons */}
      {isAdmin && (
        <div className="absolute top-2 right-2 flex gap-3 z-20">
          <Link
            to={`/edit/${item._id}`}
            className="text-blue-500 hover:text-yellow-500 transition"
            title="Edit Menu Item"
          >
            <FiEdit2 size={20} />
          </Link>
          <button
            onClick={handleDelete}
            className="text-red-500 hover:text-red-700 transition"
            title="Delete Menu Item"
          >
            <FiTrash2 size={20} />
          </button>
        </div>
      )}

      {/* Item Image */}
      <img
        src={item.image}
        alt={item.name}
        className="w-full h-full object-cover"
      />

      {/* Footer Text */}
      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-3 font-passion">
        <h3 className="text-base font-bold">{item.name.toUpperCase()}</h3>
        <div className="flex justify-between items-center mt-2 text-sm">
          <p>
            PRICE - <span className="text-orange-500">RS. {item.prices.medium}.00</span>
          </p>
          <p>SIZE - M</p>
        </div>
      </div>

      {/* Hover Overlay */}
      {hovered && (
        <div className="absolute inset-0 bg-black bg-opacity-70 z-10 flex flex-col justify-between p-4 text-white">
          <div>
            <h3 className="text-lg font-bold text-center mb-2">{item.name.toUpperCase()}</h3>
            <p className="text-sm text-gray-300 text-center mb-4">{item.description}</p>
          </div>

          <div className="flex justify-center gap-2 text-xs">
            <button
              className={`flex-1 px-3 py-2 rounded text-center ${
                selectedSize === 'medium'
                  ? 'bg-orange-500 text-white'
                  : 'bg-black text-white hover:bg-gray-800'
              }`}
              onClick={() => handleSizeSelect('medium')}
            >
              MEDIUM <br />
              <span className={selectedSize === 'medium' ? 'text-white' : 'text-orange-500'}>
                RS. {item.prices.medium}.00
              </span>
            </button>

            {item.prices.large && (
              <button
                className={`flex-1 px-3 py-2 rounded text-center ${
                  selectedSize === 'large'
                    ? 'bg-orange-500 text-white'
                    : 'bg-black text-white hover:bg-gray-800'
                }`}
                onClick={() => handleSizeSelect('large')}
              >
                LARGE <br />
                <span className={selectedSize === 'large' ? 'text-white' : 'text-orange-500'}>
                  RS. {item.prices.large}.00
                </span>
              </button>
            )}
          </div>

          <button
            className={`mt-4 w-full py-2 text-sm font-bold rounded ${
              selectedSize
                ? 'bg-orange-500 hover:bg-orange-600 text-white cursor-pointer'
                : 'bg-gray-400 cursor-not-allowed text-gray-600'
            }`}
            onClick={() => handleAddToCart(selectedSize)}
            disabled={!selectedSize}
          >
            {selectedSize ? 'ADD TO CART →' : 'SELECT SIZE FIRST'}
          </button>
        </div>
      )}
    </div>
  );
};

export default MenuItem;
