import React, { useState, useEffect } from 'react';
import './HomePage.css';

const HomePage = () => {
  const [categories, setCategories] = useState([]);

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
    console.log(categories);
  }, []);
  const handleCategoryChange = (event) => {
    console.log('Retter', event.target.value);
  };

  return (
    <div>
    <h1>Home</h1>
    <select onChange={handleCategoryChange}>
    <option value="" >Select a category</option>
      {categories.map((category) => (
        <option key={category.id} value={category.id}>
          {category.categoryTitle}
        </option>
      ))}
    </select>
  </div>
);
};

export default HomePage;