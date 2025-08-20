import reviewModel from "../models/reviewModel.js";

const createReview = async (req, res) => {
  const { name, rating, comment, location } = req.body;

  try {
    if (!name || !rating || !comment) {
      return res.status(400).json({
        success: false,
        message: "Name, rating, and comment are required",
      });
    }

    const newReview = new reviewModel({
      name,
      rating,
      comment,
      location,
    });

    const savedReview = await newReview.save();
    res.status(201).json({
      success: true,
      data: savedReview,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating review",
      error: error.message,
    });
  }
};

const getReviews = async (req, res) => {
  try {
    let reviews = await reviewModel.find().sort({ createdAt: -1 });

    // If no reviews exist, create some test data
    if (reviews.length === 0) {
      const testReviews = [
        {
          name: "John Smith",
          rating: 5,
          comment: "Best pizza in town! The crust is perfect and toppings are fresh.",
          location: "Colombo"
        },
        {
          name: "Sarah Wilson",
          rating: 4,
          comment: "Great service and delicious food. Will come back again!",
          location: "Kandy"
        },
        {
          name: "Michael Brown",
          rating: 5,
          comment: "Amazing pizza and friendly staff. Highly recommended!",
          location: "Galle"
        }
      ];

      // Insert test reviews
      await reviewModel.insertMany(testReviews);
      
      // Fetch the newly created reviews
      reviews = await reviewModel.find().sort({ createdAt: 1 });
    }

    res.status(200).json({
      success: true,
      data: reviews,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching reviews",
      error: error.message,
    });
  }
};

export { createReview, getReviews };