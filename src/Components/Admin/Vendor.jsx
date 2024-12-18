import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { setVendors } from "../Features/RPFslice";
import { useDispatch } from "react-redux";
function Vendor() {
  const dispatch = useDispatch();
  const [vendor, setVendor] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [approveLoading, setAppproveLoading] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 10;

  const getVendorList = async () => {
    try {
      setLoading(true);
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const response = await axios.get(
        "https://rfpdemo.velsof.com/api/vendorlist",
        {
          headers: {
            Authorization: `Bearer ${userInfo?.token}`,
          },
        }
      );
      console.log(response.data);
      setVendor(response.data.vendors || []);
      dispatch(setVendors(response.data.vendors || []));
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getVendorList();
    console.log("Hello");
    console.log("Vendor List", vendor);
  }, []);

  const filteredVendors = vendor.filter((vendorItem) =>
    vendorItem.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vendorItem.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vendorItem.mobile?.toString().includes(searchTerm)
  );

  const last = currentPage * itemsPerPage;
  const first = last - itemsPerPage;
  const currentItems = filteredVendors.slice(first, last);

  const totalPages = Math.ceil(filteredVendors.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleApproveVendor = async (id) => {
    console.log(id);
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    try {
      setAppproveLoading((prev) => ({ ...prev, [id]: true }));
      const response = await axios.post(
        "https://rfpdemo.velsof.com/api/approveVendor",
        {
          user_id: id,
          status: "Approved",
          _method: "PUT",
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
        setAppproveLoading((prev) => ({ ...prev, [id]: false }));
        getVendorList();
      } else {
        typeof error === "object"
          ? toast.error(response.data.errors[0])
          : toast.error(
              response.data.errors ||
                response.data.message ||
                response.data.error
            );
        setAppproveLoading((prev) => ({ ...prev, [id]: false }));
      }
    } catch (error) {
      toast.error("Error approving vendor");
      console.log(error);
      setAppproveLoading((prev) => ({ ...prev, [id]: false }));
    }
  };
  return (
    <div className="p-4 ">
      <ToastContainer />
      <div className="flex justify-between pr-5">

      <h1 className="text-2xl font-bold mb-4">Vendor List</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search vendors..."
          value={searchTerm}
          onChange={handleSearch}
          className="p-2 border border-gray-300 rounded w-full max-w-md"
        />
      </div>
      </div>
      {loading ? (
        <p className="text-blue-500">Loading...</p>
      ) : filteredVendors.length > 0 ? (
        <>
          <table className="w-full border-collapse border border-gray-300 mb-4">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-2">ID</th>
                <th className="border border-gray-300 p-2">First-Name</th>
                <th className="border border-gray-300 p-2">Last-Name</th>
                <th className="border border-gray-300 p-2">Email</th>
                <th className="border border-gray-300 p-2">Contact-No</th>
                <th className="border border-gray-300 p-2">vendor-Status</th>
                <th className="border border-gray-300 p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((vendorItem) => (
                <tr
                  key={vendorItem.id}
                  className="text-center hover:bg-gray-100"
                >
                  <td className="border border-gray-300 p-2">
                    {vendorItem.user_id}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {vendorItem.name.split(" ")[0]}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {vendorItem.name.split(" ")[1]}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {vendorItem.email}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {vendorItem.mobile}
                  </td>
                  {
                    <td
                      className={`border border-gray-300 p-2 ${
                        vendorItem.status === "Approved"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {vendorItem.status}
                    </td>
                  }
                  <td
                    className={`border border-gray-300 text-red-500 p-2 cursor-pointer ${
                      vendorItem.status === "Approved"
                        ? "cursor-not-allowed"
                        : ""
                    }`}
                    onClick={() => handleApproveVendor(vendorItem.user_id)}
                  >
                    {vendorItem.status !== "Approved"
                      ? approveLoading[vendorItem.user_id]
                        ? "Loading..."
                        : "Approve"
                      : ""}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-center items-center gap-2">
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (pageNumber) => (
                <button
                  key={pageNumber}
                  onClick={() => handlePageChange(pageNumber)}
                  className={`px-3 py-1 border rounded ${
                    pageNumber === currentPage
                      ? "bg-blue-500 text-white"
                      : "bg-white text-blue-500 border-blue-500"
                  }`}
                >
                  {pageNumber}
                </button>
              )
            )}
          </div>
        </>
      ) : (
        <p className="text-red-500">No vendors found.</p>
      )}
    </div>
  );
}

export default Vendor;