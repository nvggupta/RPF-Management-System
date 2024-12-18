import { useEffect, useState } from "react";
import CreateRFP from "./CreateRFP";
import axiosInstance from "../utills/Apihook";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

function SelectCategory({ totalRFP , setCreateRFP }) {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const [Categories, setCategories] = useState([]);
  const [newRFP, setNewRFP] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  console.log(Categories);

  const handleCancel = () => {
    setValue("category", "");
    setSelectedCategory("");
    setCreateRFP(false);
  };

  const onSubmit = (data) => {
    setSelectedCategory(data.category);
    setNewRFP(true);
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await axiosInstance.get("/categories");
        console.log(response.data.categories);
        if(response.data.response === "success"){
          setCategories(Object.values(response.data.categories) || []);
        }
        else{
          typeof response.data.errors === "object" ? toast.error(response.data.errors[0]) : toast.error(response.data.error || response.data.errors || response.data.message);
        }
      } catch (error) {
        console.error("Failed to fetch vendors:", error);
        setCategories([]);
        toast.error("Error Occured In Fetching Category");
      }
    })();
  }, []);

  console.log(selectedCategory);
  return (
    <div>
      {!newRFP ? (
        <div className="p-4">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Select Category
              </label>
              <select
                className="shadow border rounded w-full py-2 px-3 text-gray-700"
                {...register("category", { required: "Please select a category" })}
              >
                <option value="">Select a category</option>
                {Categories?.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="text-red-500 text-xs italic">{errors.category.message}</p>
              )}
            </div>
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={handleCancel}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      ) : (
        <CreateRFP totalRFP={totalRFP} setCreateRFP={setCreateRFP} setNewRFP={setNewRFP} selectedCategories={[selectedCategory]} />
      )}
    </div>
  );
}

export default SelectCategory;