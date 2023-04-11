import React, { useState, useEffect } from 'react';
import "./FoodItemList.css";
import { BsFillTrashFill } from "react-icons/bs";
import { MdModeEdit } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import FoodItemEdit from "./FoodItemEdit";


const FoodItemList = ({ selectedCategoryId, refreshFoodItems }) => {
  const [foodItems, setFoodItems] = useState([]);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [foodItemToEdit, setFoodItemToEdit] = useState(null);


  const openEditPopup = (foodItem) => {
    setFoodItemToEdit(foodItem);
    setIsEditPopupOpen(true);
  };

  const closeEditPopup = (updatedFoodItemData) => {
    if (updatedFoodItemData) {
      setFoodItems((prevFoodItems) =>
        prevFoodItems.map((foodItem) =>
          foodItem.id === updatedFoodItemData.id ? updatedFoodItemData : foodItem
        )
      );
    }
    setIsEditPopupOpen(false);
  };

  useEffect(() => {
    const fetchFoodItems = async () => {
      if (selectedCategoryId === null || selectedCategoryId === "") {
        console.log("No category selected, skipping fetch");
        return;
      }

      try {
        const response = await fetch("http://localhost:8080/api/v1/fooditem", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch food items: ${response.statusText}`);
        }

        const fetchedFoodItems = await response.json();
        console.log("Fetched food items:", fetchedFoodItems);
        setFoodItems(fetchedFoodItems);
      } catch (error) {
        console.error("Error fetching food items:", error);
      }
    };

    console.log("Fetching food items for category ID:", selectedCategoryId);
    fetchFoodItems();
  }, [selectedCategoryId, refreshFoodItems]);

  const filteredFoodItems = foodItems.filter(foodItem => foodItem.category.id === selectedCategoryId);

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
    } catch (error) {
      console.error("Error deleting food item:", error);
    }
  };

  return (
    <div className="fooditemlist-container">
      {filteredFoodItems.map((foodItem) => (
        <div key={foodItem.id} className="food-item">
          <div className="icon-container">
            <BsThreeDotsVertical className="dot-icon" />
            <MdModeEdit
              className="pen-icon"
              onClick={() => openEditPopup(foodItem)}
            />
          </div>
          <div className="food-info">
            <h3>{foodItem.foodName}</h3>
            <p>{foodItem.foodDescription}</p>
          </div>

          <p>Price: {foodItem.price}</p>
          <BsFillTrashFill
            className="trash-icon"
            onClick={() => handleDeleteFoodItem(foodItem.id)}
          />
        </div>
      ))}
      <FoodItemEdit
        isOpen={isEditPopupOpen}
        onClose={closeEditPopup}
        foodItem={foodItemToEdit}
      />
    </div>
  );
};

export default FoodItemList;