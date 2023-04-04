import React, { useState, useEffect } from "react";

const CategoryEdit = ({ isOpen, onClose, category }) => {
  const [updatedCategory, setUpdatedCategory] = useState("");

  useEffect(() => {
    if (category) {
      setUpdatedCategory(category.categoryTitle);
    }
  }, [category]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/category/${category.id}`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ categoryTitle: updatedCategory }),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to update category: ${response.statusText}`);
      }

      const updatedCategoryData = await response.json();
      setUpdatedCategory("");
      onClose(updatedCategoryData);
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="category-popup-container">
      <div className="category-popup">
        <h2>Edit Category</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={updatedCategory}
            onChange={(e) => setUpdatedCategory(e.target.value)}
            placeholder="Category Title"
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

export default CategoryEdit;