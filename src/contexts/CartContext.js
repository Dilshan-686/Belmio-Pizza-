import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { StoreContext } from '../context/StoreContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const navigate = useNavigate();
  const { token } = useContext(StoreContext);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  // Get cart key based on token
  const cartKey = token ? `cart_${token}` : null;

  // Check if user is logged in
  const isLoggedIn = !!token;

  // Load cart from localStorage on mount
  useEffect(() => {
    if (isLoggedIn) {
      // If user is logged in, load their cart
      const savedCart = localStorage.getItem(cartKey);
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        setCartItems(parsedCart.items);
        setTotalPrice(parsedCart.totalPrice);
      } else {
        // Initialize empty cart for new user
        setCartItems([]);
        setTotalPrice(0);
      }
    } else {
      // For non-logged in users, clear cart
      setCartItems([]);
      setTotalPrice(0);
    }
  }, [isLoggedIn, cartKey]);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isLoggedIn) {
      localStorage.setItem(cartKey, JSON.stringify({
        items: cartItems,
        totalPrice: totalPrice
      }));
    }
  }, [cartItems, totalPrice, isLoggedIn, cartKey]);

  const addToCart = (item, size) => {
    try {
      if (!isLoggedIn) {
        throw new Error('Please login to add items to cart');
      }

      // Check if item already exists in cart
      const existingItemIndex = cartItems.findIndex(
        cartItem => cartItem._id === item._id && cartItem.size === size
      );

      if (existingItemIndex >= 0) {
        // Update quantity if item already exists
        const updatedCart = [...cartItems];
        updatedCart[existingItemIndex].quantity += 1;
        setCartItems(updatedCart);
      } else {
        // Add new item to cart
        const newItem = {
          ...item,
          size,
          quantity: 1,
          price: item.prices[size]
        };
        setCartItems([...cartItems, newItem]);
      }

      // Update total price
      const newTotal = cartItems.reduce((sum, cartItem) => 
        sum + (cartItem.price * cartItem.quantity), 0
      ) + (item.prices[size] || 0);
      setTotalPrice(newTotal);

      toast.success('Item added to cart!');
    } catch (error) {
      console.error('Error with cart operation:', error);
      if (error.message.includes('login')) {
        toast.error(error.message);
        navigate('/login');
      } else {
        toast.error('Failed to perform cart operation. Please try again.');
      }
    }
  };

  const removeFromCart = (itemId, size) => {
    try {
      if (!isLoggedIn) {
        throw new Error('Please login to manage your cart');
      }

      const updatedCart = cartItems.filter(
        item => !(item._id === itemId && item.size === size)
      );
      setCartItems(updatedCart);

      // Update total price
      const removedItem = cartItems.find(
        item => item._id === itemId && item.size === size
      );
      if (removedItem) {
        const newTotal = totalPrice - (removedItem.price * removedItem.quantity);
        setTotalPrice(newTotal);
      }

      toast.success('Item removed from cart!');
    } catch (error) {
      console.error('Error removing item from cart:', error);
      toast.error('Failed to remove item from cart. Please try again.');
    }
  };

  const updateQuantity = (itemId, size, quantity) => {
    try {
      if (!isLoggedIn) {
        throw new Error('Please login to manage your cart');
      }

      if (quantity < 1) {
        removeFromCart(itemId, size);
        return;
      }

      const updatedCart = cartItems.map(item => 
        item._id === itemId && item.size === size 
          ? { ...item, quantity }
          : item
      );
      setCartItems(updatedCart);

      // Update total price
      const updatedItem = updatedCart.find(
        item => item._id === itemId && item.size === size
      );
      if (updatedItem) {
        const priceDiff = (updatedItem.price * quantity) - (updatedItem.price * updatedItem.quantity);
        setTotalPrice(totalPrice + priceDiff);
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
      toast.error('Failed to update quantity. Please try again.');
    }
  };

  const clearCart = () => {
    try {
      setCartItems([]);
      setTotalPrice(0);
      toast.success('Cart cleared!');
      
      // Navigate back to home after clearing
      navigate('/');
    } catch (error) {
      console.error('Error clearing cart:', error);
      toast.error('Failed to clear cart. Please try again.');
    }
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      totalPrice,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
