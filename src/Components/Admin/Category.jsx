import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { setCategory } from "../Features/RPFslice";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";

function Category() {
  const [category, setLocalCategory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [editInd, setEditInd] = useState(null);
  const [changedCategory, setChangedCategory] = useState();
  const [userInfo] = useState(JSON.parse(localStorage.getItem("userInfo")));
  const [addCategory, setAddCategory] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [searchCategory, setSearchCategory] = useState("");
  const itemsPerPage = 10;
  const dispatch = useDispatch();

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
  const last = currentPage * itemsPerPage;
  const first = last - itemsPerPage;

  const currentItems = category?.slice(first, last);
  //   const currentItems = [1,2,3,4,5,6]
  const totalPages = Math.ceil(category.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `https://rfpdemo.velsof.com/api/categories/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${userInfo?.token}`,
          },
        }
      );
      console.log(response.data);
      toast.success("Category Deleted Successfully");
      getCategoryList();
    } catch (error) {
      console.error(error);
    }
  };
  const handleEditCategory = async () => {
    try {
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
      toast.success("Category Updated Successfully");
      getCategoryList();
      setEditInd(null);
      setChangedCategory("");
    } catch (error) {
      console.error(error);
      toast.error("Error Updating Category");
    }
  };
  const handleAddCategory = async () => {
    try {
      const response = await axios.post(
        "https://rfpdemo.velsof.com/api/categories",
        {
          name: newCategory,
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
      } else {
        toast.error(response.data.errors);
      }
      setAddCategory(false);
    } catch (error) {
      console.log("Error Occured In Add Category");
      toast.error(error);
    }
  };
  const handleSearch = async()=>{
    const findElem = category?.find(elem=>elem?.name === searchCategory);
    console.log(findElem)
    try {
       const response = await axios.get(`https://rfpdemo.velsof.com/api/categories/${findElem.id}`,{
        
          headers:{
            Authorization : userInfo?.token,
          }
        
       });
       console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
  // Add Category
  if (addCategory) {
    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <input
            type="text"
            placeholder="Enter Category Name"
            onChange={(e) => setNewCategory(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={handleAddCategory}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
            >
              Submit
            </button>
            <button
              onClick={() => setAddCategory(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
          </div>
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
                  onChange={(e)=>setSearchCategory(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                />
                <button className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600" onClick={handleSearch}>
                  Search
                </button>
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
                            item.status ? "bg-green-500" : "bg-red-500"
                          }`}
                        >
                          {item.status ? "Active" : "Inactive"}
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
                            Delete
                          </button>
                        </div>
                      </td>{" "}
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="mt-4 flex justify-center">
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
          <input
            type="text"
            value={changedCategory}
            placeholder="Enter New Category Name"
            className="w-full sm:w-2/3 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            onChange={(e) => setChangedCategory(e.target.value)}
          />
          <button
            className="w-full sm:w-auto px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
            onClick={() => handleEditCategory()}
          >
            Change Category
          </button>
        </div>
      )}
    </div>
  );
}

export default Category;
