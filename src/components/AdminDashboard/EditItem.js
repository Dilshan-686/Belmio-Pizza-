import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { menuServices } from "../../Services/MenuServices";

const CLOUDINARY_CLOUD_NAME = "dnhvrcls9";
const UPLOAD_PRESET = "KickOff";

const EditItem = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get item ID from URL params
  const [formData, setFormData] = useState({
    name: "",
    category: "Pizza",
    description: "",
    prices: {
      medium: "",
      large: "",
    },
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch the existing item data
  useEffect(() => {
    const fetchItemData = async () => {
      try {
        setLoading(true)
        const item = await menuServices.getItemById(id);
        if (item) {
          setFormData({
            name: item.name,
            category: item.category,
            description: item.description,
            image: item.image || "",
            prices: {
              medium: item.prices.medium.toString(),
              large: item.prices.large.toString(),
            }

          });
        }
        else {
          toast.error("Post not found!");
          navigate("/");
        }
      } catch (error) {
        toast.error("Failed to load menu item.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchItemData();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "medium" || name === "large") {
      setFormData((prev) => ({
        ...prev,
        prices: { ...prev.prices, [name]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const uploadImageToCloudinary = async () => {
    if (!image) return formData.image;

    const imageFormData = new FormData();
    imageFormData.append("file", image);
    imageFormData.append("upload_preset", UPLOAD_PRESET);

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        imageFormData
      );
      return response.data.secure_url;
    } catch (err) {
      toast.error("Image upload failed.");
      return null;
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.name || !formData.description || !formData.prices.medium || !formData.prices.large) {
      toast.error("Please fill all the fields.");
      setLoading(false);
      return;
    }

    const uploadedImageUrl = await uploadImageToCloudinary();

    if (!uploadedImageUrl && !image) {
      toast.error("Image upload failed.");
      setLoading(false);
      return;
    }

    const updatedItem = {
      category: formData.category,
      name: formData.name,
      description: formData.description,
      prices: {
        medium: parseFloat(formData.prices.medium),
        large: parseFloat(formData.prices.large),
      },
      image: uploadedImageUrl || image, // If image isn't changed, keep the old one
    };

    try {
      await menuServices.updateItem(id, updatedItem);
      toast.success("Item updated successfully!");
      navigate("/menu");
    } catch (err) {
      toast.error("Failed to update item.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg p-8 mt-28 rounded-2xl">
      <h2 className="text-4xl font-bold text-gray-800 mb-6 text-center">
        <span className="text-black">EDIT MENU <span className="text-orange-500">ITEM</span></span>
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Category */}
        <div>
          <label className="block mb-1 font-medium">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-xl"
            required
          >
            <option value="">Select Category</option>
            <option value="pizza">Pizza</option>
            <option value="calzone">Calzone</option>
            <option value="pasta">Pasta</option>
            <option value="mains">Mains</option>
            <option value="sides">Sides</option>
            <option value="soup">Soup</option>
            <option value="salad">Salad</option>
            <option value="risotto">Risotto</option>
            <option value="desserts">Desserts</option>
            <option value="beverages">Beverages</option>
          </select>
        </div>

        {/* Item Name */}
        <div>
          <label className="block mb-1 font-medium">Item Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-xl"
            placeholder="e.g., Spaghetti Carbonara"
            required
          />
        </div>

        {/* Upload Image */}
        <div>
          <label className="block mb-1 font-medium">Upload Image</label>

          {/* Hide the actual file input */}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
            id="file-upload"
          />

          {/* Custom label styled as a button */}
          <label
            htmlFor="file-upload"
            className="inline-block px-4 py-2 bg-gray-200 rounded-xl cursor-pointer hover:bg-gray-300"
          >
            Change Image
          </label>

          {/* Show file name if selected */}
          {image && (
            <p className="mt-2 text-sm text-gray-600">{image.name}</p>
          )}
        </div>




        {image ? (
          <img src={URL.createObjectURL(image)} alt="New Preview" className="w-72 h-72 mt-2 rounded-lg shadow-md" />
        ) : (
          formData.image && (
            <img src={formData.image} alt="Current Cover" className="w-72 h-72 mt-2 rounded-lg shadow-md" />
          )
        )}


        {/* Description */}
        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            className="w-full p-2 border border-gray-300 rounded-xl"
            placeholder="Short description of the item"
            required
          />
        </div>

        {/* Prices */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Medium Size Price (Rs)</label>
            <input
              type="number"
              name="medium"
              value={formData.prices.medium}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-xl"
              placeholder="e.g., Rs. 1499.00"
              step="0.01"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Large Size Price (Rs)</label>
            <input
              type="number"
              name="large"
              value={formData.prices.large}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-xl"
              placeholder="e.g., RS. 2999.00"
              step="0.01"
              required
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-orange-500 text-white py-2 rounded-xl hover:bg-red-700 transition duration-200 flex justify-center items-center"
        >
          {loading ? (
            <span className="animate-spin inline-block w-5 h-5 border-[3px] border-white border-t-transparent rounded-full"></span>
          ) : (
            "Update Item"
          )}
        </button>
      </form>
    </div>
  );
};

export default EditItem;
