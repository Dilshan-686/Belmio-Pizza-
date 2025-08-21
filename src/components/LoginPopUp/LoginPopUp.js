import React, { useContext, useState, useEffect } from "react";
import { StoreContext } from "../../context/StoreContext.js";
import axios from "axios";
import Logo from "../../assests/logo.jpg";
import { useNavigate } from "react-router-dom";

function LoginPopUp({ setShowLogin, formType, setFormType }) {
  const { url, setToken, setUser } = useContext(StoreContext);
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onLogin = async (event) => {
    event.preventDefault();
    let endpoint = url;
    endpoint += formType === "Login" ? "/api/user/login" : "/api/user/register";

    try {
      const response = await axios.post(endpoint, data);

      if (response.data.success) {
        // Save token, profile image, name, email, and admin status to localStorage
        localStorage.setItem("token", response.data.token);
        localStorage.setItem(
            "profileImage",
            response.data.profileImage && response.data.profileImage !== ""
                ? response.data.profileImage
                : "default-profile.png"
        );
        localStorage.setItem("name", response.data.name || "");
        localStorage.setItem("email", response.data.email || "");
        localStorage.setItem("isAdmin", response.data.isAdmin);

        // Update context
        setToken(response.data.token);
        setUser({
          name: response.data.name || "",
          email: response.data.email || "",
          profileImage:
              response.data.profileImage && response.data.profileImage !== ""
                  ? response.data.profileImage
                  : "default-profile.png",
          isAdmin: response.data.isAdmin,
        });

        // Close login popup
        setShowLogin(false);

        // Redirect admin users to dashboard
        if (response.data.isAdmin) {
          navigate("/admin/dashboard");
        } else {
          // Optionally navigate regular users somewhere
          navigate("/");
        }
      } else {
        // Handle unsuccessful login/signup
        setErrorMessage(response.data.message || "Login/Signup failed");
      }
    } catch (error) {
      setErrorMessage(
          error.response?.data?.message || "An unexpected error occurred."
      );
    }
  };

  // Reset error message when formType changes
  useEffect(() => {
    setErrorMessage("");
  }, [formType]);

  return (
      <div className="fixed font-passion inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-mygray rounded-lg shadow-lg w-full max-w-md p-6 relative">
          {/* Header */}
          <button
              onClick={() => setShowLogin(false)}
              className="text-gray-500 hover:text-gray-700 text-lg absolute right-5 top-5"
          >
            &times;
          </button>

          {/* Logo Section */}


          <div className="flex justify-center mb-6">
            <img
                src={Logo} // Replace with your logo's path
                alt="Logo"
                className="h-12"
            />
          </div>




          <div className="flex justify-center items-center mb-4">
            <h2 className="text-3xl font-extrabold text-center text-black mb-1">
              {formType === "Login" ? (
                  <>
                    LOG <span className="text-orange-500">IN</span>
                  </>
              ) : (
                  <>
                    SIGN <span className="text-orange-500">IN</span>
                  </>
              )}
            </h2>


          </div>
          <div className="text-sm text-center text-gray-600 mb-7">
            {formType === "Login" ? (
                <>
                  Don't have an account?{" "}
                  <button
                      onClick={(event) => {
                        event.preventDefault();
                        setFormType("Sign Up");
                      }}
                      className="text-blue-600 hover:text-blue-700"
                  >
                    Sign Up
                  </button>
                </>
            ) : (
                <>
                  Already have an account?{" "}
                  <button
                      onClick={(event) => {
                        event.preventDefault();
                        setFormType("Login");
                      }}
                      className="text-blue-600 hover:text-blue-700"
                  >
                    Login
                  </button>
                </>
            )}
          </div>

          {/* Error Message */}
          {errorMessage && (
              <div className="mb-4 bg-red-100 border border-red-400 text-red-600 text-sm p-3 rounded-lg">
                <strong>{errorMessage}</strong>
              </div>
          )}

          {/* Form */}
          <form onSubmit={onLogin}>
            {formType === "Sign Up" && (
                <div className="mb-4">
                  <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Name
                  </label>
                  <input
                      type="text"
                      name="name"
                      onChange={onChangeHandler}
                      value={data.name}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="John Doe"
                      required
                  />
                </div>
            )}

            <div className="mb-4">
              <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email Address
              </label>
              <input
                  type="email"
                  name="email"
                  onChange={onChangeHandler}
                  value={data.email}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="name@example.com"
                  required
              />
            </div>

            <div className="mb-4">
              <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                  type="password"
                  name="password"
                  onChange={onChangeHandler}
                  value={data.password}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your password"
                  required
              />
            </div>

            <button
                type="button"
                onClick={() => {
                  window.location.href = "http://localhost:4000/api/user/google";
                  // 👆 replace with your backend URL if deployed
                }}
                className="w-full mt-2 mb-6 flex items-center justify-center gap-2 bg-white border border-gray-300 rounded-lg py-2 px-4 shadow-sm hover:bg-gray-100 transition"
            >
              <img
                  src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                  alt="Google logo"
                  className="w-5 h-5"
              />
              <span className="text-gray-700 font-medium">Continue with Google</span>
            </button>

            <button
                type="submit"
                className="w-full bg-ouror opacity-80 hover:opacity-100 transition duration-300 text-white font-medium py-2 px-4 rounded-lg focus:outline-none mb-4 focus:ring-4 focus:ring-blue-300"
            >
              {formType === "Login" ? "Login" : "Sign Up"}
            </button>

          </form>
        </div>
      </div>
  );
}

export default LoginPopUp;
