import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import CreateRFP from "./CreateRFP";
import axiosInstance from "../utills/Apihook";
function SelectCategory({ totalRFP , setCreateRFP }) {
  const [selectedCategories, setSelectedCategories] = useState([]);

  const [Categories, setCategories] = useState([]);
  const [newRFP, setNewRFP] = useState(false);
  console.log(Categories);

  const handleCancel = () => {
    setSelectedCategories([]);
    setCreateRFP(false);
  };

  const handleSubmit = () => {
    setNewRFP(true);
  };
  useEffect(() => {
    (async () => {
      try {
        const response = await axiosInstance.get("/categories");
        console.log(response.data.categories);
        setCategories(Object.values(response.data.categories) || []);
        
         
      } catch (error) {
        console.error("Failed to fetch vendors:", error);
        setCategories([]);
      }
    })();
  }, []);


  const handleCategoryChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
    setSelectedCategories(selectedOptions);
  };

  console.log(selectedCategories);
  return (
    <div>
      {!newRFP ? (
        <div className="p-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Select Categories
            </label>
            <select
              className="shadow border rounded w-full py-2 px-3 text-gray-700"
              value={selectedCategories}
              onChange={handleCategoryChange}
              multiple
            >
              {Categories?.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              onClick={handleCancel}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Submit
            </button>
          </div>
        </div>
      ) : (
        <CreateRFP totalRFP={totalRFP} setCreateRFP={setCreateRFP} setNewRFP={setNewRFP} selectedCategories={selectedCategories} />
      )}
    </div>
  );
}

export default SelectCategory;