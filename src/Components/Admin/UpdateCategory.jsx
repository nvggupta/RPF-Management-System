import { useEffect, useState } from "react";
import axiosInstance from "../utills/Apihook";
import UpdateRFP from "./UpdateRFP";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

function UpdateCategory({ rfpData, setUpdateRFPData }) {
  const oldCategory = rfpData.categories.split(",")[0];
  const [selectedCategory, setSelectedCategory] = useState(oldCategory);
  const [Categories, setCategories] = useState([]);
  const [newRFP, setNewRFP] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      category: oldCategory,
    },
  });

  const handleCancel = () => {
    setUpdateRFPData(null);
  };

  const onSubmit = (data) => {
    setSelectedCategory(data.category);
    setNewRFP(true);
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await axiosInstance.get("/categories");
        if (response.data.response === "success") {
          setCategories(Object.values(response.data.categories) || []);
        } else {
          typeof response.data.errors === "object"
            ? toast.error(response.data.errors[0])
            : toast.error(
                response.data.error ||
                  response.data.errors ||
                  response.data.message
              );
        }
      } catch (error) {
        console.error("Failed to fetch vendors:", error);
        setCategories([]);
      }
    })();
  }, []);

  return (
    <div>
      {!newRFP ? (
        <div className="p-4">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Selected Category<span className="font[200] text-gray-400">(You Can not Change The Category)</span>
              </label>
              <select
                className="shadow border rounded w-full py-2 px-3 text-gray-700"
                {...register("category", { required: "Category is required" })}
                value={selectedCategory}
              >
                <option value="" disabled>Select a category</option>
                {Categories?.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="text-red-500 text-xs italic">
                  {errors.category.message}
                </p>
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
        <UpdateRFP
          rfpData={rfpData}
          setUpdateRFPData={setUpdateRFPData}
          selectedCategory={selectedCategory}
          setNewRFP={setNewRFP}
        />
      )}
    </div>
  );
}

export default UpdateCategory;
