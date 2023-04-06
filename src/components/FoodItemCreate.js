import React, { useState, useEffect } from 'react';
import './FoodItemCreate.css';

function FoodItemCreate({ isOpen, onClose }) {
  const [newFoodItem, setNewFoodItem] = useState({
    foodName: '',
    foodDescription: '',
    foodNumber: '',
    price: '',
    category: null,
  });
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedCategoryTitle, setSelectedCategoryTitle] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

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

  const handleCreateFoodItem = async (foodItem) => {
    try {
      const response = await fetch('http://localhost:8080/api/v1/fooditem/post', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...foodItem,
          category: {
            id: selectedCategoryId,
            title: selectedCategoryTitle,
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to create food item: ${response.statusText}`);
      }

      setNewFoodItem({
        foodName: '',
        foodDescription: '',
        foodNumber: '',
        price: '',
        category: null,
      });
      setSelectedCategoryId(null);
      setSelectedCategoryTitle('');
      onClose(); // Close the popup
    } catch (error) {
      console.error('Error creating food item:', error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleCreateFoodItem(newFoodItem);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewFoodItem((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCategoryChange = (e) => {
    const selectedCategory = categories.find(
      (category) => category.id === parseInt(e.target.value)
    );
    setSelectedCategoryId(selectedCategory.id);
    setSelectedCategoryTitle(selectedCategory.categoryTitle);
    setNewFoodItem((prev) => ({
      ...prev,
      category: {
        id: selectedCategory.id,
        title: selectedCategory.categoryTitle,
      },
    }));
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fooditem-popup-container">
      <div className="fooditem-popup">
        <h2>Create New Food Item</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="category">Category</label>
          <select id="category" value={selectedCategoryId} onChange={handleCategoryChange}>
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.categoryTitle}
              </option>
            ))}
          </select>
          <label htmlFor="foodName">Food Name</label>
          <input
            type="text"
            id="foodName"
            name="foodName"
            value={newFoodItem.foodName}
            onChange={handleChange}
            required
          />
          <label htmlFor="foodDescription">Food Description</label>
          <input
            type="text"
            id="foodDescription"
            name="foodDescription"
            value={newFoodItem.foodDescription}
            onChange={handleChange}
            required
          />
          <label htmlFor="foodNumber">Food Number</label>
          <input
            type="number"
            id="foodNumber"
            name="foodNumber"
            value={newFoodItem.foodNumber}
            onChange={handleChange}
            required
          />
          <label htmlFor="price">Price</label>
          <input
            type="number"
            step="0.01"
            id="price"
            name="price"
            value={newFoodItem.price}
            onChange={handleChange}
            required
          />
          <button type="submit">Create</button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

export default FoodItemCreate;