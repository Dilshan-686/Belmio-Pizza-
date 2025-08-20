import React, { useState, useEffect } from 'react';
import MenuItem from '../MenuItems';
import { menuServices } from '../../Services/MenuServices';
import heroImage from "../../assests/hero-image.png";

const MenuPage = () => {
  const [menuData, setMenuData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const data = await menuServices.getAllItems();
        setMenuData(data);
      } catch (error) {
        console.error("Failed to fetch menu items", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  const handleDelete = (id) => {
    setMenuData(prevData => prevData.filter(item => item._id !== id));
  };

  const handleAddToCart = (item, size) => {
    const newItem = { ...item, selectedSize: size, price: item.prices[size] };
    setCart(prevCart => [...prevCart, newItem]);
    console.log('Item added to cart:', newItem);
  };

  const filteredMenu =
    selectedCategory === 'All'
      ? menuData
      : menuData.filter(item => item.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <div className="menu-page">
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center h-[90vh] flex items-center pt-[64px]"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>

        {/* Hero Content */}
        <div className="container mx-auto px-4 sm:px-8 relative z-10 flex flex-col justify-center items-start h-full">
          <h1 className="text-4xl sm:text-6xl md:text-6xl text-white font-passion font-extrabold leading-snug tracking-tighter">
            OUR <span className="text-orange-500">MENU</span>
          </h1>
          <p className="text-white mt-2 sm:mt-4 text-base sm:text-lg">
            Explore our wide range of delicious dishes, from pizzas to desserts.
          </p>
          <p className="mt-2 sm:mt-4 text-white text-sm sm:text-base">HOME / MENU</p>
          <div className="absolute bottom-0 left-0 w-36 sm:w-64 h-2 bg-orange-500"></div>
        </div>
      </section>

      {/* Category Navigation */}
      <div className="menu-header flex flex-col md:flex-row items-start md:items-center justify-between px-4 sm:px-8 md:px-16 mt-16">
        <div className="left-header mb-4 md:mb-0">
          {/* Increased font size on mobile */}
          <h2 className="text-4xl sm:text-5xl text-gray-900 font-passion font-extrabold">
            OUR <span className="text-orange-500">MENU</span>
          </h2>
        </div>
        <div className="categories flex flex-wrap gap-2">
          {['All', 'Pizza', 'Calzone', 'Pasta', 'Mains', 'Sides', 'Soup', 'Salad', 'Risotto', 'Desserts', 'Beverages'].map(
            category => (
              <button
                key={category}
                className={`px-3 py-1 text-sm rounded ${
                  selectedCategory === category
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-200 text-black'
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            )
          )}
        </div>
      </div>

      {/* Menu Items */}
      <div
        className="menu-items grid
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          gap-16        /* Equal horizontal and vertical gap */
          px-4 sm:px-8 md:px-16
          py-12"
      >
        {loading ? (
          <p className="text-center col-span-full text-gray-500">Loading menu...</p>
        ) : filteredMenu.length > 0 ? (
          filteredMenu.map(item => (
            <MenuItem
              key={item._id || item.id}
              item={item}
              onAddToCart={handleAddToCart}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">No items found for this category.</p>
        )}
      </div>
    </div>
  );
};

export default MenuPage;
