import axios from "axios";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import  { useState } from "react";

function ApplyForQuotes({ selectedQuote, setSelectedQuote }) {
  const { register, handleSubmit, reset, watch, setValue, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  console.log("selectedQuote", selectedQuote);
  const calculateTotalCost = () => {
    const item_price = parseFloat(watch("item_price")) || 0;
    const quantity = parseInt(watch("quantity")) || 0;
    const total = item_price * quantity;
    setValue("total_cost", total);
    return total;
  };

  const onSubmit = async (data) => {
    console.log(data);
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    try {
      setLoading(true);
      const response = await axios.put(
        `https://rfpdemo.velsof.com/api/rfp/apply/${selectedQuote}`,
        {
          ...data,
          method: "PUT",
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
        reset();
        setLoading(false);
      }
      else{
        typeof response.data.error === "object" ? toast.error(response.data.errors[0]) :  toast.error(response.data.error || response.data.errors || response.data.message);
        reset();
          setLoading(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error Occured");
      reset();  
    }
  };
  const onCancel = () => {
    console.log("Form reset");
    reset();
    setSelectedQuote(null);
    toast.info("Form reset successfully!");
  };

  return (
    <div className="p-6">
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-4">Create RFP Quote</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700">Vendor Price</label>
            <input
              type="number"
              {...register("item_price", {
                required: "Vendor price is required",
                onChange: calculateTotalCost,
              })}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter vendor price"
            />
            {errors.item_price && <p className="text-red-500 text-sm mt-1">{errors.item_price.message}</p>}
          </div>

          <div>
            <label className="block text-gray-700">Item Description</label>
            <textarea
              {...register("itemDescription", { 
                required: "Item description is required" ,
                minLength:{
                  value : 8,
                  message: "Please Enter Atleast 8 Character Message"
                }
              })}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter item description"
            ></textarea>
            {errors.itemDescription && <p className="text-red-500 text-sm mt-1">{errors.itemDescription.message}</p>}
          </div>

          <div>
            <label className="block text-gray-700">Quantity</label>
            <input
              type="number"
              {...register("quantity", {
                required: "Quantity is required",
                onChange: calculateTotalCost,
              })}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter quantity"
            />
            {errors.quantity && <p className="text-red-500 text-sm mt-1">{errors.quantity.message}</p>}
          </div>

          <div>
            <label className="block text-gray-700">Total Cost</label>
            <input
              type="number"
              {...register("total_cost", { 
                required: "Total cost is required" 
              })}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter total cost"
              readOnly
            />
            {errors.total_cost && <p className="text-red-500 text-sm mt-1">{errors.total_cost.message}</p>}
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 focus:outline-none"
          >
            {loading ? "Please Wait..." : "Submit"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}


export default ApplyForQuotes;