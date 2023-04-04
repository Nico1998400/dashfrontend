import EditFoodItem from "../components/EditFoodItem";
import React, { useState } from "react";
import "./EditWebsite.css";
import { AiOutlinePlus } from "react-icons/ai";
import CategoryList from "../components/CategoryList";
import CategoryCreate from "../components/CategoryCreate";

const EditWebiste = () => {
  const [categories, setCategories] = useState([]);
  const [foodItems, setFoodItems] = useState([]);
  const [foodItemId, setFoodItemId] = useState(null);
  const [shouldFetchCategories, setShouldFetchCategories] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedCategoryTitle, setSelectedCategoryTitle] = useState("");

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const handleDeleteFoodItem = async (foodItemId) => {
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
    <div className="category-grid">
      <div className="category-section">
        <div className="category-header">
          <h2 className="seperate-arrow-open">Category</h2>
          <AiOutlinePlus className="arrow-open" onClick={openPopup} />
        </div>
        <CategoryList setSelectedCategoryTitle={setSelectedCategoryTitle} />
      </div>
      <div className="category-name">
        <h2 className="seperate-arrow-open">{selectedCategoryTitle || "CategoryName"}</h2>
        <AiOutlinePlus className="arrow-open" />
      </div>
      <CategoryCreate isOpen={isPopupOpen} onClose={closePopup} />
      <>
        <div className="food-items">
          {foodItems.map((foodItem) => (
            <div key={foodItem.id} className="food-item">
              <h3>{foodItem.foodName}</h3>
              <p>{foodItem.foodDescription}</p>
              <p>Food Number: {foodItem.foodNumber}</p>
              <p>Price: {foodItem.price}</p>
              <button onClick={() => handleEditClick(foodItem.id)}>Edit</button>
              <button onClick={() => handleDeleteFoodItem(foodItem.id)}>
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
      </>
    </div>
  );
};

export default EditWebiste;
