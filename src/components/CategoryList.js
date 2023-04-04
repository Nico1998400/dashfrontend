import React, { useState, useEffect } from "react";
import "./CategoryList.css";
import { BsFillTrashFill } from "react-icons/bs";
import { MdModeEdit } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import CategoryEdit from "./CategoryEdit";

const CategoryList = ({setSelectedCategoryTitle}) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState(null);

  const handleCategoryClick = (categoryTitle) => {
    setSelectedCategoryTitle(categoryTitle);
  };

  const openEditPopup = (category) => {
    setCategoryToEdit(category);
    setIsEditPopupOpen(true);
  };

  const handleCreateCategory = (createdCategory) => {
    setCategories((prevCategories) => [...prevCategories, createdCategory]);
  };

  const closeEditPopup = (updatedCategoryData) => {
    if (updatedCategoryData) {
      setCategories((prevCategories) =>
        prevCategories.map((category) =>
          category.id === updatedCategoryData.id ? updatedCategoryData : category
        )
      );
    }
    setIsEditPopupOpen(false);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

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
      setSelectedCategoryId(null);
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  return (
   <div className="categorylist-container">
      {categories.map((category) => (
        <div key={category.id} className="category-item" onClick={() => handleCategoryClick(category.categoryTitle)}>
          <div className="icon-container">
            <BsThreeDotsVertical className="dot-icon" />
            <MdModeEdit
              className="pen-icon"
              onClick={() => openEditPopup(category)}
            />
          </div>
          <p>{category.categoryTitle}</p>
          <BsFillTrashFill
            className="trash-icon"
            onClick={() => handleDeleteCategory(category.id)}
          />
        </div>
      ))}
      <CategoryEdit
        isOpen={isEditPopupOpen}
        onClose={closeEditPopup}
        category={categoryToEdit}
      />
    </div>
  );
};

export default CategoryList;
