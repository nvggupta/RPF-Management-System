import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axiosInstance from "../utills/Apihook";
import { ToastContainer, toast } from "react-toastify";

import { useSelector } from "react-redux";
function CreateRFP({ totalRFP,setNewRFP,setCreateRFP, selectedCategories }) {
  const [newRFPData, setNewRFPData] = useState();
  const [vendors, setVendors] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState("");
  const [loading , setLoading] = useState(false);
  console.log("selectedCategory", selectedCategories);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const maximumPrice = watch("maximum_price");

  const onSubmit = async (data) => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    console.log("Create RFP Data", data);
    const formData = {
      ...data,
      user_id: totalRFP+1,
      categories: selectedCategories?.join(","),
      vendors: data.vendors?.join(","),
    };
    
    try {
      setLoading(true);
      const response = await axios.post(

        "https://rfpdemo.velsof.com/api/createrfp",
        formData,
        {
          headers: {
            Authorization: `Bearer ${userInfo?.token}`,
          },
        }
      );
      console.log(response.data);
      if (response.data.response === "success") {
        toast.success(response.data.response);
        reset();
        // setNewRFP(false);
        // setCreateRFP(false);
        setLoading(false);
      } else {
        typeof response.data.errors === "object" ? toast.error(response.data.errors[0]) : toast.error(response.data.error || response.data.errors || response.data.message);
        setLoading(false);
      }
    } catch (error) {
      toast.error("Error Creating RFP");
      console.log(error);
      reset();
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const vendorResponse = await axiosInstance.get(`/vendorlist/${selectedCategories[0]}`);
        console.log(vendorResponse.data.vendors);
        setVendors(vendorResponse.data.vendors || []);
      } catch (error) {
        console.error("Failed to fetch vendors:", error);
        setVendors([]);
      }
    })();
  }, []);

  const handleVendorChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
    console.log("Selected vendor IDs:", selectedOptions);
    setSelectedVendor(selectedOptions);
  };
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
    <ToastContainer />
      <h1 className="text-2xl font-bold mb-6">Create RFP</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* RFP Number */}
          <div className="flex flex-col">
            <label htmlFor="rfpNo" className="font-medium mb-1">
              RFP Number
            </label>
            <input
              type="text"
              id="rfp_no"
              className="border rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-300"
              {...register("rfp_no", { required: "RFP Number is required" })}
            />
            {errors.rfp_no && (
              <span className="text-red-500 text-sm">
                {errors.rfp_no.message}
              </span>
            )}
          </div>

          {/* Item Name */}
          <div className="flex flex-col">
            <label htmlFor="itemName" className="font-medium mb-1">
              Item Name
            </label>
            <input
              type="text"
              id="item_name"
              className="border rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-300"
              {...register("item_name", { required: "Item Name is required" })}
            />
            {errors.item_name && (
              <span className="text-red-500 text-sm">
                {errors.item_name.message}
              </span>
            )}
          </div>

          {/* Quantity */}
          <div className="flex flex-col">
            <label htmlFor="quantity" className="font-medium mb-1">
              Quantity
            </label>
            <input
              type="number"
              id="quantity"
              className="border rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-300"
              {...register("quantity", {
                required: "quantity is required",
                valueAsNumber: true,
              })}
            />
            {errors.quantity && (
              <span className="text-red-500 text-sm">
                {errors.quantity.message}
              </span>
            )}
          </div>

          {/* Last Date */}
          <div className="flex flex-col">
            <label htmlFor="lastDate" className="font-medium mb-1">
              Last Date
            </label>
            <input
              type="date"
              id="last_date"
              min={new Date().toISOString().split('T')[0]}
              className="border rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-300"
              {...register("last_date", { 
                required: "Last Date is required",
                validate: (value) => {
                  const selectedDate = new Date(value)
                  const today = new Date()
                  today.setHours(0, 0, 0, 0)
                  return selectedDate >= today || "Please select a future date"
                }
              })}
            />
            {errors.last_date && (
              <span className="text-red-500 text-sm">
                {errors.last_date.message}
              </span>
            )}
          </div>

          {/* Maximum Price */}
          <div className="flex flex-col">
            <label htmlFor="maxPrice" className="font-medium mb-1">
              Maximum Price
            </label>
            <input
              type="number"
              id="maximum_price"
              className="border rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-300"
              {...register("maximum_price", {
                required: "Maximum Price is required",
                valueAsNumber: true,
              })}
            />
            {errors.maximum_price && (
              <span className="text-red-500 text-sm">
                {errors.maximum_price.message}
              </span>
            )}
          </div>
        </div>
        <div className="flex flex-col col-span-3">
          <label htmlFor="minimum_price" className="font-medium mb-1">
            Minimum Price
          </label>
          <input
            type="number"
            id="minimum_price"
            className="border rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-300"
            {...register("minimum_price", {
              required: "Minimum Price is required",
              valueAsNumber: true,
              validate: (value) => 
                !maximumPrice || value <= maximumPrice || "Minimum price cannot be greater than maximum price"
            })}
          />
          {errors.minimum_price && (
            <span className="text-red-500 text-sm">
              {errors.minimum_price.message}
            </span>
          )}
        </div>

        {/* Item Description - Full Width */}
        <div className="flex flex-col">
          <label htmlFor="itemDescription" className="font-medium mb-1">
            Item Description
          </label>
          <textarea
            id="item_description"
            rows="3"
            className="border rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-300"
            {...register("item_description", {
              required: "Item Description is required",
            })}
          ></textarea>
          {errors.item_description && (
            <span className="text-red-500 text-sm">
              {errors.item_description.message}
            </span>
          )}
        </div>

        {/* Vendors List - Multiple Selection */}
        <div className="flex flex-col">
          <label htmlFor="vendors" className="font-medium mb-1">
            Select vendors
          </label>
          <select
            multiple
            id="vendors"
            className="border rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-300 h-32"
            onChange={handleVendorChange}
            {...register("vendors", {
              required: "Please select at least one vendor",
            })}
          >
            {vendors && vendors.length > 0 ? (
              vendors.map((vendor) => (
                <option key={vendor?.user_id} value={vendor?.user_id}>
                  {vendor.name}
                </option>
              ))
            ) : (
              <option value="">No vendors available</option>
            )}
          </select>
          {errors.vendors && (
            <span className="text-red-500 text-sm">
              {errors.vendors.message}
            </span>
          )}
        </div>

        {/* Submit Button */}
        <div className="text-right space-x-4">
          <button
            type="button"
            onClick={() => setNewRFP(false)}
            className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:ring focus:ring-gray-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
          >
            {loading ? "Please Wait..." : "Create RFP"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateRFP;