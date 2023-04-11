import React, { useState, useEffect } from 'react';
import "./FoodItemList.css";
import { BsFillTrashFill } from "react-icons/bs";
import { MdModeEdit } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
const FoodItemList = ({ selectedCategoryId }) => {
  const [foodItems, setFoodItems] = useState([]);

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
  }, [selectedCategoryId]);

  const filteredFoodItems = foodItems.filter(foodItem => foodItem.category.id === selectedCategoryId);

  return (
    <div className="fooditemlist-container">
    {filteredFoodItems.map((foodItem) => (
      <div key={foodItem.id} className="food-item">
        <div className="icon-container">
          <BsThreeDotsVertical className="dot-icon" />
          <MdModeEdit className="pen-icon" />
        </div>
        <div className="food-info">
          <h3>{foodItem.foodName}</h3>
          <p>{foodItem.foodDescription}</p>
        </div>
        
        <p>Price: {foodItem.price}</p>
        <BsFillTrashFill className="trash-icon" />
      </div>
    ))}
  </div>
  );
};

export default FoodItemList;