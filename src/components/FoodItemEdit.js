import React, { useState, useEffect } from "react";

const FoodItemEdit = ({ isOpen, onClose, foodItem }) => {
  const [updatedFoodItem, setUpdatedFoodItem] = useState({});

  useEffect(() => {
    if (foodItem) {
      setUpdatedFoodItem(foodItem);
    }
  }, [foodItem]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/fooditem/${foodItem.id}`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedFoodItem),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to update food item: ${response.statusText}`);
      }

      const updatedFoodItemData = await response.json();
      setUpdatedFoodItem({});
      onClose(updatedFoodItemData);
    } catch (error) {
      console.error("Error updating food item:", error);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fooditem-popup-container">
      <div className="fooditem-popup">
        <h2>Edit Food Item</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={updatedFoodItem.foodName}
            onChange={(e) =>
              setUpdatedFoodItem({
                ...updatedFoodItem,
                foodName: e.target.value,
              })
            }
            placeholder="Food Name"
          />
          <textarea
            value={updatedFoodItem.foodDescription}
            onChange={(e) =>
              setUpdatedFoodItem({
                ...updatedFoodItem,
                foodDescription: e.target.value,
              })
            }
            placeholder="Food Description"
          />
          <input
            type="number"
            value={updatedFoodItem.price}
            onChange={(e) =>
              setUpdatedFoodItem({
                ...updatedFoodItem,
                price: parseFloat(e.target.value),
              })
            }
            placeholder="Price"
          />
          <button type="submit">Update</button>
          <button type="button" onClick={() => onClose(null)}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default FoodItemEdit;