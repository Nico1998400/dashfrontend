import { useEffect, useState } from "react";

const EditFoodItem = ({ foodItemId, categoryId, onClose, onSave }) => {
    const [foodItem, setFoodItem] = useState({});
  
    const fetchFoodItem = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/v1/fooditem/${foodItemId}`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          
        });
        console.log("foodItemID", foodItemId)
        if (!response.ok) {
          throw new Error(`Failed to fetch food item: ${response.statusText}`);
        }
  
        const fetchedFoodItem = await response.json();
        setFoodItem(fetchedFoodItem);
      } catch (error) {
        console.error('Error fetching food item:', error);
      }
    };
  
    useEffect(() => {
      fetchFoodItem();
    }, [foodItemId]);
  
    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setFoodItem({ ...foodItem, [name]: value });
    };
  
    const handleSaveClick = async (event) => {
      event.preventDefault();
    
      const updatedFoodItem = { ...foodItem, category: { id: categoryId } };
    
      try {
        const response = await fetch(`http://localhost:8080/api/v1/fooditem/${foodItemId}`, {
          method: 'PUT',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedFoodItem),
        });
    
        if (!response.ok) {
          throw new Error(`Failed to update food item: ${response.statusText}`);
        }
    
        onSave(updatedFoodItem);
      } catch (error) {
        console.error('Error updating food item:', error);
      }
    };
  
    return (
      <div>
        <h2>Edit Food Item</h2>
        <form onSubmit={handleSaveClick}>
          <div>
            <label htmlFor="foodName">Name:</label>
            <input
              type="text"
              id="foodName"
              name="foodName"
              value={foodItem.foodName || ''}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="foodDescription">Description:</label>
            <textarea
              id="foodDescription"
              name="foodDescription"
              value={foodItem.foodDescription || ''}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="foodNumber">Number:</label>
            <input
              type="number"
              id="foodNumber"
              name="foodNumber"
              value={foodItem.foodNumber || ''}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="price">Price:</label>
            <input
              type="number"
              id="price"
              name="price"
              value={foodItem.price || ''}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit">Save</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    );
  };
  
  export default EditFoodItem;