import React, { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [showLogin, setShowLogin] = useState(false);
  const [formType, setFormType] = useState("Login");
  const url = "http://localhost:4000";
  const [token, setToken] = useState(() => localStorage.getItem("token") || "");
  const [user, setUser] = useState(() => {
    const savedName = localStorage.getItem("name");
    const savedEmail = localStorage.getItem("email");
    const savedImage = localStorage.getItem("profileImage");
    const savedIsAdmin = localStorage.getItem("isAdmin") === "true";

    return savedName && savedEmail
        ? { name: savedName, email: savedEmail, profileImage: savedImage, isAdmin: savedIsAdmin }
        : null;
  });

  useEffect(() => {
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
  }, [token]);

  useEffect(() => {
    if (user) {
      localStorage.setItem("name", user.name);
      localStorage.setItem("email", user.email);
      localStorage.setItem("profileImage", user.profileImage);
      localStorage.setItem("isAdmin", user.isAdmin);
    } else {
      localStorage.removeItem("name");
      localStorage.removeItem("email");
      localStorage.removeItem("profileImage");
      localStorage.removeItem("isAdmin");
    }
  }, [user]);

  const contextValue = {
    url,
    token,
    setToken,
    user,
    setUser,
    showLogin,
    setShowLogin,
    formType,
    setFormType,
  };

  return (
      <StoreContext.Provider value={contextValue}>
        {props.children}
      </StoreContext.Provider>
  );
};

export default StoreContextProvider;
