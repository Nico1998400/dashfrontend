import React, { useState } from "react";
import "./EditWebsite.css";
import { AiOutlinePlus } from "react-icons/ai";
import CategoryList from "../components/CategoryList";
import CategoryCreate from "../components/CategoryCreate";

const EditWebiste = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedCategoryTitle, setSelectedCategoryTitle] = useState("");

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
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
    </div>
  );
};

export default EditWebiste;
