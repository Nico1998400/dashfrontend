import React, { useState } from "react";
import "./EditWebsite.css";
import { AiOutlinePlus } from "react-icons/ai";
import CategoryList from "../components/CategoryList";
import CategoryCreate from "../components/CategoryCreate";
import FoodItemCreate from "../components/FoodItemCreate";
import FoodItemList from "../components/FoodItemList";

const EditWebiste = () => {
  const [isCategoryPopupOpen, setIsCategoryPopupOpen] = useState(false);
  const [isFoodItemPopupOpen, setIsFoodItemPopupOpen] = useState(false);
  const [selectedCategoryTitle, setSelectedCategoryTitle] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [refreshCategories, setRefreshCategories] = useState(false);
  const [refreshFoodItems, setRefreshFoodItems] = useState(false);


  const refreshCategoryList = () => {
  setRefreshCategories(!refreshCategories);
  };
  const refreshFoodItemList = () => {
    setRefreshFoodItems(!refreshFoodItems);
  };

  const openCategoryPopup = () => {
    setIsCategoryPopupOpen(true);
  };

  const closeCategoryPopup = () => {
    setIsCategoryPopupOpen(false);
  };

  const openFoodItemPopup = () => {
    setIsFoodItemPopupOpen(true);
  };

  const closeFoodItemPopup = () => {
    setIsFoodItemPopupOpen(false);
  };

  return (
    <div className="category-grid">
      <div className="category-section">
        <div className="category-header">
          <h2 className="seperate-arrow-open">Category</h2>
          <AiOutlinePlus className="arrow-open" onClick={openCategoryPopup} />
        </div>
        <CategoryList
          refreshCategories={refreshCategories}
          setSelectedCategoryTitle={setSelectedCategoryTitle}
          setSelectedCategoryId={setSelectedCategoryId}
        />
      </div>
      <div className="category-section">
      <div className="category-name">
        <h2 className="seperate-arrow-open">
          {selectedCategoryTitle || "CategoryName"}
        </h2>
        <AiOutlinePlus className="arrow-open" onClick={openFoodItemPopup} />
      </div>
      <FoodItemList 
      selectedCategoryId={selectedCategoryId}
      refreshFoodItems={refreshFoodItemList} 
       />
      </div>
      <FoodItemCreate
        onFoodItemCreated={refreshFoodItemList}
        refreshCategories={refreshCategories}
        isOpen={isFoodItemPopupOpen}
        onClose={closeFoodItemPopup}
        selectedCategoryId={selectedCategoryId}
        selectedCategoryTitle={selectedCategoryTitle}
      />
      <CategoryCreate
        isOpen={isCategoryPopupOpen}
        onClose={closeCategoryPopup}
        onCategoryCreated={refreshCategoryList}
      />
    </div>
  );
};

export default EditWebiste;
