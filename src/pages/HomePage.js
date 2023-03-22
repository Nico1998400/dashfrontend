import React, { useState, useEffect } from "react";
import "./HomePage.css";
import EditFoodItem from "../components/EditFoodItem";

const HomePage = () => {
  const [categories, setCategories] = useState([]);
  const [foodItems, setFoodItems] = useState([]);
  const [foodItemId, setFoodItemId] = useState(null);
  const [shouldFetchCategories, setShouldFetchCategories] = useState(false);

  const fetchCategories = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/v1/category", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch categories: ${response.statusText}`);
      }

      const fetchedCategories = await response.json();
      setCategories(fetchedCategories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/category/${categoryId}`,
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to delete category: ${response.statusText}`);
      }

      setCategories((prevCategories) =>
        prevCategories.filter((category) => category.id !== categoryId)
      );
      setFoodItems([]);
      setSelectedCategoryId(null);
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };
  

  const handleDeleteClick = async (foodItemId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/fooditem/${foodItemId}`,
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to delete food item: ${response.statusText}`);
      }

      setFoodItems((prevFoodItems) =>
        prevFoodItems.filter((foodItem) => foodItem.id !== foodItemId)
      );
      setShouldFetchCategories(
        (prevShouldFetchCategories) => !prevShouldFetchCategories
      );
    } catch (error) {
      console.error("Error deleting food item:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [shouldFetchCategories]);

  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const handleCategoryChange = (event) => {
    const categoryId = event.target.value;
    if (categoryId) {
      const selectedCategory = categories.find(
        (category) => category.id === parseInt(categoryId)
      );
      setFoodItems(selectedCategory.foodItems);
      setSelectedCategoryId(parseInt(categoryId));
    } else {
      setFoodItems([]);
      setSelectedCategoryId(null);
    }
  };

  const handleEditClick = (foodItemId) => {
    setFoodItemId(foodItemId);
  };

  const handleEditClose = () => {
    setFoodItemId(null);
  };

  const handleEditSave = (updatedFoodItem) => {
    setFoodItems((prevFoodItems) =>
      prevFoodItems.map((foodItem) =>
        foodItem.id === updatedFoodItem.id ? updatedFoodItem : foodItem
      )
    );
    setFoodItemId(null);
    setShouldFetchCategories(
      (prevShouldFetchCategories) => !prevShouldFetchCategories
    );
  };

  return (
    <div>
    <h1>Home</h1>
    <select onChange={handleCategoryChange}>
      <option value="">Select a category</option>
      {categories.map((category) => (
        <option key={category.id} value={category.id}>
          {category.categoryTitle}
        </option>
      ))}
    </select>
    <button
      className="delete-category-button"
      onClick={() => handleDeleteCategory(selectedCategoryId)}
    >
      Delete Category
    </button>
      <div className="food-items">
        {foodItems.map((foodItem) => (
          <div key={foodItem.id} className="food-item">
            <h3>{foodItem.foodName}</h3>
            <p>{foodItem.foodDescription}</p>
            <p>Food Number: {foodItem.foodNumber}</p>
            <p>Price: {foodItem.price}</p>
            <button onClick={() => handleEditClick(foodItem.id)}>Edit</button>
            <button onClick={() => handleDeleteClick(foodItem.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>

      {foodItemId && (
        <EditFoodItem
          foodItemId={foodItemId}
          onClose={handleEditClose}
          onSave={handleEditSave}
          categoryId={selectedCategoryId}
        />
      )}
    </div>
  );
};

export default HomePage;
