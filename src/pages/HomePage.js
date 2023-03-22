import React, { useState, useEffect } from 'react';
import './HomePage.css';
import EditFoodItem from '../components/EditFoodItem';

const HomePage = () => {
  const [categories, setCategories] = useState([]);
  const [foodItems, setFoodItems] = useState([]);
  const [foodItemId, setFoodItemId] = useState(null);

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/v1/category', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch categories: ${response.statusText}`);
      }

      const fetchedCategories = await response.json();
      setCategories(fetchedCategories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);
  
const [selectedCategoryId, setSelectedCategoryId] = useState(null);

 
const handleCategoryChange = (event) => {
  const categoryId = event.target.value;
  if (categoryId) {
    const selectedCategory = categories.find((category) => category.id === parseInt(categoryId));
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
      prevFoodItems.map((foodItem) => (foodItem.id === updatedFoodItem.id ? updatedFoodItem : foodItem))
    );
    setFoodItemId(null);
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
      <div className="food-items">
        {foodItems.map((foodItem) => (
          <div key={foodItem.id} className="food-item">
            <h3>{foodItem.foodName}</h3>
            <p>{foodItem.foodDescription}</p>
            <p>Food Number: {foodItem.foodNumber}</p>
            <p>Price: {foodItem.price}</p>
            <button onClick={() => handleEditClick(foodItem.id)}>Edit</button>
          </div>
        ))}
      </div>
      
      {foodItemId && <EditFoodItem foodItemId={foodItemId} onClose={handleEditClose} onSave={handleEditSave} categoryId={selectedCategoryId} />}
    </div>
  );
};

export default HomePage;