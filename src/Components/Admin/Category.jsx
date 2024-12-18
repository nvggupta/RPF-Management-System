import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { setCategory } from "../Features/RPFslice";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

function Category() {
  const [category, setLocalCategory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [editInd, setEditInd] = useState(null);
  const [changedCategory, setChangedCategory] = useState();
  const [userInfo] = useState(JSON.parse(localStorage.getItem("userInfo")));
  const [addCategory, setAddCategory] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [searchCategory, setSearchCategory] = useState("");
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [deletingId, setDeletingId] = useState(null);
  const [changedCategoryLoading, setChangedCategoryLoading] = useState(false);
  const itemsPerPage = 10;
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const getCategoryList = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        "https://rfpdemo.velsof.com/api/categories",
        {
          headers: {
            Authorization: `Bearer ${userInfo?.token}`,
          },
        }
      );
      console.log(response.data);
      setLocalCategory(Object.values(response?.data?.categories) || []);
      setFilteredCategories(Object.values(response?.data?.categories) || []);
      dispatch(setCategory(Object.values(response?.data?.categories) || []));
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    getCategoryList();
  }, []);

  useEffect(() => {
    if (searchCategory) {
      const filtered = category.filter((cat) =>
        cat.name.toLowerCase().includes(searchCategory.toLowerCase())
      );
      setFilteredCategories(filtered);
      setCurrentPage(1);
    } else {
      setFilteredCategories(category);
    }
  }, [searchCategory, category]);

  const last = currentPage * itemsPerPage;
  const first = last - itemsPerPage;

  const currentItems = filteredCategories?.slice(first, last);
  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);
  console.log(currentItems);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const handleDelete = async (id) => {
    try {
      setDeleteLoading(true);
      setDeletingId(id);
      const response = await axios.delete(
        `https://rfpdemo.velsof.com/api/categories/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${userInfo?.token}`,
          },
        }
      );
      console.log(response.data);
      if (response.data.response === "success") {
        toast.success("Category Deleted Successfully");
        getCategoryList();
        setDeleteLoading(false);
        setDeletingId(null);
      } else {
        toast.error(response.data.error || response.data.errors);
        setDeleteLoading(false);
        setDeletingId(null);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error Deleting Category");
      setDeleteLoading(false);
      setDeletingId(null);
    }
  };
  const handleEditCategory = async () => {
    try {
      setChangedCategoryLoading(true);
      const response = await axios.put(
        `https://rfpdemo.velsof.com/api/categories/${editInd}`,
        {
          name: changedCategory,
          _methhod: "PUT",
        },
        {
          headers: {
            Authorization: `Bearer ${userInfo?.token}`,
          },
        }
      );
      console.log(response.data);
      if (response.data.response === "success") {
        toast.success(response.data.response);
        getCategoryList();
        setEditInd(null);
        setChangedCategory("");
        setChangedCategoryLoading(false);
      } else {
        typeof response.data.errors === "object" ? toast.error(response.data.errors[0]) : toast.error(response.data.error || response.data.errors || response.data.message);
        setChangedCategoryLoading(false);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error Updating Category", error);
      setChangedCategoryLoading(false);
    }
  };
  const handleAddCategory = async (data) => {
    try {
      setSubmitLoading(true);
      const response = await axios.post(
        "https://rfpdemo.velsof.com/api/categories",
        {
          name: data.categoryName,
        },
        {
          headers: {
            Authorization: `Bearer ${userInfo?.token}`,
          },
        }
      );
      console.log(response.data);
      
      if (response.data.response === "success") {
        toast.success(response.data.response);
        getCategoryList();
        reset();
      } else {
        toast.error(response.data?.errors || response.data?.error);
        setAddCategory(false);
      }
    } catch (error) {
      console.log("Error Occured In Add Category");
      toast.error(error);
    } finally {
      setSubmitLoading(false);
      setAddCategory(false);
    }
  };
  if (!userInfo?.token) {
    return (
      <div className="text-center text-xl font-semibold text-gray-600 p-4">
        No Category List
      </div>
    );
  }
  // Add Category
  if (addCategory) {
    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <ToastContainer  />
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <form
            onSubmit={handleSubmit(async (data) => {
              const existingCategory = currentItems.find(
                (item) =>
                  item.name.toLowerCase() === data.categoryName.toLowerCase()
              );
              if (existingCategory) {
                toast.error("Category already exists!");
                reset();
                setAddCategory(false);
                return;
              }
              handleAddCategory(data);
            })}
          >
            <input
              type="text"
              placeholder="Enter Category Name"
              {...register("categoryName", {
                required: "Category name is required",
              })}
              className="border border-gray-300 rounded-md px-4 py-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.categoryName && (
              <p className="text-red-500 text-sm mb-2">
                {errors.categoryName.message}
              </p>
            )}
            <div className="flex justify-end gap-2">
              <button
                type="submit"
                disabled={submitLoading}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors disabled:bg-blue-300"
              >
                {submitLoading ? "Submitting..." : "Submit"}
              </button>
              <button
                type="button"
                onClick={() => {
                  reset();
                  setAddCategory(false);
                }}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }    
  // List Of All Category
  return (
    <div>
      {editInd === null ? (
        <div className="container mx-auto p-4">
          <ToastContainer />
          <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
            <h1 className="text-2xl font-bold text-center">Category List</h1>
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
              <div className="flex w-full sm:w-auto">
                <input
                  type="text"
                  placeholder="Search categories..."
                  value={searchCategory}
                  onChange={(e) => setSearchCategory(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                />
              </div>
              <button
                className="px-4 py-2 rounded-md bg-green-500 text-white hover:bg-green-400 w-full sm:w-auto"
                onClick={() => setAddCategory(true)}
              >
                Add Category
              </button>
            </div>
          </div>
          {loading ? (
            <p className="text-center">Loading...</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-200 text-left">
                    <th className="border border-gray-300 px-4 py-2">S.No</th>
                    <th className="border border-gray-300 px-4 py-2">
                      Category_Name
                    </th>
                    <th className="border border-gray-300 px-4 py-2">Status</th>
                    <th className="border border-gray-300 px-4 py-2">
                      Actions
                    </th>
                    <th className="border border-gray-300 px-4 py-2">
                      Edit/Delete
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((item, index) => (
                    <tr key={item.id} className="hover:bg-gray-100">
                      <td className="border border-gray-300 px-4 py-2">
                        {first + index + 1}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {item.name}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        <span
                          className={`px-2 py-1 text-white rounded ${
                            item.status === "Active"
                              ? "bg-green-500"
                              : "bg-red-500"
                          }`}
                        >
                          {item.status === "Active" ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td
                        className={`border border-gray-300 px-4 cursor-pointer py-2 ${
                          item.status === "Active"
                            ? "text-red-400"
                            : "text-green-400"
                        }`}
                      >
                        {item.status === "Active" ? "Deactivate" : "Activate"}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        <div className="flex flex-col sm:flex-row gap-2">
                          <button
                            className="w-full sm:w-auto bg-blue-500 hover:bg-blue-700 text-white px-4 py-1 rounded"
                            onClick={() => {
                              setEditInd(item.id),
                                setChangedCategory(item.name);
                            }}
                          >
                            Edit
                          </button>
                          <button
                            className="w-full sm:w-auto bg-red-500 hover:bg-red-700 text-white px-4 py-1 rounded"
                            onClick={() => handleDelete(item.id)}
                          >
                            {deleteLoading && item.id === deletingId
                              ? "Please Wait..."
                              : "Delete"}
                          </button>
                        </div>
                      </td>{" "}
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="mt-2 flex justify-center">
                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index}
                    onClick={() => handlePageChange(index + 1)}
                    className={`px-3 py-1 mx-1 rounded ${
                      currentPage === index + 1
                        ? "bg-blue-500 text-white"
                        : "bg-gray-300"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row gap-4 p-4">
          <ToastContainer />
          <input
            type="text"
            {...register("categoryName", {
              required: "Category name is required",
              minLength: {
                value: 3,
                message: "Category name must be at least 3 characters"
              },
              maxLength: {
                value: 50,
                message: "Category name must not exceed 50 characters"
              }
            })}
            value={changedCategory}
            placeholder="Enter New Category Name"
            className="w-full sm:w-2/3 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            onChange={(e) => setChangedCategory(e.target.value)}
          />
          <div className="flex flex-col sm:flex-row gap-4">
            {errors.categoryName && (
              <span className="text-red-500 text-sm">{errors.categoryName.message}</span>
            )}
            <button
              className="w-full sm:w-auto px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
              onClick={handleSubmit(handleEditCategory)}
            >
              {changedCategoryLoading ? "Please Wait" : "Change Category"}
            </button>
            <button
              className="w-full sm:w-auto px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition duration-200"
              onClick={() => setEditInd(null)}
            >
              Cancel
            </button>
          </div>
        </div>      )}
    </div>
  );
}

export default Category;