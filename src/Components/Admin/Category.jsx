import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Category() {
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [editInd, setEditInd] = useState(null);
  const itemsPerPage = 5;

  const getCategoryList = async () => {
    try {
      setLoading(true);
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const response = await axios.get(
        "https://rfpdemo.velsof.com/api/categories",
        {
          headers: {
            Authorization: `Bearer ${userInfo?.token}`,
          },
        }
      );
      console.log(response.data);
      setCategory(Object.values(response?.data?.categories) || []);
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
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
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
  return (
    <>
      {editInd === null ? 
      (<div className="container mx-auto p-4">
        <ToastContainer />
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold mb-4 text-center">Category List</h1>
          <button className="px-2 py-3 rounded-md bg-green-500 text-white hover:bg-green-400">
            Add Category
          </button>
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
                  <th className="border border-gray-300 px-4 py-2">Actions</th>
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
                    <td className="border border-gray-300 px-4 py-2 space-x-2">
                      <button className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-1 rounded">
                        Edit
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white px-4 py-1 rounded"
                        onClick={() => handleDelete(item.id)}
                      >
                        Delete
                      </button>
                    </td>
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
      </div>) :  (<div className="container mx-auto p-4">hello</div>)
      }
      
    </>
  );
}

export default Category;
