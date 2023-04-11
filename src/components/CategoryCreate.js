import React from 'react'
import { useState } from "react";
import "./CategoryCreate.css";

const CategoryCreate = ({ isOpen, onClose, onCategoryCreated}) => {
    const [newCategory, setNewCategory] = useState("");

    const handleCreateCategory = async (newCategory) => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/v1/category/post",
          {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ categoryTitle: newCategory }),
          }
        );
    
        if (!response.ok) {
          throw new Error(`Failed to create category: ${response.statusText}`);
        }
    
        setNewCategory("");
        onClose(); // Close the popup
        onCategoryCreated();
      } catch (error) {
        console.error("Error creating category:", error);
      }
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      handleCreateCategory(newCategory);
      setNewCategory("");
    };
  
    if (!isOpen) {
      return null;
    }

  return (
    <div className="category-popup-container">
    <div className="category-popup">
      <h2>New Category</h2>
      <p>Name</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="Category Title"
        />
        <button type="submit">Create</button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </form>
    </div>
  </div>
  )
}

export default CategoryCreate